<template>
  <div id="SignUp">
    <main class="pa5  bg-white">
      <form class="measure center" @submit.prevent="createUser">
        <fieldset id="sign_up" class="ba b--transparent ph0 mh0 flex flex-column items-center">
          <legend class="f4 fw6 ph0 mh0">Sign Up</legend>
          <div class="mt3 w-60 flex flex-column">
            <label class="db fw6 lh-copy f6 tl" for="email-address">Email</label>
            <input class="pa2 input-reset ba "
                   type="email" name="email-address"
                   id="email-address" v-model="email">
          </div>
          <div class="mv3 w-60 flex flex-column">
            <label class="db fw6 lh-copy f6 tl" for="password">Password</label>
            <input class="b pa2 input-reset ba"
                   type="password" name="password"
                   id="password" v-model="password">
          </div>
          <div class="mv3 w-60 flex flex-column">
            <label class="db fw6 lh-copy f6 tl" for="firstname">Firstname</label>
            <input class="b pa2 input-reset ba"
                   type="text" name="firstname"
                   id="firstname" v-model="firstname">
          </div>
          <div class="mv3 w-60 flex flex-column">
            <label class="db fw6 lh-copy f6 tl" for="lastname">Lastname</label>
            <input class="b pa2 input-reset ba"
                   type="text" name="lastname"
                   id="lastname" v-model="lastname">
          </div>
        </fieldset>
        <div class="">
          <input class="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit"
                 value="Sign up">
        </div>
      </form>
    </main>

  </div>
</template>

<script>

export default {
  name: 'SignUp',
  components: {},
  data() {
    return {
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  },
  methods: {
    async createUser() {
      const urlencoded = new URLSearchParams();
      urlencoded.append("email", this.email);
      urlencoded.append("password", this.password);
      urlencoded.append("firstName", this.firstname);
      urlencoded.append("lastName", this.lastname);

      const requestOptions = {
        method: 'POST',
        body: urlencoded,
        credentials: 'include'
      };
      const res = await fetch(`${process.env.URL}/signup`, requestOptions);
      if (res.status === 201) {
        await this.$router.push('/')
      }

    }
  }
}
</script>

<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
