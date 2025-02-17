import React, { useEffect, useState } from 'react'
import { allUsers } from '../services/profileService'
import { ProfileUser } from '../models/IProfileUsers'

function Users() {

const [singleUser, setSingleUser] = useState<ProfileUser>()
  const [usersArr, setUsersArr] = useState<ProfileUser[]>([])

useEffect(()=>{
  const jwt=localStorage.getItem('token')
  if(jwt === null)
  {
    window.location.href=("/")
  }else{
    allUsers().then(res=>{
      setUsersArr(res.data.data)
      setSingleUser(res.data.data[0])// bunu söylemezsek state modal ile çakışır ve asenkronluktan dolayı hata alırız.Bu şekilde ilk eleman ataması yapılır ve hata ortadan kalkar
    }).catch(err=>{
      localStorage.clear()
      window.location.replace("/")
    })
  }

},[])

  return (
    <>
    <table className="table table-hover">
    <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Pics</th>
          <th scope="col">UserName</th>
          <th scope="col">User</th>
          <th scope="col">Email</th>
          <th scope="col">Company</th>
          <th scope="col">City</th>

        </tr>
      </thead>
      <tbody>
      {usersArr.map((item,index)=>(
        <tr onClick={()=>setSingleUser(item)} 
        key={item.id} role='button' 
        data-bs-toggle="modal" data-bs-target="#exampleModal">
          <th scope="row">{item.id}</th>
          <td>
              <img src={item.profile} alt={item.name} width={50} height={50} style={{ borderRadius: "50%" }} />
            </td>
          <td style={item.role === "admin" ? {color:"red"}:{}}>{item.role}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.company.name}</td>
          <td>{item.address.city}</td>
          
        </tr>
      ))}
  </tbody>
</table>
{singleUser &&
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered"> 
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">{singleUser.name}</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className='d-flex justify-content-center '>
            <img src={singleUser.profile} alt="" className='rounded-circle'/>
         
          </div>
          <p>{singleUser.address.city}</p>
          <p>{singleUser.address.street}</p>
          <p>{singleUser.address.suite}</p>
            <p>{singleUser.phone}</p>
            <p>{singleUser.website}</p>
            <p>{singleUser.email}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         
        </div>
      </div>
    </div>
  </div>
  }
    </>
  )
}

export default Users