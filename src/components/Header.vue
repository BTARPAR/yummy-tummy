<template>
  <header id="header" class="courier f3 lh-title pv4">
    <img src="../assets/logo.png" width="100" @click="home" class="pointer">
    <div> Yummy - Tummy</div>

    <div v-if="this.$route.path !== '/delivery'">
      <button v-if="loggedIn" @click="logOut"
              class="f5 grow b--none no-underline br3 ph4 pv2 mr4 white bg-black-50 pointer">Log Out
      </button>
      <button v-if="!loggedIn" @click="placeOrder"
              class="f5 grow b--none no-underline br3 ph4 pv2 mr4 white bg-black-50 pointer">
        Place Order
      </button>
    </div>
    <div v-else>
      <button @click="loginView" class="f5 grow b--none no-underline br3 ph4 pv2 mr4 white bg-black-50 pointer">
        Log In
      </button>
    </div>
  </header>
</template>

<script>
import '../styles/header.scss'

export default {
  name: 'Header',
  components: {},
  data() {
    return {
      loggedIn: (this.$route.path !== '/' && this.$route.path !== '/signup')
    }
  },
  methods: {
    home() {
      this.$router.push('/dashboard')
    },
    loginView() {
      this.$router.push('/')
    },
    placeOrder() {
      this.$router.push('/delivery')
    },
    setLoggedIn() {
      this.loggedIn = this.$route.path !== '/' && this.$route.path !== '/signup'
    },
    async logOut() {

      const requestOptions = {
        method: 'POST',
        credentials: 'include'
      };

      await fetch(`http://localhost:4000/logOut`, requestOptions);
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
