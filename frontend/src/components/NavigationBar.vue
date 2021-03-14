<template>
  <div id="content-wrapper" class="d-flex flex-column">
    <div id="content">
      <nav
        class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
      >
        <a href class="navbar-brand" @click.prevent>MEVN</a>
        <div class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link v-if="currentUser" to="/home" class="nav-link"
              >All Books</router-link
            >
          </li>
        </div>

        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Sign Up</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
        </div>

        <div v-if="currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">
              {{ currentUser.email }}
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href @click.prevent="logOut">Log out</a>
          </li>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
