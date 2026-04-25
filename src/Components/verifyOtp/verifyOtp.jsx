import React, { useState, useEffect } from 'react'
import TopbarHeader from '../topbarHeader/TopbarHeader';
import './verifyOtp.scss';
import OTPInput, { ResendOTP } from "otp-input-react";
import imgLogin from '../../assets/images/svg/imgLogin.svg'
import { useNavigate } from 'react-router-dom';
import API from '../../utils/httpService';
import Cookies from 'js-cookie';
import Loader from '../customLoader/loader';
import arrowww from '../../assets/images/svg/arrowBtn.svg';

const VerifyOtpComp = () => {
    ;
    const [Otp, setOtp] = useState("");
    const [closeAlert, setCloseAlert] = useState(false);
    const [email, setEmail] = useState('');
    const [otpError, setOtpError] = useState('');
    const [loading, setLoading] = useState('');
    const [data, setData] = useState([])

    let inputStyle = {
        width: "102.31px",
        height: "108.373px",
        borderRadius: "10px",
        marginRight: "0px",

    }

    // let loginEmail;
    useEffect(() => {
        if (localStorage.getItem("loginEmail")) {
            setEmail(JSON.parse(localStorage.getItem("loginEmail")));
        }
    }, [])

    const handleAlert = () => {
        setOtpError('')
        setCloseAlert(false)
    }
    let navigate = useNavigate();

    const VerifyOtp = async () => {
        setLoading(true);
        try {
            const payload = {
                otp: Otp,
                email: email
            }
            const response = await API.post('/verify-otp', payload);
            if (response?.data) {
                Cookies.set('Authorization', response?.data?.token)
                Cookies.set('educatorName', response?.data?.name)
                setData(response?.data)
                setLoading(false);
                navigate('/dashboard')
            }
            else if (response?.status === 401 || response?.status === 422) {
                setOtpError(response?.error)
                setCloseAlert(true)
                setLoading(false);

            }
        } catch (error) {

        }
    }

    const resendOtp = async () => {
        setLoading(true);
        try {
            const payload = {
                email: email
            }
            const response = await API.post('/resendOtp', payload);
            if (response?.status === 200) {
                setLoading(false);
                setOtpError('')
                setCloseAlert(false)
                setOtp('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderInstantTime = (remainingTime) => {
        return (
            <span style={{color:'#E9406A', fontWeight:500, fontSize:'18px'}}>
                {' '}
                {remainingTime === 0
                    ? ''
                    : ` 00:${remainingTime < 10 ? `0` : ''}${remainingTime} seconds`}
            </span>
        );
    };

    const renderInstantButton = (buttonProps) => {
        return (
            <button {...buttonProps}>
                {buttonProps.remainingTime === 0 ? (
                 <>
                      <div className='timeExpires'>
                      <a
                        // style={{ color: '#E9406A', borderBottom: '2px solid #E9406A' }}
                        onClick={resendOtp}
                        className='resend_sapn'
                    >
                        Resend Email
                    </a>
                      <span className='resend-desc'> Code Expired - Click Resend  </span> 
                      </div>
                 </>
                ) : (
                    <p style={{ cursor: 'text', color:'#313131', fontWeight:450, fontSize:'18px' }} className="resend d-none d-lg-block">
                        Resend Email
                        <br></br>
                    </p>
                )}
            </button>
        );
    };

    return (
        <>
        {loading && (
            <Loader/>
        )}
            <TopbarHeader />
            <div className='verifyOtp'>
                <div className='left'>
                    <img src={imgLogin} alt="" />
                </div>
                <div className='right'>
                    <div className="card">
                        <h1> Confirm your email </h1>
                        <p className='email-sent'> An email has been sent to the <br />
                            following email address <span className='name-high'>{email}</span></p>
                        <div className="px-md-4 otp-login-box">
                            <OTPInput
                                value={Otp}
                                onChange={setOtp}
                                autoFocus
                                hasErrored
                                OTPLength={4}
                                otpType="number"
                                disabled={false}
                                secure={false}
                                className={`${otpError ? 'otpError' : ''} otp-contain`}
                                inputStyles={inputStyle}
                            />
                        </div>
                        {closeAlert && <div className="toast-alert">
                            <span> {otpError} </span>
                            <span className='cross-icon' onClick={handleAlert}> </span>
                        </div>}
                        <div className='resend-wrape'>
                            {/* <span onClick={resendOtp} className='resend_sapn'> Resend SMS </span>*/}

                            <div className="resend-sms-otp px-4 ">
                                <ResendOTP
                                    maxTime={60}
                                    className="OtpCounting otp_box_resend"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        flexDirection: 'column-reverse',
                                    }}
                                    renderButton={renderInstantButton}
                                    renderTime={renderInstantTime}
                                />
                            </div>
                        </div>
                        <div className="btn_wrape">
                            <button type='submit' onClick={VerifyOtp}> CONTINUE </button>
                            <div className="arrow_wrape">
                                <img src={arrowww} className="arrow"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default VerifyOtpComp;