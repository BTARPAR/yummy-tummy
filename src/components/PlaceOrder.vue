<template>
  <form class="measure center" @submit.prevent="placeOrder">
    <div class="mb4">
      <p>Our service is to surprise out customer with surprise order feature.</p>
      <p>All you have to do is, give us your delivery address and select restaurant</p>
      <p>We'll select today's special of restaurant</p>
    </div>
    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
      <legend class="f3 fw6 ph0 mh0">Delivery Details</legend>
      <div class="mv3 flex flex-column">
        <label class="db fw6 lh-copy f6 tl" for="firstname">Firstname</label>
        <input class="b pa2 input-reset ba"
               type="text" name="firstname"
               id="firstname" v-model="firstname">
      </div>
      <div class="mv3 flex flex-column">
        <label class="db fw6 lh-copy f6 tl" for="lastname">Lastname</label>
        <input class="b pa2 input-reset ba"
               type="text" name="lastname"
               id="lastname" v-model="lastname">
      </div>
      <div class="mt3">
        <div>
          <label class="db fw6 lh-copy f6 tl" for="address">Street</label>
          <input class="b pa2 input-reset ba  w-100"
                 type="text" name="address"
                 id="address" v-model="street">
        </div>
      </div>
      <div class="mt3 flex justify-between">
        <div class="w-70">
          <label class="db fw6 lh-copy f6 tl" for="city">City</label>
          <input class="b pa2 input-reset ba  w-100"
                 type="text" name="city"
                 id="city" v-model="city">
        </div>
        <div class="w-20">
          <label class="db fw6 lh-copy f6 tl" for="state">State</label>
          <input class="b pa2 input-reset ba tc w-100"
                 type="text" name="state"
                 id="state" v-model="state">
        </div>

        <div class="w-20">
          <label class="db fw6 lh-copy f6 tl" for="zip">Postal Code</label>
          <input class="b pa2 input-reset ba tc w-100"
                 type="text" name="state"
                 id="zip" v-model="zip">
        </div>
      </div>
      <div class="mt3 flex justify-between items-center">
        <div class="w-50">
          <label class="db fw6 lh-copy f6 tl pv2" for="phonenumber">Ph no.</label>
          <input class="b pa2 input-reset ba  w-100"
                 type="text" name="phonenumber"
                 id="phonenumber" v-model="phonenumber">
        </div>
        <div class="w-40">
          <label class="db fw6 lh-copy f6 tl flex justify-between items-center" for="person">
            No. hungry tummy
            <img src="../assets/hungry-tummy.png" width="30" class="pa2">
          </label>
          <input class="b pa2 input-reset ba  w-100"
                 type="text" name="person"
                 id="person" v-model="person">
        </div>
      </div>
      <div class="mt3">
        <label class="db fw6 lh-copy f6 tl" for="restaurant">Select Restaurant</label>
        <div id="restaurant">
          <ul class="bg-black-05 gray f5 fw6 tracked">
            <li class="dib ma2 bg-white bg-animate hover-bg-light-gray hide-child br3 relative">
              <a href="#" class="dib nav tc no-underline pa2 ph4 dark-gray ">Select Restaurant</a>
              <ul class="menu list bg-gray mt1 b-yellow pa2 f6 child
              child-vs o-100-vs absolute-m
              absolute-l top-100-m w-100 br2 shadow-4 z-1">
                <li class="ma3 pa2 bg-white bg-animate br3"
                    v-bind:class="{
                        'bg-light-green': place._id === selectedPlace,
                        'hover-bg-light-red pointer': place._id !== selectedPlace
                    }"
                    v-for="place in restaurantList" :key="place._id"
                    @click="selected(place._id)">
                  {{ place.name }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt3">
        <input class="b br2 ph3 pv3 input-reset ba b--none bg-moon-gray  pointer f6 dib w-100"
               v-bind:class="{
                  'grow':selectedPlace !== ''
               }"
               type="submit"
               value="Place order" v-bind:disabled="selectedPlace === ''">
      </div>
    </fieldset>
  </form>
</template>

<script>

export default {
  name: 'PlaceOrder',
  components: {},
  data() {
    return {
      firstname: 'Bhargav',
      lastname: 'Tarpara',
      street: '3186',
      city: 'Los Angeles',
      state: 'CA',
      phonenumber: '6264645601',
      zip: '90066',
      restaurantList: [{name: 'Taco Bell', _id: 1}, {name: 'Indian Spice', _id: 2}],
      person: '3',
      selectedPlace: '1',
      error: {},
      masterCheck: false
    }
  },
  methods: {
    selected(place) {
      console.log({place})
      this.selectedPlace = place
    },
    checkError() {
      [
        'firstname',
        'lastname',
        'street',
        'city',
        'state',
        'phonenumber',
        'selectedPlace'
      ].map((key) => {
        this.error[key] = this[key] === '';
      })
    },
    async placeOrder() {
      this.checkError()

      if (Object.values(this.error).includes(true)) {
        this.masterCheck = true
        return
      } else {
        this.masterCheck = false
      }

      const data = {
        address: {
          street: this.street,
          zipCode: this.zip,
          city: this.city,
          state: this.state,
        },
        restaurant_id: '6084c96c992fee893975d7b9',
        phonenumber: this.phonenumber,
        name: this.firstname + ' ' + this.lastname,
        noOfPeople: this.person
      }

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
      };
      const res = await fetch('http://localhost:4000/placeOrder', requestOptions);
      if (res.status === 201) {
        await this.$router.push('/login')
      }

    },
    reviewOrder() {

    }
  }
}
</script>

<style>

</style>
