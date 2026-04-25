import React, { useState } from 'react'
import TopbarHeader from '../topbarHeader/TopbarHeader';
import './auth.scss';
// import VerifyOtpComp from '../verifyOtp/verifyOtp';
// import SignInEmail from '../../Components/signInEmail/signInEmail';
import imgLogin from '../../assets/images/svg/imgLogin.svg'
import arrowBtn from '../../assets/images/svg/arrowBtn.svg'
import API from '../../utils/httpService';
import { useNavigate } from 'react-router-dom';
import Loader from '../customLoader/loader';

const AuthComp = () => {

    const [email,setEmail] = useState('');
    const [errorState,setErrorState] = useState('');
    const [loading,setLoading] = useState(false);
    const naviagte = useNavigate();
    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const sendCode = async  () => {
        setLoading(true)
        if(email == ''){
            setErrorState('Please enter your email');
            setLoading(false)     
        }
        else{
            try {
                const data = { 
                    email : email,
                    role_id: 3
                };
                if(data){
                    const response = await API.post('/login',data);
                    if(response?.status === 200){
                        if (localStorage.getItem("loginEmail")) {
                            localStorage.removeItem("loginEmail");
                          }
                         setLoading(false)    
                          localStorage.setItem("loginEmail", JSON.stringify(email));
                        naviagte('/verify-otp') 
                    }
                    else if(response?.status !== 200){
                        setErrorState(response?.error)
                        setLoading(false)    
                    }
                }
            } catch (error) {
                
            }
        }
      
    }

    return (
        <>
        {loading && (
            <Loader/>
        )}
            <TopbarHeader />
            <div className='auth'>
                <div className='left'>
                    <img src={imgLogin} alt="" />
                </div>
                <div className='right'>
                            <div className='emailSignIn'>
                                <div className="card">
                                    <h1> Sign in with your Email </h1>
                                    <div className="single">
                                        <label htmlFor="email"> Email </label>
                                        <input onChange={emailHandler} value={email} type="text" name="" id="email" placeholder='Enter your Email address' className={`${errorState ? 'errorBorder' : null} valid`} />
                                        {errorState && (
                                            <p className='errorState'>{errorState}</p>
                                        )}
                                    </div>
                                    <div className="btn_wrape">
                                        <button type='submit' onClick={sendCode}> SEND CODE </button>
                                        <div className="arrow_wrape">
                                            <img src={arrowBtn} className="arrow icon"></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
        </>
    )
}

export default AuthComp;