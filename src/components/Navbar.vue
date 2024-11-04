<template>
  <nav id="nav-bar">
    <div class="nav-wrap blue">
      <div class="container">
        <router-link to="/" class="brand-logo">Employee Manager</router-link>
        <ul class="right">
          <li v-if="user">
            <span class="email black-text">{{ user.email }}</span>
          </li>
          <li v-if="user">
            <router-link to="/">Dashboard</router-link>
          </li>
          <li v-if="!user">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!user">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="user">
            <button @click="conLogout" class="btn black">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { onBeforeMount, computed  } from 'vue'
import { useStore, mapGetters } from 'vuex'

export default {
  setup() {
    const store = useStore()

// console.log(store.state.users.user.name)

    const user = computed(() => {
      // return store.state.users.user
      return store.getters.allUsers

    })
   

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })


    const conLogout = () => {

      // console.log('Logout')
      store.dispatch('logout')

    }

    return { 
      user,   
      conLogout
    }

  }


}
</script>

<style scoped>
.email {
  padding-right: 10px;
}
</style>