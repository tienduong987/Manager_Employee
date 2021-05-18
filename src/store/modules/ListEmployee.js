import axios from 'axios';
const ListEmployee={
    state:{
        listEmployee: localStorage.getItem('listAllEmployee') ? JSON.parse(localStorage.getItem('listAllEmployee')) : []
    },
    getters:{
        list:state =>state.listEmployee
    },
    mutations:{
        GET_ALL_EMPLOYEE:(state,listEmployee) => {
            state.listEmployee =listEmployee
        },
        DELETE_EMPLOYEE:(state,listId) =>{
            const newList =state.listEmployee.filter(item => item.id !==listId)
            state.listEmployee=newList
        },
        UPDATE_EMPLOYEE:(state,data) => {
            const update = state.listEmployee.map(item => {
                if(item.id ===data.id){
                    item=data
                }
                return item
            })
            state.listEmployee=update
        },
        ADD_EMPLOYEE:(state,data) =>{
            state.listEmployee.unshift(data)
        }
    },
    actions :{
        async getAllEmployee ({commit}){
            try{
                const response = await axios.get('https://60a1f3cd745cd70017575bb4.mockapi.io/employee')
                await commit('GET_ALL_EMPLOYEE',response.data)
                console.log(response)
                const list= JSON.stringify(response.data)
                localStorage.setItem('listAllEmployee',list)
                return Promise.resolve(true)
                
            }catch(error){
                console.log(error);
                return Promise.reject(false)
            } 
        },
        async deleteEmployee({commit},id){
            try{
                if(id){ 
                    await axios.delete(`https://60a1f3cd745cd70017575bb4.mockapi.io/employee/${id}`)
                    commit('DELETE_EMPLOYEE',id)
                }
                return Promise.resolve(true)
            }catch(error){
                console.log(error)
                return Promise.reject(false)
            }
        },
        async updateEmployee({commit},data){
            try{
                const emplloyee= await axios.put(`https://60a1f3cd745cd70017575bb4.mockapi.io/employee/${data.id}`,data)
                await commit('UPDATE_EMPLOYEE',emplloyee.data)
                return Promise.resolve(true)
            }catch(error){
                console.log(error)
                return Promise.reject(false)
            }
        },
        async addEmployee({commit},data){
            try {
                if(data){
                    const employee = await axios.post('https://60a1f3cd745cd70017575bb4.mockapi.io/employee',data)             
                    await commit('ADD_EMPLOYEE',employee.data)
                    }
                    return Promise.resolve(true)
                } catch (error) {
                console.log(error)
                return Promise.reject(false)
            }
        }
    },
}

export default ListEmployee