<template>
  <header id="header" class="courier f3 lh-title pv4">
    <LoadingScreen :load="loading" :message="error"/>
    <img src="../assets/logo.png" width="100" @click="home" class="pointer">
    <div class="dn-s"> Yummy - Tummy</div>

    <div v-if="this.$route.path !== '/delivery'">
      <button v-if="loggedIn" @click="logOut"
              class="f5 grow b--none no-underline br3 ph4 pv2 white bg-black-50 pointer">Log Out
      </button>
      <button v-if="!loggedIn" @click="placeOrder"
              class="f5 grow b--none no-underline br3 ph4 pv2 white bg-black-50 pointer">
        Order
      </button>
    </div>
    <div v-else>
      <button @click="loginView" class="f5 grow b--none no-underline br3 ph4 pv2 white bg-black-50 pointer">
        Log In
      </button>
    </div>
  </header>
</template>

<script>
import '../styles/header.scss'
import LoadingScreen from "@/components/LoadingScreen";

export default {
  name: 'Header',
  components: {LoadingScreen},
  data() {
    return {
      loggedIn: (this.$route.path !== '/' && this.$route.path !== '/signup'),
      loading: false,
      error: ''
    }
  },
  methods: {
    home() {
      if (this.loggedIn && this.$route.path !== '/delivery' && this.$route.path !== '/dashboard') {
        this.$router.push('/dashboard')
      }
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
      this.loading = true
      this.error = 'Logging Out....'
      const requestOptions = {
        method: 'POST',
        credentials: 'include'
      };

      await fetch(`${process.env.URL}/logOut`, requestOptions);
      const timer = setTimeout(() => {
        this.loading = false
        this.error = ''
        this.$router.push('/')
        clearTimeout(timer)
      }, 3000)
    }
  },
  watch: {
    $route: 'setLoggedIn'
  }
}
</script>

<style>

</style>
