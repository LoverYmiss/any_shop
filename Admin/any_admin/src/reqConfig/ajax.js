import axios from './interceptors.js'
import qs from 'qs'

const commonReqUrl = "https://api.apiopen.top/";

export const ajaxGetFullUrl = url => {
  return axios.get(commonReqUrl + url)
}

export const ajaxGet = url => {
  console.log(url);
  return axios.get(url)
}

export const ajaxPost = (url, data) => {
  return axios.post(url, data)
}
