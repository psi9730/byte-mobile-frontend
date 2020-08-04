import addUploadFeature from "./addUploadFeature";
import jsonServerRestClient from "./jsonServer";

const options = {};
const key = "de4938d6-ae25-11e9-a2a3-2a2ae2dbcce4-sdk";
options.headers = new Headers({
    "x-api-key": key,
});
const dataProvider = jsonServerRestClient(
    "http://ec2-52-78-231-61.ap-northeast-2.compute.amazonaws.com/v1",
    options
);

const uploadCapableDataProvider = addUploadFeature(dataProvider);

export default uploadCapableDataProvider;
