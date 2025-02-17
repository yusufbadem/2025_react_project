import React, { useEffect, useState } from 'react'
import { allUsers } from '../services/profileService'
import { ProfileUser } from '../models/IProfileUsers'

function User2() {

const[singleUser,setSingleUser]=useState<ProfileUser>()
const [users, setUsers] = useState<ProfileUser[]>([])

useEffect(() => {
    allUsers().then(res=>
    {
     setUsers(res.data.data)   
     setSingleUser(res.data.data[0])
    }).catch(err =>{
        localStorage.clear()
        window.location.href="/"
    })
}, [])

  return (<>
    
    <h3>Users</h3>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">Profile</th>
      <th scope="col">Name</th>
      <th scope="col">Username</th>
      <th scope="col">City</th>
      <th scope="col">Email</th>
      <th scope="col">Website</th>
    </tr>
  </thead>
  <tbody>
    {users.map((item,index) => 
    <tr key={index} onClick={()=>setSingleUser(item)} 
     data-bs-toggle="modal" data-bs-target="#exampleModal" role='button'>
      <td>
        <img className='rounded-circle' height={40} src={item.profile} alt={item.name} />
      </td>
      <td>{item.name}</td>
      <td>{item.username}</td>
      <td>{item.address.city}</td>
      <td>{item.email}</td>
      <td>{item.website}</td>
    </tr>
    )}
  </tbody>
</table>
<div className="modal fade" id="exampleModal" tabIndex={-1}aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5 position-absolute start-50 translate-middle-x w-100 text-center" id="exampleModalLabel">{singleUser?.name}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className='d-flex justify-content-center '>
            <img src={singleUser?.profile} alt={singleUser?.name}  
            className='rounded-circle'/>
        </div>
        <p>{singleUser?.email}</p>
        <p>{singleUser?.phone}</p>
        <p>{singleUser?.address.city}</p>
        <p>{singleUser?.website}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  </>
    
  )
}

export default User2