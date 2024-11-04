import router from "@/router/index.js";
import { db } from '@/components/firebaseInit.js'
import { collection, addDoc, getDocs, query, where, deleteDoc, doc , setDoc
} from 'firebase/firestore'

export const employees = {
  state: () => ({
    employees: [],
  }),
  mutations: {
    ADD_EMPLOYEE(state, employee) {
      
      state.employees.push(employee);
     
    },
    REMOVE_EMPLOYEE(state, doc_id) {
      state.employees = state.employees.filter(
        (emp) => emp.id !== doc_id
      );
    },
    CLEAR_EMPLOYEES(state) {
      state.employees = [];
    },
  },
  actions: {
   
    async removeEmployee({ commit }, doc_id) {      
      await deleteDoc(doc(db, 'employees', doc_id))
      commit("REMOVE_EMPLOYEE", doc_id);
    },


    clearEmployees({ commit }) {
      commit("CLEAR_EMPLOYEES");
    },
    async fetchEmployees({ commit }) {
      const querySnap = await getDocs(collection(db, "employees"));
      querySnap.forEach((doc) => {
        const employee = {
          id: doc.id,
          employee_id: doc.data().employee_id,
          name: doc.data().name,
          dept: doc.data().dept,
          position: doc.data().position,
        };
       
        commit("ADD_EMPLOYEE", employee);
      });
    },

    async addEmployee({ commit }, employee) {

      const colRef = collection(db, 'employees')      
       
      const docRef = await addDoc(colRef, employee)
      
      commit("ADD_EMPLOYEE", employee);
      // this.dispatch('fetchEmployees')
      
        
      
      },



      async updateStoreEmployee({ commit }, employee) {

  
        await setDoc(doc(db, 'employees', employee.doc_id),{
       
  
          employee_id: employee.employee_id,
            name: employee.name,
            dept: employee.dept,
            position: employee.position,
  
        })
        .then(() => {
          commit("REMOVE_EMPLOYEE", employee.doc_id);
          commit("ADD_EMPLOYEE", employee);

        //   commit("CLEAR_EMPLOYEES");
        //  dispatch('fetchEmployees')

            }).catch((err) => {
              console.log(err)
            });
  
  
      }
  },

  getters: {
      allEmployees: state => state.employees ,
    //   getDepartmentById: state => id => state.departments.find(dept => dept.dept_id === id)
  },
};
