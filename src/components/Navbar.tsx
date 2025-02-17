import React, { useEffect, useRef, useState } from 'react'
import { data, NavLink, replace, useNavigate } from 'react-router-dom'
import { userLogOut, userProfile } from '../services/userService'
import { getAllLikes } from '../utils/store';
import { useDispatch, useSelector } from 'react-redux';
import { ILikeAction } from '../useRedux/likesReducer';
import {StateType} from "../useRedux/reduxStore"


function Navbar() {

    const searhRef=useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLAnchorElement>(null)
    const navigate=useNavigate()
    
    const [name, setName] = useState("")
    //const [allLikes, setAllLikes] = useState<string[]>([])

    useEffect(() => {
      
      if (searhRef.current) {
        searhRef.current.hidden=true
      }
      if (nameRef.current) {
        nameRef.current.hidden=true
      }
      const jwt=localStorage.getItem('token')
      if (jwt===null) {
        navigate("/")
      }else{
         userProfile(jwt)
         .then(res=>{
            const userData=res.data 
            if (userData) {
                setName(userData.data.name) 
                
            if (searhRef.current) {
              searhRef.current.hidden=false
              searhRef.current.focus()
            }
            if (nameRef.current) {
              nameRef.current.hidden=false
              nameRef.current.style.color="Purple";
            }
            }
         }).catch(err=>{
            localStorage.clear();
            window.location.href="/"
        })
      }
    }, [])

    const logout=()=>{
      localStorage.clear();
      window.location.replace("/")
      
    }
    
    const fncLogout=()=>{
      const jwt=localStorage.getItem("token")
      if (jwt===null) {
        navigate("/")
      }
      else{
      userLogOut(jwt)
      .then(res=>{
        const message=res.status
        if(res.status===200){
          localStorage.clear()
          console.log(res.data) // ? 
        alert("Çıkış başarılı")
          window.location.replace("/")
      }     
      }).catch(err=>{

        alert(err)
        // localStorage.clear()
        // window.location.replace("/")

      })
    }
    }

    //redux a datayı göndermek için kullanılır
    const dispatch= useDispatch()

    //reduxdan datayı çekme işlemi
    const allLikes=useSelector((item:StateType) => item.likesReducer)
    useEffect(() => {
      const arr=getAllLikes()
     const sendObj :ILikeAction ={
       type: 'ALL_LIKES',
       payload: arr
     }
     dispatch(sendObj)
    }, [])
    


  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Pro App</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <NavLink to={'/products'} className="nav-link active">Products</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to={'/likes'} className="nav-link active">Likes({allLikes.length})</NavLink>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Profile 
                </a>
                <ul className="dropdown-menu">
                    <li><NavLink to={"/users"} className="dropdown-item" >Users</NavLink></li>
                    <li><a className="dropdown-item" href="#">My Products</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" role='button' onClick={fncLogout}>Logout</a></li>
                </ul>
                </li>
                <li className="nav-item">
                <a ref={nameRef} className="nav-link disabled" aria-disabled="true">{"Welcome "+ name}</a>
                </li>
            </ul>
            <form action='/search' className="d-flex" role="search">
                <input name='q' ref={searhRef} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
   </nav>
    </>
  )
}

export default Navbar