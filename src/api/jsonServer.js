import { stringify } from "query-string";
import { fetchJson, flattenObject, queryParameters } from "./util/fetch";
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
} from "./types";

import { handleUpload } from "./upload";

/**
 * Maps admin-on-rest queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertRESTRequestToHTTP = (type, resource, params) => {
        let url = "";
        let key = "de4938d6-ae25-11e9-a2a3-2a2ae2dbcce4-sdk";
        const options = {};
        options.headers = new Headers({
            "x-api-key": key,
        });
        switch (type) {
            case GET_LIST: {
                const { offset, limit } = params.pagination;
                const { field, order } = params.sort;
                // const query = {
                //     ...flattenObject(params.filter),
                //     _sort: field,
                //     _order: order,
                //     _start: (page - 1) * perPage,
                //     _end: page * perPage,
                // };
                const query = {
                    ...flattenObject(params.filter),
                    _sort: field,
                    _order: order,
                    offset: offset,
                    limit: limit,
                };

                url = `${apiUrl}/${resource}/?${stringify(query)}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY_REFERENCE: {
                const { limit, offset } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...flattenObject(params.filter),
                    [params.target]: params.id,
                    _sort: field,
                    _order: order,
                    limit: limit,
                    offset: offset,
                };
                url = `${apiUrl}/${resource}/?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = "PUT";
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}/`;
                options.method = "POST";
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = "DELETE";
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const { headers, json } = response;

        let prev = json.prev;
        let next = json.next;
        let data = json.data;
        let pages = json.pages;
        let total = json.total;

        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                if (!headers.has("x-total-count")) {
                    return {
                        data: data,
                        total: total,
                    };
                    throw new Error(
                        "The X-Total-Count header is missing in the HTTP Response. The jsonServer REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
                    );
                }
                return {
                    data: json,
                    total: parseInt(
                        headers.get("x-total-count").split("/").pop(),
                        10
                    ),
                };
            case CREATE:
                return { data: { ...params.data, id: data.id } };
            default:
                return { data: data };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
        // json-server doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
        if (type === GET_MANY) {
            return Promise.all(
                params.ids.map((id) =>
                    httpClient(`${apiUrl}/${resource}/${id}`)
                )
            ).then((responses) => ({
                data: responses.map((response) => {
                    var json = response.json;

                    return json.data;
                }),
            }));
        }

        if (resource === "shops" || resource === "lg-tiles") {
            let record = params.data;

            if (record && record.pictures && record.pictures.length) {
                handleUpload(resource, params);
            }
        }

        const { url, options } = convertRESTRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then((response) =>
            convertHTTPResponseToREST(response, type, resource, params)
        );
    };
};
