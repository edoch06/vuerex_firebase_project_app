import { auth } from '@/components/firebaseInit'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import router from "@/router/index.js";

export const users = {
    state: () => ({
        user: null,
    }),
    mutations: {
        SET_USER(state, user) {
            state.user = user;
          },
          CLEAR_USER(state) {
            state.user = null;
          },
    },
    actions: {
        async login({ commit }, details) {
            const { email, password } = details;
      
            try {
              await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
              switch (error.code) {
                case "auth/user-not-found":
                  alert("User not found");
                  break;
                case "auth/wrong-password":
                  alert("Wrong password");
                  break;
                default:
                  alert("Something went wrong");
              }
      
              return
             
            }
      
            commit ('SET_USER', auth.currentUser)
            router.push('/')
      
          },
          async register({ commit }, details) {
            const { email, password } = details;
    
            try {
              await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
              switch (error.code) {
                case "auth/email-already-in-use":
                  alert("User not found");
                  break;
                case "auth/invalid-email":
                  alert("Invalid email");
                  break;
                case "auth/operation-not-allowed":
                  alert("Operation not allowed");
                  break;
                  case "auth/weak-password":
                  alert("Weak password");
                  break;
                default:
                  alert("Something went wrong");
              }
      
              return
             
            }
      
            commit ('SET_USER', auth.currentUser)
            router.push('/')
      
    
        },
        async logout ({ commit }) {
            await signOut(auth)
      
            console.log('Logout')
            commit('CLEAR_USER')
      
            router.push('/login')
          },
          fetchUser ({ commit }) {
            auth.onAuthStateChanged(async user => {
              if (user === null) {
                commit('CLEAR_USER')
              } else {
                commit('SET_USER', user)
      
                if (router.isReady() && router.currentRoute.value.path === '/login') {
                  router.push('/')
                }
              }
            })
          },
    },
    
    getters: {
          allUsers: state => state.user,
        //   getDepartmentById: state => id => state.departments.find(dept => dept.dept_id === id)
        }
  };