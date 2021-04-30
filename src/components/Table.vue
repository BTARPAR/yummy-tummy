<template>
  <div class="mt5 mb5 mr4 ml4"
       v-bind:class="{
              'flex': type === 'detail',
              'flex-column': type === 'detail',
              'justify-center': type === 'detail',
              'items-center': type === 'detail',
           }">
    <div class="self-start ml5 ds-ml" v-if="type === 'detail'">
      <button @click="update"
              class="grow ml6 ba b--transparent no-underline br3 ph4 pv2 white ds-ml-6"
              v-bind:class="{
        'bg-gray': !edit,
        'bg-light-blue': edit,
      }">
        <span v-if="!edit">Edit</span>
        <span v-else>Update</span>
      </button>
    </div>

    <table class="collapse bg-white"
           v-bind:class="{
              'w-100': type !== 'detail',
              'w-80': type === 'detail',
           }"
    >
      <thead>
      <tr></tr>
      <tr class="striped--light-silver" v-if="type !== 'detail'">
        <th class="tl pa3"> Order No.</th>
        <th class="tl pa4 pl0 dn-s"> Date</th>
        <th class="tl pa3 pl0 dn-m"> Customer Name</th>
        <th class="tl pa3 pl0 dn-s dn-m"> Restaurant Name</th>
        <th class="tl pa3 pl0 dn-s"> Total</th>
        <th class="tl"></th>
      </tr>

      <tr class="striped--light-silver" v-else>
        <th class="tl pa3"> Quality</th>
        <th class="tl pa4 pl0"> Item</th>
        <th class="tl pa3 pl0 dn-s" v-if="!edit"> Price</th>
        <th class="tl pa3 pl0 dn-s dn-m"> Food Type</th>
        <th class="tl pa3 pl0 dn-s dn-m"> Spice Level</th>
        <th class="tl"></th>
      </tr>
      </thead>

      <tbody class="" v-if="type !== 'detail'">
      <tr v-for="(u, index) in tableData" :key="index"
          class="striped--near-white"
          v-bind:class="{
            'pointer grow hover-bg-lightest-blue': type !== 'detail'
          }"
          @click=" type !== 'detail' && updateOrder(u._id)">
        <td class="flex items-center tl pa3 pl4 pl-3-s" v-if="type !== 'detail'">
          <p>#{{ u.order_no }}</p>
        </td>

        <td class="flex items-center tl pa3 pl4 pl-3-s" v-else>
          <p>#{{ u.order_no }}</p>
        </td>

        <td class="tl h3 lh-copy dn-s" v-if="type !== 'detail'">
          <div class="">
            {{ u.date }}
          </div>
        </td>

        <td class="tl h3 lh-copy dn-s" v-else>
          <div class="">
            {{ u.item_name }}
          </div>
        </td>

        <td class="tl dn-m" v-if="type !== 'detail'">
          <span class="">{{ u.customer_info.name }}</span>
        </td>

        <td class="tl h3 lh-copy dn-s" v-else>
          <div class="">
            {{ u.price }}
          </div>
        </td>

        <td class="tl dn-s dn-m" v-if="type !== 'detail'">
          <span class="">{{ u.restaurant_info.name }}</span>
        </td>

        <td class="tl h3 lh-copy dn-s" v-else>
          <div class="">
            {{ u.foodType }}
          </div>
        </td>

        <td class="tl dn-s dn-m" v-if="type !== 'detail'">{{ u.total }}</td>

        <td class="tl h3 lh-copy dn-s" v-else>
          <div class="">
            {{ u.spiceLevel }}
          </div>
        </td>

        <td class="tl pa3" v-if="type !== 'detail'">
          <span>Edit</span>
        </td>
      </tr>
      </tbody>

      <tbody class="" v-else>
      <tr v-for="(u, index) in tableData.selected_items" :key="index"
          class="striped--near-white w-100">
        <td class="flex items-center tl pa3 pl4 pl-3-s">
          <p v-if="!edit">{{ u.quantity }}</p>
          <input id="name" class=" ba b--black-20 pa2 mb2 db w-20 br3 tc w-60-m"
                 type="number" v-model="u.quantity" v-else
                 aria-describedby="name-desc">
        </td>

        <td class="tl h3 lh-copy">
          <div class="ttc">
            {{ u.item_name }}
          </div>
        </td>

        <td class="tl h3 lh-copy" v-if="!edit">
          <div class="">
            $ {{ Number(u.quantity * u.item_price).toFixed(2) }}
          </div>
        </td>

        <td class="tl h3 lh-copy dn-s dn-m">
          <div class="ttc">
            {{ u.foodType }}
          </div>
        </td>

        <td class="tl h3 lh-copy dn-s dn-m">
          <div class="ttc">
            {{ u.spiceLevel }}
          </div>
        </td>

        <td class="tc grow-large" v-if="edit" @click="remove(index)">
        <span class="hover-bg-dark-red link br-100 shadow-5 ph1 pv1 bg-light-red pointer">
          <font-awesome-icon icon="times" class="tc white ph1 pv1 relative" style="top: 5px"/>
        </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Table',
  components: {},
  data() {
    return {
      edit: false
    }
  },
  props: ['tableData', 'type'],
  methods: {
    updateOrder(id) {
      this.$router.push(`/${id}`)
    },
    remove(index) {
      this.tableData.selected_items.splice(index, 1)
    },
    update() {
      if (this.edit) {
        this.updateApi()
      }
      this.edit = !this.edit
    },
    async updateApi() {
      this.$emit('callback', 'start')
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(this.tableData),
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include'
      };

      const id = this.$route.params.id

      const response = await fetch(`${process.env.URL}/getOrder?id=${id}`, requestOptions);

      if (response.status === 200) {
        const timer = setTimeout(() => {
          this.$emit('callback', 'success')
          clearTimeout(timer)
        }, 2000)
      } else {
        this.$emit('callback', 'error')
      }

    }
  }
}
</script>

<style>

</style>
