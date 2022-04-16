const BACKEND = 'http://localhost:8080'
const SECTOR_API = '/sectors'
const USER_API = '/users'
const DEFAULT_CONTENT_TYPE = 'application/json'
const POST_METHOD = "POST"

export function fetchSectors () {
    return fetch(`${BACKEND}${SECTOR_API}`, getFetchParameters())
        .then(response => response.json())
}

export function postUser (userDto) {
    return fetch(`${BACKEND}${USER_API}`, getFetchPostParameters(JSON.stringify(userDto)))
        .then(response => response.json())
}

export function fetchUserData (userName) {
    return fetch(`${BACKEND}${USER_API}/${userName}`, getFetchParameters())
        .then(response => response.json())
}

const getFetchParameters = (contentType = DEFAULT_CONTENT_TYPE, accept) => {
    return {headers: getHeaders(contentType, accept), cache: 'no-store'}
}

const getFetchPostParameters = (body ,contentType = DEFAULT_CONTENT_TYPE, accept) => {
    return {method: POST_METHOD, headers: getHeaders(contentType, accept), cache: 'no-store', body: body}
}

const getHeaders = (contentType = DEFAULT_CONTENT_TYPE, accept) => {
    const headers = new window.Headers()
    headers.append('Accept', accept || contentType)
    headers.append('Content-type', contentType)
    return headers
}