// import fetch from 'isomorphic-fetch'
// import { message } from 'antd'

export function fetchJSON(url, params) {
  // eslint-disable-next-line no-param-reassign
  params = {
    ...params,
    credentials: 'include',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Type': 'application/json',
      'X-CSRF-Token': global.__data.csrfToken,
      'Client-Version': global.__data.versionString,
      ...params.headers,
    },
  }
  // eslint-disable-next-line no-param-reassign
  url = `/api${url}`
  return fetch(url, params)
}

function buildURL(url, data) {
  return url.split('/').map((item) => {
    if (item.indexOf('$') > -1) {
      return data[item.split('$')[1]]
    }
    return item
  }).join('/')
}
/* eslint-disable */
function serialize(obj, prefix) {
  let str = [], p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
      str.push((v !== null && typeof v === 'object') ?
        serialize(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
}
/* eslint-enable */

// eslint-disable-next-line arrow-parens
export const fetchJSONByPost = url => body => {
  const params = {
    method: 'POST',
    body: JSON.stringify(body),
  }
  const buildUrl = buildURL(url, body)
  return fetchJSON(buildUrl, params)
}

export const fetchJSONByGet = url => (query) => {
  const params = {
    method: 'GET',
  }
  let getQuery = '?'
  if (query) {
    // eslint-disable-next-line
    for (name in query) {
      getQuery = `${getQuery}${name}=${query[name]}&`
    }
  }
  const buildUrl = buildURL(url, query)
  const getUrl = buildUrl + (query ? getQuery.substring(0, getQuery.length - 1) : '')
  return fetchJSON(encodeURI(getUrl), params)
}

export const fetchJSONByPut = url => (body) => {
  const params = {
    method: 'PUT',
    body: JSON.stringify(body),
  }
  const buildUrl = buildURL(url, body)
  return fetchJSON(buildUrl, params)
}

export const fetchJSONByDelete = url => (data) => {
  const params = {
    method: 'DELETE',
    body: JSON.stringify(data),
  }
  const buildUrl = buildURL(url, data)
  return fetchJSON(buildUrl, params)
}

export const fetchJSONStringByPost = url => (query) => {
  const params = {
    method: 'POST',
    body: query,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8;',
    },
  }
  return fetchJSON(url, params)
}

export const fetchJSONByPostFormData = url => (data) => {
  const formData = new FormData()
  const request = new XMLHttpRequest()
  let isFile
  let file
  // eslint-disable-next-line
  for (const q in data) {
    isFile = data[q].isFile
    file = isFile ? data[q].file : undefined
    // eslint-disable-next-line
    formData.append(q, isFile ? file : (typeof data[q] === 'object' ? JSON.stringify(data[q]) : data[q]))
  }
  request.open('POST', `/api${url}`)
  request.setRequestHeader('X-CSRF-Token', global.__data.csrfToken);
  request.withCredentials = true
  request.send(formData)

  return new Promise((res) => {
    request.onload = (e) => {
      if (request.readyState === 4 && request.status === 200) {
        res({
          success: true,
          data: 1,
        })
        data.cb && data.cb({
          success: true,
          data: 1,
        })
      } else if (request.status === 500) {
        // message.error(JSON.parse(request.response).errorMessage)
      }
    }
  })
}
// 跨域请求 url 不加api
function buildParams(obj) {
  if (!obj) {
    return ''
  }
  const params = []
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      const value = obj[key] === undefined ? '' : obj[key]
      params.push(`${key}=${value}`)
    }
  }
  return params.join('&')
}

export function fetchJSONOpen(url, params) {
  // eslint-disable-next-line no-param-reassign
  params = {
    ...params,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // 'X-CSRF-Token': global.__data.csrfToken,
      ...params.headers,
    },
  }
  // eslint-disable-next-line no-param-reassign
  url = `${global.__data.hostName}${url}`
  return fetch(url, params)
}

export const fetchJSONByPostOpen = url => (query) => {
  const params = {
    method: 'POST',
    mode: 'cors',
    body: buildParams(query),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;',
    },
  }
  return fetchJSONOpen(url, params)
}
