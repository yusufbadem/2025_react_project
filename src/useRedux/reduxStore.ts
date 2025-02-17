import { combineReducers, legacy_createStore } from "redux";
import { likesReducer } from "./likesReducer";


const combine = combineReducers({
    likesReducer
})

//datayı redux ortamından çekerken hangi reducer üyesinin gelmesi gerektigine karar verecek
export type StateType =ReturnType<typeof combine>

export const reduxStore=legacy_createStore(combine)