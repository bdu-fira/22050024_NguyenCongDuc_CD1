import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';



const FoodDisplay = ({ category }) => {
    const context = useContext(StoreContext);
    if (!context) return null; // Tránh lỗi nếu `StoreContext` chưa được cung cấp

    const { food_list } = context;

    return (
        <div className='food-display' id='food-display'>
            <h2>Những món ăn hàng đầu gần bạn</h2>
            <div className='food-display-list'>
                {food_list.map((item,index)=>{
                    if (category==="All" || category===item.category) {
                        return <FoodItem key={index} id = {item._id} name = {item.name} description = {item.description} price = {item.price} image = {item.image}/>
                    }
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;
