// in addUploadFeature.js
/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.rawFile);

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const imageParams = [
    "horizontal_image_url",
    "vertical_image_url",
    "square_image_url",
];
const addUploadFeature = (requestHandler) => (type, resource, params) => {
    if ((type === "CREATE" || type === "UPDATE") && resource === "categories") {
        // notice that following condition can be true only when `<ImageInput source="pictures" />` component has parameter `multiple={true}`
        // if parameter `multiple` is false, then data.pictures is not an array, but single object
        const filterImageParams = imageParams.filter((param) => {
            if (params.data.hasOwnProperty(param)) {
                return true;
            }
            return false;
        });

        const formerPictures = filterImageParams.filter(
            (p) => !(params.data[p].rawFile.rawFile instanceof File)
        );
        const newPictures = filterImageParams.filter(
            (p) => params.data[p].rawFile.rawFile instanceof File
        );

        return Promise.all(
            newPictures.map((imageParam) => {
                return convertFileToBase64(params.data[imageParam]);
            })
        )
            .then((pictures) => {
                const reducer = (accumulator, currentValue, index) => {
                    currentValue[params.data[index]] = accumulator;
                };
                return pictures.reduce(reducer, {});
            })
            .then((datas) =>
                requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        ...datas,
                    },
                })
            );
        // if (params.data.pictures && params.data.pictures.length) {
        //   // only freshly dropped pictures are instance of File
        //   const formerPictures = params.data.pictures.filter((p) => !(p.rawFile instanceof File));
        //   const newPictures = params.data.pictures.filter((p) => p.rawFile instanceof File);

        //   return Promise.all(newPictures.map(convertFileToBase64))
        //     .then((base64Pictures) =>
        //       base64Pictures.map((picture64, index) => ({
        //         src: picture64,
        //         title: `${newPictures[index].title}`,
        //       }))
        //     )
        //     .then((transformedNewPictures) =>
        //       requestHandler(type, resource, {
        //         ...params,
        //         data: {
        //           ...params.data,
        //           pictures: [...transformedNewPictures, ...formerPictures],
        //         },
        //       })
        //     );
        // }
    }
    // for other request types and resources, fall back to the default request handler
    return requestHandler(type, resource, params);
};

export default addUploadFeature;
