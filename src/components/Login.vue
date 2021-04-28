<template>
  <div id="Login">
    <main class="pa5  bg-white">
      <form class="measure center" @submit.prevent="login">
        <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
          <legend class="f4 fw6 ph0 mh0">Sign In</legend>
          <p class="lh-title ma4 cursive f3">Good Food for Good Moments</p>
          <div class="mt3">
            <label class="db fw6 lh-copy f6 tl" for="email-address">Email</label>
            <input class="pa2 input-reset ba  w-100"
                   type="email" name="email-address"
                   id="email-address" v-model="email">
          </div>
          <div class="mv3">
            <label class="db fw6 lh-copy f6 tl" for="password">Password</label>
            <input class="b pa2 input-reset ba w-100"
                   type="password" name="password"
                   id="password" v-model="password">
          </div>
        </fieldset>
        <div class="">
          <input class="b br2 ph3 pv3 input-reset ba b--none bg-moon-gray grow pointer f6 dib w-100" type="submit"
                 value="Sign in">
        </div>

        <div class="lh-copy mt3" @click="changePath">
          <span class="f6 link dim black db">Sign up</span>
        </div>
      </form>
    </main>

  </div>
</template>

<script>
import '../styles/login.scss'

export default {
  name: 'Login',
  components: {},
  props: ['signUp'],
  data() {
    return {
      email: 'test@test.com',
      password: 'BHARGAV9228393389',
    };
  },
  created() {
    console.log({API_KEY: process.env.API_KEY})
    console.log({URL: process.env.URL})
  },
  methods: {
    changePath() {
      this.$router.push('/signup')
    },
    async login() {
      const urlencoded = new URLSearchParams();
      urlencoded.append("email", this.email);
      urlencoded.append("password", this.password);

      const requestOptions = {
        method: 'POST',
        body: urlencoded,
        credentials: 'include'
      };
      const res = await fetch(`https://fast-badlands-89964.herokuapp.com/login`, requestOptions);
      if (res.status === 201) {
        await this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style>

</style>
