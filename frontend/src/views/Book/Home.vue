<template>
  <div>
    <h3 class="heading">Books List</h3>
    <div class="row mt-5">
      <div class="col-lg-6">
        <div
          class="form-group d-flex align-items-baseline justify-content-center"
        >
          <p>Filter By</p>
          <b-form-select
            :items="filterBy"
            id="filterBySelect"
            :options="filterOptions"
            class="w-75 ml-2"
          >
            <template v-slot:first>
              <option value="">Select</option>
            </template>
          </b-form-select>
        </div>
        <div class="form-group d-flex align-items-baseline">
          <b-button size="sm" @click="addBook">Add New Book</b-button>
        </div>
      </div>
      <div class="col-lg-6">
        <div
          class="form-group d-flex align-items-baseline justify-content-center"
        >
          <b-form-input
            v-if="filterBy"
            v-model="filter"
            type="search"
            id="filterInput"
            placeholder="Type to Search"
          ></b-form-input>
        </div>
      </div>
    </div>
    <div>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            outlined
            responsive="sm"
            show-empty
            :per-page="perPage"
            :items="getterAllBooks"
            :fields="fields"
            :current-page="currentPage"
            :filter="filter"
            :filterIncludedFields="filterBy"
          >
            <template v-slot:cell(image)="data">
              <img class="img-thumbnail" :src="getURL(data)" alt="..." />
            </template>
            <template v-slot:cell(actions)="data">
              <div class="d-flex justify-content-center">
                <b-button
                  variant="danger"
                  size="sm"
                  class="mr-1"
                  @click="viewItem(data.item._id)"
                  >Details</b-button
                >
                <b-button
                  variant="danger"
                  size="sm"
                  class="mr-1"
                  @click="editItem(data.item)"
                  >Edit</b-button
                >
                <b-button
                  variant="danger"
                  size="sm"
                  @click="deleteItem(data.item._id)"
                  >Delete</b-button
                >
              </div>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            class="float-right"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
    <FormModal />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormModal from "../../components/Book/FormModal.vue";

export default {
  name: "Home",
  components: {
    FormModal,
  },
  data() {
    return {
      filterBy: [],
      filter: null,
      perPage: 3,
      currentPage: 1,
      filterOptions: ["Category", "Ratings"],
      fields: [
        {
          key: "image",
          title: "Image",
          sortable: false,
          image: true,
        },
        {
          key: "title",
          title: "Title",
          sortable: false,
        },
        {
          key: "author",
          title: "Author",
          sortable: false,
        },
        {
          key: "category",
          title: "Category",
          sortable: false,
        },
        {
          key: "ratings",
          title: "Ratings",
          sortable: true,
        },
        {
          key: "description",
          title: "Description",
          sortable: false,
        },
        {
          key: "price",
          title: "Price",
          sortable: true,
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getterAllBooks"]),

    rows() {
      return this.getterAllBooks.length;
    },
  },
  mounted() {
    this.actionGetAllBooks();
  },
  methods: {
    ...mapActions(["actionGetAllBooks"]),

    deleteItem(id) {
      this.$store.dispatch("actionDeleteBook", id).then(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    editItem(book) {
      this.$root.$emit("edit-book", Object.assign({}, book));
      this.$bvModal.show("FormModal");
    },
    viewItem(id) {
      this.$router.push({ name: "view", params: { id: id } });
    },
    addBook() {
      this.$root.$emit("add-book", {});
      this.$bvModal.show("FormModal");
    },
    getURL(data) {
      var txt = document.createElement("textarea");
      txt.innerHTML = data.item.image;
      return txt.value
        ? txt.value
        : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    },
  },
};
</script>
<style lang="css" scoped>
img {
  height: 100px;
  width: 100px;
}

::v-deep .table > tbody > tr > td {
  max-width: 300px;
  overflow-wrap: break-word;
  vertical-align: middle;
}
</style>
