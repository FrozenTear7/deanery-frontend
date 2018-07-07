const fetchWithToken = (url, options) => {
  return fetch(url, {...options, headers: {...options.headers, 'authorization': localStorage.getItem('token')}})
}

export default fetchWithToken