import { isAllowedMethod } from "./HttpMethod";

export default class HttpRequest {
  constructor(method, resoureURL) {
    const isValidMethod = isAllowedMethod(method);
    if (!isValidMethod) {
      throw new Error("Invalid Http Method Provided");
    }
    this.method = method;
    this.url = resoureURL;
    this.headers = {};
    this.queryParams = {};
    this.body = {};
  }

  addQueryParam(key, value) {
    this.queryParams[key] = value;
  }

  addHeader(key, value) {
    this.headers[key] = value;
  }

  addQueryParams(queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      this.queryParams[key] = value;
    }
  }
  
  setBody(data) {
    this.body = data;
  }
} 