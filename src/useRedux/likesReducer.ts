import { UnknownAction } from "redux"

export interface ILikeAction extends UnknownAction{
    type:string,
    payload:string[]
}


export const likesReducer= (state:string[]=[],action:ILikeAction) =>{
    switch(action.type){
        case "ALL_LIKES":
            return action.payload
        default:
            return state
    }
}