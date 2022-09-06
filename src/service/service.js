import axios from "axios";
import {HOTS, PREFIX, QUERY_URL, REPOSITORY} from "../constants/config";

export default class HttpRequest {
  promise = new Promise();

  static get(config) {
    config.method = 'get';
    return this.request(config)
  }

  static post(config) {
    config.method = 'post';
    return this.request(config)
  }

  static put(config) {
    config.method = 'put';
    return this.request(config)
  }

  static delete(config) {
    config.method = 'delete';
    return this.request(config)
  }

  static request(config) {
    config.url = HOTS + config.url
    return axios(config).then(res => res.data);
  }
}

// query graphdb
export function queryIntent(query) {
  const config = {
    url: `${QUERY_URL}/${REPOSITORY}`,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    data: `query=${PREFIX + query}`
  }
  return HttpRequest.post(config)
}

// get detail
export async function queryDetail(uri) {
  const config = {
    url: `/rest/explore/graph`,
    headers: {
      "Accept": "application/x-graphdb-table-results+json",
      "X-GraphDB-Repository": "intent"
    },
    params: {
      "uri": uri
    }
  }
  return await HttpRequest.get(config)
}
