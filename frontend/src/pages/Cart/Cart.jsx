import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Mục</p>
          <p>Tiêu đề</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng cộng</p>
          <p>Xóa</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}VND</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}VND</p>
                  <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className='cart-bottom'>
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
          <button onClick={()=>navigate('/oder')}>TIẾN HÀNH THANH TOÁN</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>Nếu bạn có mã khuyến mãi, Vui lòng nhấp vào đây</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Mã khuyến mãi'/>
              <button>Gửi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart