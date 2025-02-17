import { IJWTprofile, IUser, IUserLogout } from "../models/IUser";
import { IUserRegister } from "../models/IUserRegister";
import api from "./api";

export const userLogin = (email:string,password:string)=>{

    const sendObj={
        email:email,
        password:password
    }

    return api.post<IUser>('auth/login',sendObj)
}

export const userRegister=(name:string,email:string,password:string)=>{
    const sendObj={
        name:name,
        email:email,
        password:password
    }

    return api.post<IUserRegister>("auth/signup",sendObj)
}


export const userProfile=((jwt:string)=>{

    const header={
        Authorization:`Bearer ${jwt}`
    }

    return api.get<IJWTprofile>('profile/me',{headers:header})
})

export const userLogOut=((jwt:string)=>{
    const header={
        Authorization:`Bearer ${jwt}`
    }

    return api.post<IUserLogout>("auth/logout", {}, { headers: header });
})