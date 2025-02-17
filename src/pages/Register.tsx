import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { userRegister } from '../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('')

  const navigate=useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const fncRegister = (evt:React.FormEvent) => {
      setEmailError('')
      setPasswordError('')  

      evt.preventDefault();
        if (name ==='' ) {
            alert('Please enter your name')
        }
        else if(email === '')
        {
            alert('Please enter your password')
        }
        else if(password === '')
        {
            alert('Please enter your password')
        }
        else if(confirmPassword !== password)
        {
            alert('password doesnt match')
        }
        else{
          userRegister(name,email,password)
          .then(res=> {
              const status=res.status
              const data=res.data
              console.log("name :",name,"Email :",email,"Password :",password)
              if(status === 201)
              {
                toast.success("User Registered succesfully")
                setTimeout(() => {
                  navigate("/")
                }, 3000);
                
              }
              else{
                toast.error(data.errors?.email?.[0])
                const message=data.errors?.email?.[0]
                console.log(data.errors)
               
              }
          }).catch(err=>{
            const emailError=err.response.data.errors.email
            const passwordError=err.response.data.errors.password
            
            if(emailError)
            {
              setEmailError(emailError[0])
            }
            if (passwordError) {
              setPasswordError(passwordError[0])
            }
          })
        }
      }

  return (
    <>
    <ToastContainer/>
      <div className='row'>
          <div className='col-12 col-md-3 col-lg-4'></div>
          <div className='col-12 col-md-6 col-lg-4'>
              <h2>User Register</h2>
              <form onSubmit={fncRegister}>
                <div className='mb-3'>
                <label htmlFor="name" className='form-label'>Name</label>
                <input onChange={(evt)=>setName(evt.target.value)} required type='text' className='form-control' id='name'/>
                </div>
                <div className='mb-3'>
                  <label htmlFor="exampleInputEmail1" className='form-label'>Email Adress</label>
                  <input onChange={(evt)=>setEmail(evt.target.value)} required type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp'/>
                  <div className='form-text text-danger'>{emailError}</div>
                </div>
                <div className='mb-3'>
                  <label htmlFor="exampleInputPassword1" className='form-label '>Password</label>
                  <input onChange={(evt)=>setPassword(evt.target.value)} required type='password' className='form-control' id='exampleInputPassword1' />
                  <div className='form-text text-danger'>{password === "" ? null : password.length < 8 ? passwordError : null}</div>
                </div>
                <div className='mb-3'>
                  <label htmlFor="exampleInputPassword2" className='form-label'>Confirm Password</label>
                  <input onChange={evt=>setConfirmPassword(evt.target.value)} required type='password' className='form-control' id='exampleInputPassword2' />
                  <div className='form-text'>{password ===confirmPassword ? null :"password doesn't match"}</div>
                </div>
                <div className='d-flex justify-content-between'>
                <button type='submit' className='btn btn-success'>Register</button>
                <NavLink to="/" className='btn btn-danger'>Cancel</NavLink>
                </div>
              </form>
          </div>
          <div className='col-12 col-md-3 col-lg-4'></div>
      </div>
    </>
  )
}

export default Register