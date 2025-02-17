import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Navigate } from 'react-router-dom'
import ProductBreadcrumbs from '../components/Breadcrums'

function Control(props :{item : JSX.Element}) {

  const jwt= localStorage.getItem("token")

  return (
    <>
    {jwt === null && <Navigate to={'/'} />}
    {jwt !== null && 
      <>
    <Navbar/>
    <ProductBreadcrumbs/>
        <div style={{minHeight:'60vh'}}>{props.item}</div>
    <Footer/>
     </>}
    </>
  )
}

export default Control