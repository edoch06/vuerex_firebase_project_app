<template>
  <div>
    <div class="container">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel green white-text center">
          <h3>Register</h3>
          <form @submit.prevent="register">
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="text" id="email" v-model="email">
              <label for="email">Email</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password">
              <label for="email">Password</label>
            </div>
            <button class="btn btn-large grey lighten-4 black-text">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
	setup () {
	
		const store = useStore();
    const email = ref('');
    const password = ref('');

		const register = () => {

      const userObj = {
        email: email.value,
        password: password.value
      }

    
			store.dispatch('register', userObj)
		}

    return {
      email,
      password,
      register
    }
	}
}
</script>

<style scoped>
label,
i {
  color: white;
}
</style>