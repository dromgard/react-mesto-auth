export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  console.log("password", password);
  console.log("email", email);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  })
    .then((response) => {
      console.log("response", response);
      try {
        if (response.status === 201) {
          return response.json();
        }
      } catch (e) {
        console.log("error", e);
        return e;
      }
    })
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      console.log("response", response);
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return;
      }
    })
    .catch((err) => console.log(err));
};
