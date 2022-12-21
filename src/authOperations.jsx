function getToken() {
  if (window.localStorage) {
    return localStorage.getItem("token");
  }
  return "";
}

function setToken(token) {
  if (window.localStorage) {
    localStorage.setItem("token", token);
  }
}

function removeToken() {
  if (window.localStorage) {
    localStorage.removeItem("token");
  }
}

export { getToken, setToken, removeToken };
