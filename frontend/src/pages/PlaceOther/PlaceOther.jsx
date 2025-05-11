import React, { useContext, useEffect, useState } from 'react'
import './PlaceOther.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PlaceOther = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext (StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}));
}

  const PlaceOther = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Lỗi");
    }
  }

  const navigate = useNavigate();
  useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0)
    {
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={PlaceOther} className='place-order'>
      <div className="place-order-left">
        <p className="title">Thông tin giao hàng</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Tên đầu tiên' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Họ'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Địa chỉ email'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Đường phố'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Thành phố' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='Tình trạng'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Mã bưu chính' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Quốc gia'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Điện thoại' />
      </div>
      <div className="place-order-right">
      <div className='cart-total'>
          <h2>Tổng số giỏ hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Tổng cộng</p>
              <p>{getTotalCartAmount()}VND</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Giao hàng</p>
              <p>{getTotalCartAmount()===0?0:2}VND</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Tổng cộng</b>
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}VND</b>
            </div>
          </div>
          <button type='submit'>Thanh toán</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOther