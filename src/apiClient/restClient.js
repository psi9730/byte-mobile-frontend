import {
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
} from "./types";

// import {jsonServerRestClient} from 'admin-on-rest';
import jsonServerRestClient from "./jsonServer";
import { parse_filter } from "./filter";

let DEBUG = true;
let adminServer =
    "http://ec2-52-78-231-61.ap-northeast-2.compute.amazonaws.com/v1/";

export default (options = {}, dbMap, pKeyMap, sortKeyMap) => {
    let ids = [];
    var lastStartKey = undefined;
    var lastResource = undefined;

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Promise} The REST response
     */
    return (type, resource, params) => {
        // intercept the call and use jsonrest
        if (DEBUG)
            return jsonServerRestClient("http://local.stylesha.re:5000")(
                type,
                resource,
                params
            );
        else return jsonServerRestClient(adminServer)(type, resource, params);
    };
};
