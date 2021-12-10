import HttpRequest from "./models/HttpRequest";
import { GET, POST, PUT, DELETE } from "./models/HttpMethod";
import axios from "axios";

class HttpAdapter {
  async request(httpRequest) {
    try {
      if (!(httpRequest && httpRequest instanceof HttpRequest)) {
        throw new Error("Error occurred");
      }
      const { method, headers, queryParams, url, body } = httpRequest;
      const requestConfig = {
        headers,
        params: queryParams
      };
      let response = null;
      switch (method) {
        case GET:
          response = await axios.get(url,requestConfig);
          break;
        case POST:
          response = await axios.post(url, body, requestConfig);
          break;
        case PUT:
          response = await axios.put(url, body, requestConfig);
          break;
        case DELETE:
          response = await axios.delete(url, requestConfig);
          break;
        default:
          throw new Error("Unspecified method is called")
      }
      return response;
    } catch (error) {
      console.log("#### error >>> ", error);
      throw error;
    }
  }
}

const httpAdapter = new HttpAdapter();
export default httpAdapter; 
export * as HttpMethod from "./models/HttpMethod";
export { default as HttpRequest } from "./models/HttpRequest";