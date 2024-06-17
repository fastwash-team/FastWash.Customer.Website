import axios from "axios";

const serverURL = process.env.REACT_APP_API_BASE_URL;

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
