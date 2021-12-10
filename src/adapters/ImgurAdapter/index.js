import HttpAdapter, { HttpMethod, HttpRequest } from "../HttpAdapter";
import DotEnv from "../../helpers/dotenvHelper";
import { DOTENV_KEYS } from "../../constants";

class ImgurAdapter {

  constructor() {
    const { IMGUR_API_BASE_URL, IMGUR_CLIENT_ID } = DOTENV_KEYS;
    this.API_BASE_URL = DotEnv.accessValue(IMGUR_API_BASE_URL, "");
    this.IMGUR_CLIENT_ID = DotEnv.accessValue(IMGUR_CLIENT_ID, "");
  }

  async getRecentWeeklyImages(query, sort = "time") {
    try {
      const resoureURL = `${this.API_BASE_URL}/gallery/search`;
      const httpRequest = new HttpRequest(HttpMethod.GET, resoureURL);
      httpRequest.addHeader("Authorization", `Client-ID ${this.IMGUR_CLIENT_ID}`);
      const queryParams = {
          window: "week",
          q: query.toLowerCase(),
          sort,
          page: 1
      };
      httpRequest.addQueryParams(queryParams);
      const response = await HttpAdapter.request(httpRequest);
      const parsedResponse = this.parseApiResponse(response);
      return parsedResponse;
    } catch (error) {
      // simplified way: status 400-499 range also considered 500 here;
      return { error: true, data: [], status: 500 };
    }
  }

  parseApiResponse(response) {
    const { data: payload, success, status } = response;
    const parsedRes = {
      error: success || false,
      data: payload.data || [],
      status: status || 200
    };
    return parsedRes;
  }
}

const imgurClient = new ImgurAdapter();
export default imgurClient;