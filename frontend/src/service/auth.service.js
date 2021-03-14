import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

class AuthService {
  async login(user) {
    const response = await axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
      });
    if (response.data.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "register", {
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
