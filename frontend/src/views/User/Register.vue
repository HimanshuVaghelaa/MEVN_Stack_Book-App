<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h4 v-if="!successful">Sign Up</h4>
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              type="email"
              class="form-control"
              name="email"
            />
            <div
              v-if="rules.email.isInvalid"
              class="alert alert-danger"
              role="alert"
            >
              {{ rules.email.errorMessage }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="rules.password.isInvalid"
              class="alert alert-danger"
              role="alert"
            >
              {{ rules.password.errorMessage }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Sign Up</button>
          </div>
        </div>
      </form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message.message }}
      </div>
      <span v-if="successful"
        >Please, Click here to
        <router-link to="/login">Login</router-link></span
      >
    </div>
  </div>
</template>

<script>
import User from "../../models/user";

export default {
  name: "Register",
  data() {
    return {
      user: new User("", ""),
      successful: false,
      message: "",
      rules: {
        email: {
          isInvalid: false,
          errorMessage: "Email Required",
        },
        password: {
          isInvalid: false,
          errorMessage: "Password Required",
        },
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    isFormValid() {
      this.rules.email.isInvalid = !this.user.email;
      this.rules.password.isInvalid = !this.user.password;

      return !this.rules.email.isInvalid && !this.rules.password.isInvalid;
    },

    handleRegister() {
      this.message = "";
      if (this.isFormValid()) {
        this.$store.dispatch("auth/register", this.user).then(
          (data) => {
            this.message = data;
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
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
