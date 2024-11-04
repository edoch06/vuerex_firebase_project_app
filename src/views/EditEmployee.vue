<template>
  <div id="new-employee">
    <h3>Edit Employee</h3>
    <div class="row">
      <form @submit.prevent="updateEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="employee_id" required>

          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>

          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>

          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required>

          </div>
        </div>
        <button type="submit" class="btn">Update</button>
        <router-link :to="{ name: 'view-employee', params: { employee_id: employee_id } }"
          class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '../components/firebaseInit.js'
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, setDoc } from 'firebase/firestore'
import store from '@/store';




export default {
  name: 'view-employee',
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null,
      id: null,
    }
  },

  created() {



  },
  async beforeRouteEnter(to, from, next) {

    const q = query(collection(db, 'employees'), where('employee_id', '==', to.params.employee_id))
    const querySnap = await getDocs(q)
    querySnap.forEach((doc => {
      next(vm => {
        vm.id = doc.id
        vm.employee_id = doc.data().employee_id
        vm.name = doc.data().name
        vm.dept = doc.data().dept
        vm.position = doc.data().position

      })
    }))

  },
  watch: {
    '$route': 'getEmployee'
  },
  methods: {

    async getEmployee() {

      const q = query(collection(db, 'employees'), where('employee_id', '==', this.$route.params.employee_id))
      const querySnap = await getDocs(q)
      querySnap.forEach((doc) => {


        this.employee_id = doc.data().employee_id
        this.name = doc.data().name
        this.dept = doc.data().dept
        this.position = doc.data().position
        this.id = doc.data().id

      })



    },


    async updateEmployee() {


      const employee = {
        doc_id: this.id,
        employee_id: this.employee_id,
        name: this.name,
        dept: this.dept,
        position: this.position
      }

      await store.dispatch('updateStoreEmployee', employee)
        .then(() => {
          this.$router.push({ name: 'view-employee', params: { employee_id: this.employee_id } })
        }).catch((err) => {
          console.log(err)
        });

     


    }

  },




}
</script>

<style scoped>
button {
  padding-right: 25px;
  padding-left: 25px;
  margin-right: 10px;
}

.back-button {
  margin-right: 10px;
  padding-right: 25px;
  padding-left: 25px;
}
</style>