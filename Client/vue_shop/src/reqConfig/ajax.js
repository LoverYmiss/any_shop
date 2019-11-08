import axios from './interceptors.js'
import qs from 'qs'

const commonReqUrl = "http://127.0.0.1:3005";

export const ajaxGet = url => {
  return axios.get(commonReqUrl + url)
};

export const ajaxGetFullUrl = url => {
  return axios.get(url)
};

export const ajaxPost = (url, data) => {
  console.log(url, data);
  return axios.post(commonReqUrl + url, qs.stringify(data))
};
