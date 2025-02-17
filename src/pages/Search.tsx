import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { Product } from '../models/IProduct';
import { productSearch } from '../services/productService';
import { getSingleLikes } from '../utils/store';

function Search() {
  const [arr, setArr] = useState<Product[]>([])
  const searchRef=useRef<HTMLSpanElement>(null)
  

const[params,setParams]= useSearchParams();
const [q, setq] = useState("")
useEffect(() => {
  const q=params.get('q')
 if (q) {
  setq(q)
  productSearch(q).then(res=>{
    setArr(res.data)
    if(searchRef.current)
    searchRef.current.style.color="green";
  }).catch(err=>{
    setq(q +"  not found");
    if(searchRef.current)
      searchRef.current.style.color="red";
  })
 }
    
  
}, [])


  return (
    <>
      <h2 >Search for <span ref={searchRef}>{q}</span> ({arr.length}) </h2>
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

export default Search