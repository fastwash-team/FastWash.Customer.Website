import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../service/env.keys";

const serverURL = REACT_APP_API_BASE_URL;

export const APISERVICES = {
  async getData(url, customHeaders) {
    try {
      const config = {
        headers: {
          ...customHeaders,
        },
      };
      let response = await axios.get(`${serverURL}${url}`, config);
      return response.data;
    } catch (error) {
      console.log("caught error", error);
      throw error;
    }
  },
};
