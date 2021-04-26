<template>
  <header id="header" class="courier f3 lh-title pv4">
    <img src="../assets/logo.png" width="100">
    <div> Yummy - Tummy</div>

    <div v-if="loggedIn" @click="logOut">Log Out</div>
    <div v-else></div>
  </header>
</template>

<script>
import '../styles/header.scss'

export default {
  name: 'Header',
  components: {},
  data() {
    return {
      'loggedIn': this.$route.path !== '/' && this.$route.path !== '/signup'
    }
  },
  methods: {
    setLoggedIn() {
      console.log(this.$route)
      this.loggedIn = this.$route.path !== '/' && this.$route.path !== '/signup'
    },
    async logOut() {

      const requestOptions = {
        method: 'POST',
        credentials: 'include'
      };

      await fetch(`http://localhost:4000/logOut`, requestOptions);
      console.log(this.$router)
      this.$router.push('/')

    }
  },
  watch: {
    $route: 'setLoggedIn'
  }
}
</script>

<style>

</style>
