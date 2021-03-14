import BookService from "../service/book.service";
import { findIndex } from "lodash";
import Vue from "vue";

export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const GET_SINGLE_BOOK = "GET_ALL_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const POST_NEW_BOOK = "POST_NEW_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";

const state = {
  books: [],
  bookDetail: [],
};

const getters = {
  getterAllBooks: (state) => state.books,
};

const mutations = {
  [GET_ALL_BOOKS](state, book) {
    state.books = book;
  },
  [GET_SINGLE_BOOK](state, book) {
    state.bookDetail = book;
  },
  [POST_NEW_BOOK](state, book) {
    state.books = state.books.concat(book.data);
  },
  [UPDATE_BOOK](state, book) {
    const index = findIndex(state.books, { _id: book._id });
    Vue.set(state.books, index, book);
  },
  [DELETE_BOOK](state, bookId) {
    const index = findIndex(state.books, { bookId });
    state.books.splice(index, 1);
  },
};

const actions = {
  actionGetAllBooks({ commit }) {
    return BookService.getAllBooks()
      .then((response) => {
        commit(GET_ALL_BOOKS, response.data.data);

        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  },
  actionGetSingleBookDetails({ commit }, { id }) {
    return BookService.getBookDetail(id)
      .then((response) => {
        commit(GET_SINGLE_BOOK, response.data.data);
        return Promise.resolve(response.data.data);
      })
      .catch((err) => Promise.reject(err));
  },
  actionUpdateBook({ commit }, { book }) {
    return BookService.updateBook(book._id, book)
      .then((response) => {
        commit(UPDATE_BOOK, { ...book });

        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  },
  actionAddBook({ commit }, book) {
    return BookService.addBook(book)
      .then((response) => {
        commit(POST_NEW_BOOK, response.data);

        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  },
  actionDeleteBook({ commit }, bookId) {
    return BookService.deleteBook(bookId)
      .then((response) => {
        commit(DELETE_BOOK, bookId);

        return Promise.resolve(response);
      })
      .catch((err) => Promise.reject(err));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
