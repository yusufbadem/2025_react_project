import React, { useEffect, useState } from 'react'
import { getAllLikes, getSingleLikes, isLikesControl } from '../utils/store'
import { singleProduct } from '../services/productService';
import { Product } from '../models/IProduct';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ILikeAction } from '../useRedux/likesReducer';

function Likes() {

  const [arr, setArr] = useState<Product[]>([])

useEffect(() => {
  //burda sayfa yüklendiginde var olan likesleri sayfada bastık
  likesRefresh()
}, [])

const fncIslikes=(pid:number)=>{
  //burada begenilip begenilmedigini var oln begenilerin tekrardan iptal edilip edilmedigini kontrol eden fucntion
  isLikesControl(pid.toString())
  likesRefresh()
}

const dispatch=useDispatch()
const likesRefresh=(()=>{
//storageda olan likes degerlerini getirip burada idleri yaklyıp likes syfasınd göstermek için aşagıdaki kodları yazdık
  const arrId=getAllLikes()
  const sendObj :ILikeAction ={
           type: 'ALL_LIKES',
           payload: arrId
         }
         dispatch(sendObj)
  const arrProduct :Product[] =[]
  axios.all(arrId.map(id=> singleProduct(id)))
  .then(res=>{
    res.map(r=>{
      arrProduct.push(r.data.data)
    })
    setArr(arrProduct)
  })
})



return (
  <>
   <h2>Likes</h2>
   <div className='row'>
{arr.map((item, index) => (
  <div key={index} className='col-sm-4 mb-3 d-flex align-items-stretch' >
    <div className="card w-100 d-flex flex-column">
      <img src={item.images[0]} className="card-img-top" alt="..." />
      <div className="card-body d-flex flex-column">
        <div className='d-flex justify-content-between align-items-center'>
        <h5 className="card-title">{item.title}</h5>
        <i  onClick={()=> fncIslikes(item.id)}
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

export default Likes