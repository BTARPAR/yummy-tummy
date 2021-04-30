<template>
  <div id="Login" class="ds-w-100">
    <main class="pa5 ds-login-pa5 bg-white">
      <form class="measure center " @submit.prevent="login">
        <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
          <legend class="f4 fw6 ph0 mh0">Sign In</legend>
          <p class="lh-title ma4 cursive f3">Good Food for Good Moments</p>
          <p class="lh-title ma4 cursive fw5 f4 light-red" v-if="error">
            Please try again.
          </p>
          <div class="mt3">
            <label class="db fw6 lh-copy f6 tl" for="email-address">Email</label>
            <input class="pa2 input-reset ba  w-100"
                   type="email" name="email-address"
                   id="email-address" v-model="email"
                   v-bind:disabled="clicked">
          </div>
          <div class="mv3">
            <label class="db fw6 lh-copy f6 tl" for="password">Password</label>
            <input class="b pa2 input-reset ba w-100"
                   type="password" name="password"
                   id="password" v-model="password"
                   v-bind:disabled="clicked">
          </div>
        </fieldset>
        <div class="">
          <input class="b br2 ph3 pv3 input-reset ba b--none bg-moon-gray grow pointer f6 dib w-100" type="submit"
                 :value="clicked ? '' : 'Sign in'" v-bind:disabled="clicked" v-if="!clicked">
          <font-awesome-icon icon="spinner" spin size="2x" class="icon-s" v-if="clicked"/>
        </div>

        <div class="lh-copy mt3" @click="!clicked && changePath">
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
      email: '',
      password: '',
      clicked: false,
      error: false
    };
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
      this.clicked = true
      this.error = false
      const res = await fetch(`${process.env.URL}/login`, requestOptions);
      if (res.status === 201) {
        await this.$router.push('/dashboard')
      }
      this.error = true
      this.clicked = false
    }
  }
}
</script>

<style>

</style>
