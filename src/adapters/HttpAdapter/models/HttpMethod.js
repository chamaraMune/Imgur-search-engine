import { isEmpty } from "lodash";
/**
 * Here define HttpRequests as Symbols
 * Only considered mostly common methods used in RestFul Apis
 * Note that given sample project scope does not necessary such implementation
 * TS makes this easy :)
 */
export const GET = Symbol("GET");
export const POST = Symbol("POST");
export const PUT = Symbol("POST");
export const DELETE = Symbol("DELETE");

const ALLOWED_METHODS = Object.freeze({
    [GET]: "GET",
    [POST]: "POST",
    [PUT]: "PUT",
    [DELETE]: "DELETE"
});

export const isAllowedMethod = (httpMethod) => {
    const value = ALLOWED_METHODS[httpMethod];
    return !isEmpty(value);
};