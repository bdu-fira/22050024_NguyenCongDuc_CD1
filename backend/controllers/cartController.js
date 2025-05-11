import userModel from "../models/userModel.js"

//add
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);;
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Đã thêm vào giỏ hàng"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Lỗi"})
    }
}

//remove
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Đã xóa khỏi giỏ hàng"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Lỗi"})
    }
}

//Lấy dữ liệu giỏ hàng của người dùng 1
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Lỗi"})
    }
}

export {addToCart,removeFromCart,getCart}