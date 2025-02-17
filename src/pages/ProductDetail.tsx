import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { singleProduct } from '../services/productService'
import { Product } from '../models/IProduct'
import { Rating } from '@mui/material'
import { getAllLikes, getSingleLikes, isLikesControl } from '../utils/store'
import { usersComment } from '../services/profileService'
import { UserComment } from '../models/IUserComments'
import { useDispatch } from 'react-redux'
import { ILikeAction } from '../useRedux/likesReducer'

function ProductDetail() {

const [isLike, setIsLike] = useState(false)
const params=useParams()
const [item, setItem] = useState<Product>()
const [bigImage, setbigImage] = useState("")
const [showComments, setShowComments] = useState<UserComment[]>([])

const showProductComments =()=>{
  const id=params.pid
  usersComment().then(res=>{
    setShowComments(res.data.data)
  })
}
useEffect(() => {
  const id=params.pid
  usersComment().then(res=>{
    setShowComments(res.data.data)
  })
}, [])


// useEffect(() => {
  
//   const pid=params.pid;
//   if (pid && item) {
//     console.log(isLike,pid)
//   }
  
//   }, [isLike])
  
const dispatch=useDispatch();

const likesControl=()=>{
    const likeStatus=!isLike
    setIsLike(likeStatus)
    const pid=params.pid
  if (item && pid) {
    isLikesControl(pid)
  }
    const arr=getAllLikes()
       const sendObj :ILikeAction ={
         type: 'ALL_LIKES',
         payload: arr
       }
       dispatch(sendObj)
}


useEffect(() => {
  const pid=params.pid 

  if (pid) {
    setIsLike(getSingleLikes(pid))
    singleProduct(pid)
    .then(res=>{
      setItem(res.data.data)
      setbigImage(res.data.data.images[0])
    })
  }
}, [])

  return (
    <>
    
    {item && 
      <div className="row">
        <div className='col-sm-6'>
          <h2>{item.title}</h2>
          <h4><span className="badge text-bg-light">{item.brand}</span></h4>
          <Rating name="product-rating" value={item.rating} precision={0.01} readOnly />
          <p>{"Bu üründen sadece "+item.stock +" adet kaldı !!!" }</p>
          <h3><span className="badge text-bg-secondary">{item.price +" tl"}</span></h3>
          <h5>
            {item.tags.map((tag, index) => (
              <span key={index} style={{ marginRight: "8px" }}>{tag}{index < item.tags.length - 1 ? "," : ""}</span>
            ))}
          </h5>
          <br/>
          <br/>
          <h5>{item.description}</h5>
          <p>
            <i onClick={likesControl} 
            role='button' className={isLike === false ? 'bi bi-suit-heart fs-2': 'bi bi-suit-heart-fill fs-2 text-danger'}></i>
            </p>
        </div>

        {/* <div className='col-sm-6'>
         <br/>
        <img src={bigImage} className='img-fluid mb-3' />
        {item.images.map((image,index) =>
          <img onClick={()=>{setbigImage(image)}} role='button' key={index} src={image} className='img-thumbnail me-2' width={120}/>
        )}
        </div> */}
        <div className='col-md-6'>
                        <img src={bigImage} className="img-fluid rounded shadow-lg mb-3" />
                        <div className='d-flex flex-wrap'>
                            { item.images.map( (image, index) =>
                                <img onClick={() => setbigImage(image) } role='button' key={index} src={image} className='img-thumbnail me-2 mb-2' width={120} />
                            )}
                        </div>
                    </div>
      </div>
    }
      <div>
        <h3>Yorumlar</h3>
      {showComments.map((item,index)=>
      <div className="card mb-3" >
       <div key={index} className="card-body">
      <h4 className="card-title">{item.name}</h4>
      <h5 className="card-title">{item.email}</h5>
      <p className="card-text">{item.body}</p>
    </div>
   </div>
    )}
      </div>   
    </>
  )
}

export default ProductDetail