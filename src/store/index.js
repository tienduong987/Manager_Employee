import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import ListEmployee from './modules/ListEmployee'

Vue.use(Vuex)
const storeData={
    modules:{
        ListEmployee
    }
 }
  

const store = new Vuex.Store(storeData)
export default store