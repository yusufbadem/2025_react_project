import { IProfileUsers } from "../models/IProfileUsers"
import { IUserComments } from "../models/IUserComments"
import api from "./api"


export const allUsers=() =>{
    const token=localStorage.getItem('token')
    const header={
        Authorization: `Bearer ${token}`,
    }

    const sendParam={
        page:1,
        per_page:10
    }
    return api.get<IProfileUsers>('users',{params:sendParam,headers:header})

}


export const usersComment =()=>{

    const sendParam={
        page:1,
        per_page:10
    }

    return api.get<IUserComments>('comments/', {params:sendParam})
}