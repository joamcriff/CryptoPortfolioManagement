import axios from "axios";

export default function callAPI(endpoint, method = "GET", body) {
  return axios({
    url: `https://api.coingecko.com/api/v3/${endpoint}`,
    method: method,
    data: body,
  });
}
