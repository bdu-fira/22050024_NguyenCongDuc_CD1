import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod facilis eveniet animi, esse ad eius. Ab quas, maiores officia totam voluptatibus perspiciatis accusamus similique necessitatibus sit magnam obcaecati, exercitationem natus.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Công ty</h2>
                    <ul>
                        <li>Trang chủ</li>
                        <li>Về chúng tôi</li>
                        <li>Vận chuyển</li>
                        <li>Chính sách bảo mật</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Liên hệ</h2>
                    <ul>
                        <li>0344-394-856</li>
                        <li>ducok123aa@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">BDU 2025 Tomato CHUYÊN ĐỀ - NHÓM 8.</p>
        </div>
    )
}

export default Footer