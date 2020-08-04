let DEBUG = true;
let adminServer =
  "https://3en200o2y6.execute-api.ap-northeast-1.amazonaws.com/admin";

var restClientUrl;
if (DEBUG) restClientUrl = "http://localhost:5000";
else restClientUrl = adminServer;

let uploadHost =
  "https://xa3cc0hzyc.execute-api.ap-northeast-1.amazonaws.com/upload/";

const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

function uploadFile(url, src) {
  var data = new FormData();
  data.append("b64file", src);
  console.log(`bs64file src\n ${src}`);

  return fetch(url, {
    method: "POST",
    body: data,
    // body: input.files[0]
  });
}

function updateImageField(resource, id, record) {
  var data = {
    cached_image_url: record["s3_url"],
    image_id: record["image_id"],
  };
  let url = `${restClientUrl}/${resource}/${id}`;
  // let resourceUrl = restClientUrl + resource

  return fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(
    (response) => response.json() // if the response is a JSON object
  );

  // .then(
  //   success => console.log(success) // Handle the success response object
  // ).catch(
  //   error => console.log(error) // Handle the error response object
  // );
}

export function handleUpload(resource, params) {
  var record = params.data;

  // only freshly dropped pictures are instance of File
  const formerPictures = record.pictures.filter(
    (p) => !(p.rawFile instanceof File)
  );
  const newPictures = record.pictures.filter((p) => p.rawFile instanceof File);
  const title = record.title;

  newPictures.map(convertFileToBase64).map((picture64Promise) =>
    picture64Promise
      .then((picture64) => {
        picture64 = picture64.split(",")[1];
        uploadFile(uploadHost, picture64, title)
          .then(
            (response) => response.json() // if the response is a JSON object
          )
          .then((success) => {
            console.log(success); // Handle the success response object
            updateImageField(resource, record.id, success.result);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error); // Handle the error response object
          });
      })
      .catch((err) => {
        // Handle any error that occurred in any of the previous
        // promises in the chain.
        console.log(`error uploading\n ${record.id} ${err}`);
      })
  );
  delete record["pictures"];
  delete record["cached_imgage_url"];
}

// function handleUpload(record){
//   // only freshly dropped pictures are instance of File
//         const formerPictures = record.pictures.filter(p => !(p.rawFile instanceof File));
//         const newPictures = record.pictures.filter(p => p.rawFile instanceof File);
//         const title = record.title
//         debugger;

//         console.log(newPictures)

//         return newPictures
//           .map(convertFileToBase64)
//           .map(picture64Promise =>
//             picture64Promise
//             .then((picture64) => {

//               console.log(picture64)
//               picture64 = picture64.split(',')[1]
//               console.log(picture64)

//               return uploadFile(
//                 hostName, picture64, title
//               )
//             })
//             .then(
//               response => response.json() // if the response is a JSON object
//             )
//             .then(
//               success => {
//                 console.log(success) // Handle the success response object
//                 updateImageField(record.id, success.result, resource, docClient)
//                 delete record['pictures']
//                 delete record['cached_img_url']
//                 return record
//               }
//             )
//             .catch(
//               error => {
//                 console.log(error); // Handle the error response object
//                 delete record['pictures']
//                 delete record['cached_img_url']
//                 return record
//               }
//             )
//           );

// }
