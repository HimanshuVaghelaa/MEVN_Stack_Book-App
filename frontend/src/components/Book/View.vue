<template>
  <div class="container mt-5">
    <div class="team-single">
      <div class="row">
        <div class="col-lg-4 col-md-5 xs-margin-30px-bottom">
          <div class="team-single-img">
            <img :src="getURL()" alt="" />
          </div>
        </div>

        <div class="col-lg-8 col-md-7">
          <div class="team-single-text padding-50px-left sm-no-padding-left">
            <h4 class="font-size38 sm-font-size32 xs-font-size30">
              {{ book.title }}
            </h4>
            <p class="no-margin-bottom">
              {{ book.description }}
            </p>
            <div class="contact-info-section margin-40px-tb">
              <ul class="list-style9 no-margin">
                <li>
                  <div class="row">
                    <div class="col-md-5 col-5">
                      <i class="fas fa-graduation-cap text-orange"></i>
                      <strong class="margin-10px-left text-orange"
                        >Author:</strong
                      >
                    </div>
                    <div class="col-md-7 col-7">
                      <p>{{ book.author }}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="row">
                    <div class="col-md-5 col-5">
                      <i class="far fa-gem text-yellow"></i>
                      <strong class="margin-10px-left text-yellow"
                        >Category:</strong
                      >
                    </div>
                    <div class="col-md-7 col-7">
                      <p>{{ book.category }}</p>
                    </div>
                  </div>
                </li>
                <li v-if="book.ratings">
                  <div class="row">
                    <div class="col-md-5 col-5">
                      <i class="far fa-file text-lightred"></i>
                      <strong class="margin-10px-left text-lightred"
                        >Ratings:</strong
                      >
                    </div>
                    <div class="col-md-7 col-7">
                      <p>{{ book.ratings }} out of 5</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="row">
                    <div class="col-md-5 col-5">
                      <i class="fas fa-map-marker-alt text-green"></i>
                      <strong class="margin-10px-left text-green"
                        >Price:</strong
                      >
                    </div>
                    <div class="col-md-7 col-7">
                      <p>{{ book.price }} Rs</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Book from "../../models/book";

export default {
  name: "View",
  data() {
    return {
      book: new Book("", "", "", "", "", "", ""),
    };
  },
  mounted() {
    this.$store
      .dispatch("actionGetSingleBookDetails", { id: this.$route.params.id })
      .then(
        (data) => {
          this.book = data;
        },
        (error) => {
          console.log(error);
        }
      );
  },
  methods: {
    getURL() {
      var txt = document.createElement("textarea");
      txt.innerHTML = this.book.image;
      return txt.value
        ? txt.value
        : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
    },
  },
};
</script>
<style lang="css" scoped>
body {
  font-size: 16px;
  color: #6f6f6f;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.8px;
  margin-top: 20px;
}
.font-size38 {
  font-size: 38px;
}
.team-single-text .section-heading h4,
.section-heading h5 {
  font-size: 36px;
}

.team-single-text .section-heading.half {
  margin-bottom: 20px;
}

@media screen and (max-width: 1199px) {
  .team-single-text .section-heading h4,
  .section-heading h5 {
    font-size: 32px;
  }
  .team-single-text .section-heading.half {
    margin-bottom: 15px;
  }
}

@media screen and (max-width: 991px) {
  .team-single-text .section-heading h4,
  .section-heading h5 {
    font-size: 28px;
  }
  .team-single-text .section-heading.half {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 767px) {
  .team-single-text .section-heading h4,
  .section-heading h5 {
    font-size: 24px;
  }
}
.padding-30px-all {
  padding: 30px;
}
.bg-light-gray {
  background-color: #f7f7f7;
}
.text-center {
  text-align: center !important;
}
img {
  max-width: 100%;
  height: auto;
}

.list-style9 {
  list-style: none;
  padding: 0;
}

.list-style9 li {
  position: relative;
  padding: 0 0 15px 0;
  margin: 0 0 15px 0;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.list-style9 li:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}
.text-orange {
  color: #e95601;
}

.text-green {
  color: #5bbd2a;
}

.text-yellow {
  color: #f0d001;
}

.text-pink {
  color: #ff48a4;
}

.text-purple {
  color: #9d60ff;
}

.text-lightred {
  color: #ff5722;
}
a.text-orange:hover {
  opacity: 0.8;
  color: #e95601;
}

a.text-green:hover {
  opacity: 0.8;
  color: #5bbd2a;
}

a.text-yellow:hover {
  opacity: 0.8;
  color: #f0d001;
}

a.text-pink:hover {
  opacity: 0.8;
  color: #ff48a4;
}

a.text-purple:hover {
  opacity: 0.8;
  color: #9d60ff;
}

a.text-lightred:hover {
  opacity: 0.8;
  color: #ff5722;
}
</style>
