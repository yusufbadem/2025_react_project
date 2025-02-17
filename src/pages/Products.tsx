import React, { useEffect, useState } from 'react'
import { allPRoduct } from '../services/productService'
import { Product } from '../models/IProduct'
import { NavLink } from 'react-router-dom'
import { getSingleLikes } from '../utils/store'


function Products() {

  const [arr, setArr] = useState<Product[]>([])

  useEffect(() => {
    allPRoduct("1","40").then(res=>{
      setArr(res.data.data)

    })

  }, [])
  

  return (
    <>
     <h2>Products</h2>
     <div className='row'>
  {arr.map((item, index) => (
    <div key={index} className='col-sm-4 mb-3 d-flex align-items-stretch' >
      <div className="card w-100 d-flex flex-column">
        <img src={item.images[0]} className="card-img-top" alt="..." />
        <div className="card-body d-flex flex-column">
          <div className='d-flex justify-content-between align-items-center'>
          <h5 className="card-title">{item.title}</h5>
          <i 
            role='button' className={getSingleLikes(item.id.toString()) === false ? 'bi bi-suit-heart fs-2': 'bi bi-suit-heart-fill fs-2 text-danger'}></i>
          </div>
          <p className="card-text">{item.price}</p>
          {/* Butonun her zaman kartın altında kalmasını sağlamak için mt-auto kullanıyoruz */}
          <NavLink to={"/productDetail/" + item.id} className="btn btn-warning mt-auto">Go to Detail</NavLink>
        </div>
      </div>
    </div>
  ))}
</div>
    </>
  )
}

export default Products