import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:3000/book/";

class BookService {
  getAllBooks() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  addBook(book) {
    return axios.post(API_URL, book, { headers: authHeader() });
  }

  getBookDetail(id) {
    return axios.get(`${API_URL}${id}`, { headers: authHeader() });
  }

  updateBook(id, book) {
    return axios.put(`${API_URL}${id}`, book, { headers: authHeader() });
  }

  deleteBook(id) {
    return axios.delete(`${API_URL}${id}`, { headers: authHeader() });
  }
}

export default new BookService();
