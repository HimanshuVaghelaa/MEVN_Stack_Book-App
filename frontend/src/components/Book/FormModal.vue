<template>
  <div>
    <b-modal id="FormModal" :title="isEdit ? 'Edit Book' : 'Add Book'">
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Book Title:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="book.title"
            type="text"
            required
            placeholder="Enter Book Title"
          >
          </b-form-input>
          <div
            v-if="rules.title.isInvalid"
            class="alert alert-danger"
            role="alert"
          >
            {{ rules.title.errorMessage }}
          </div>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Book Price:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="book.price"
            type="text"
            required
            placeholder="Enter Book Price"
          >
          </b-form-input>
          <div
            v-if="rules.price.isInvalid"
            class="alert alert-danger"
            role="alert"
          >
            {{ rules.price.errorMessage }}
          </div>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Book Author:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="book.author"
            type="text"
            required
            placeholder="Enter Author Name"
          >
          </b-form-input>
          <div
            v-if="rules.author.isInvalid"
            class="alert alert-danger"
            role="alert"
          >
            {{ rules.author.errorMessage }}
          </div>
        </b-form-group>
        <b-form-group
          id="input-group-4"
          label="Book Category:"
          label-for="input-4"
        >
          <b-form-select v-model="book.category" :options="categories">
            <template v-slot:first> </template>
          </b-form-select>
          <div
            v-if="rules.category.isInvalid"
            class="alert alert-danger"
            role="alert"
          >
            {{ rules.category.errorMessage }}
          </div>
        </b-form-group>
        <b-form-group
          id="input-group-5"
          label="Book Ratings:"
          label-for="input-5"
        >
          <b-form-select v-model="book.ratings" :options="ratings">
            <template v-slot:first> </template>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-6"
          label="Book Image URL:"
          label-for="input-6"
        >
          <b-form-input
            id="input-6"
            v-model="book.image"
            type="text"
            required
            placeholder="Enter Image URL"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-7"
          label="Book Description:"
          label-for="input-7"
        >
          <b-form-input
            id="input-7"
            v-model="book.description"
            type="text"
            required
            placeholder="Enter Description"
          >
          </b-form-input>
          <div
            v-if="rules.description.isInvalid"
            class="alert alert-danger"
            role="alert"
          >
            {{ rules.description.errorMessage }}
          </div>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="danger"
            size="sm"
            class="float-right ml-1"
            @click="submitForm"
          >
            Save
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="resetForm"
          >
            Cancel
          </b-button>
        </div>
      </template>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </b-modal>
  </div>
</template>

<script>
import Book from "../../models/book";

export default {
  name: "FormModal",
  data() {
    return {
      categories: ["Arts", "Fiction", "Technology", "Entertainment", "Fashion"],
      ratings: ["1", "2", "3", "4", "5"],
      book: new Book("", "", "", "", "", "", ""),
      rules: {
        title: {
          isInvalid: false,
          errorMessage: "Title Required",
        },
        price: {
          isInvalid: false,
          errorMessage: "Price Required",
        },
        author: {
          isInvalid: false,
          errorMessage: "Author Required",
        },
        description: {
          isInvalid: false,
          errorMessage: "Description Required",
        },
        category: {
          isInvalid: false,
          errorMessage: "Category Required",
        },
      },
      isEdit: false,
      successful: false,
      message: "",
    };
  },
  mounted() {
    this.$root.$on("edit-book", (data) => {
      this.book = data;
      this.isEdit = true;
    });
    this.$root.$on("add-book", () => {
      this.isEdit = false;
      this.resetForm();
      this.rules.title.isInvalid = false;
      this.rules.price.isInvalid = false;
      this.rules.author.isInvalid = false;
      this.rules.description.isInvalid = false;
      this.rules.category.isInvalid = false;
    });
  },
  methods: {
    isFormValid() {
      this.rules.title.isInvalid = !this.book.title;
      this.rules.price.isInvalid = !this.book.price;
      this.rules.author.isInvalid = !this.book.author;
      this.rules.description.isInvalid = !this.book.description;
      this.rules.category.isInvalid = !this.book.category;

      return (
        !this.rules.title.isInvalid &&
        !this.rules.price.isInvalid &&
        !this.rules.author.isInvalid &&
        !this.rules.description.isInvalid &&
        !this.rules.description.isInvalid &&
        !this.rules.category.isInvalid
      );
    },
    getURL(url) {
      var txt = document.createElement("textarea");
      txt.innerHTML = url;
      return txt.value;
    },
    submitForm() {
      this.message = "";
      if (this.isFormValid()) {
        if (this.isEdit) {
          this.book.image = this.getURL(this.book.image);
          this.$store.dispatch("actionUpdateBook", { book: this.book }).then(
            (data) => {
              this.resetForm();
              this.message = data.data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        } else {
          this.$store.dispatch("actionAddBook", this.book).then(
            (data) => {
              this.resetForm();
              this.message = data.data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      }
    },
    resetForm() {
      this.book = {
        title: "",
        price: "",
        author: "",
        category: "",
        ratings: "",
        image: "",
        description: "",
      };
    },
  },
};
</script>

<style>
.alert {
  padding: 5px 15px;
}
</style>
