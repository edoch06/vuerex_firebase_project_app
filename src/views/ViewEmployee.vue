<template>
  <div id="view-employee">
    <h3>View Employee</h3>
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>
          {{ name }}
        </h4>
      </li>
      <li class="collection-item"> Employee ID#: {{ employee_id }}</li>
      <li class="collection-item"> Department : {{ dept }}</li>
      <li class="collection-item"> Position : {{ position }}</li>

    </ul>
    <router-link to="/" class="btn grey back-button">Back</router-link>
    <button @click="deleteEmployee" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link :to="{ name: 'edit-employee', params: { employee_id: employee_id } }"
        class="btn-floating btn-large red"><i class="fa fa-pencil"></i></router-link>
    </div>
  </div>
</template>

<script>
import { db } from '../components/firebaseInit.js'
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import store from '@/store';




export default {
  name: 'view-employee',
  data() {
    return {
      id: null,
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
      
        this.id = doc.id
        this.employee_id = doc.data().employee_id
        this.name = doc.data().name
        this.dept = doc.data().dept
        this.position = doc.data().position
        this.id = doc.data().id

      })



    },
    async  deleteEmployee() {

      if (confirm('Are you sure ?')) {
     
        await store.dispatch('removeEmployee', this.id)
        this.$router.push('/')
      }

    },
    // async confirm_delete() {
    //   await deleteDoc(doc(db, 'employees', this.id))
      
    // }

  },


}
</script>

<style scoped>
button {
  padding-right: 25px;
  padding-left: 25px;
}

.back-button {
  margin-right: 10px;
  padding-right: 25px;
  padding-left: 25px;
}
</style>