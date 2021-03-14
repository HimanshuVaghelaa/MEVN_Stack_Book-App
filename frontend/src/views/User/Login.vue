<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h4>Login</h4>
      <form name="form" @submit.prevent="handleLogin">
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
          <div class="d-flex align-items-center">
            <input type="checkbox" id="remember" v-model="rememberMe" />
            <label for="remember" class="ml-2">Remember Me</label>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message.message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
      rememberMe: false,
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
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
    if (localStorage.getItem("userDetails") != null) {
      this.user = JSON.parse(localStorage.getItem("userDetails"));
      this.rememberMe = true;
    }
  },
  methods: {
    isFormValid() {
      this.rules.email.isInvalid = !this.user.email;
      this.rules.password.isInvalid = !this.user.password;

      return !this.rules.email.isInvalid && !this.rules.password.isInvalid;
    },

    handleLogin() {
      if (this.isFormValid()) {
        this.loading = true;

        if (this.rememberMe) {
          localStorage.setItem("userDetails", JSON.stringify(this.user));
        } else {
          if (localStorage.getItem("userDetails") != null) {
            localStorage.removeItem("userDetails");
          }
        }

        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/home");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
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
