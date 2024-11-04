<template>
  <div id="dashboard">
    <h3>Dashboard</h3>
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" :key="employee.id" class="collection-item">
        <div class="chip">{{ employee.dept }}</div>
        {{ employee.employee_id }}: {{ employee.name }}

        <router-link class="secondary-content"
          :to="{ name: 'view-employee', params: { employee_id: employee.employee_id } }"><i
            class="fa fa-eye"></i></router-link>

      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to='/new-employee' class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters,mapState } from 'vuex';
import { db } from '../components/firebaseInit.js'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import store from '@/store';

export default {
  name: 'dashboard',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('employees', ['allEmployees'])
  },
 
  computed: {
    // Map Vuex getters to computed properties
    ...mapGetters(['allEmployees']),
    
    // Define the user computed property
    employees() {
      return this.allEmployees;
    }
  },
  methods: {

    // ** Creating user in Firebase
    async createUser() {

      const colRef = collection(db, 'employees')

      //data to send
      const dataObj = {
        employee_id: '466',
        name: 'Mary Dawn',
        dept: 'IT',
        position: 'IT Marketer'
      }

      const docRef = await addDoc(colRef, dataObj)

      console.log('Document was created with ID', docRef.id)

    },


  },

  updated() {
    // store.dispatch('fetchEmployees')
  },
  created() {
  
    if (this.allEmployees.length === 0) {
      store.dispatch('fetchEmployees')
    }
    
//** fetch all employees */
   
   

  }

}
</script>

<style></style>