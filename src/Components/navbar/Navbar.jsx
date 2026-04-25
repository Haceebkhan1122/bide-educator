import React, {useState, useEffect} from 'react'
import './navbar.scss';
import { Divider } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import {
    Form as AntForm,
    Button,
    Badge as AntdBadge,
} from "antd";
import notificationSvg from '../../assets/images/svg/notification.svg';
import bideLogo from '../../assets/images/svg/iconbide.svg';
import hpfLogo from '../../assets/images/svg/hpfSvg.svg';
import navbarLogo from '../../assets/images/svg/navbarLogo.svg';
import arrowDown from '../../assets/images/svg/arrowDown.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [educatorName, setEducatorrName] = useState(false);

    const navigate = useNavigate();

    const Logout = () => {
        Cookies.remove('Authorization');
        Cookies.remove('patientID')
        window.location.href = "/login";
    }

    useEffect(() => {
        const educatorName = Cookies.get('educatorName')
        setEducatorrName(educatorName)
    }, [])


    return (
        <div className='navbarComp'>
            <div className="left" onClick={() => navigate('/dashboard')}>
                <img src={navbarLogo} alt="" className='nav__logo' />
                <div className="circular_bar">
                    <img src={hpfLogo} alt="" className='hpfLogo' />
                    <Divider orientation="vertical" className='divider' />
                    <img src={bideLogo} alt="" className='bideLogo' />
                </div>
            </div>
            <div className="wraperRight">
                <ul className="links">


                    {/* <NavLink
                        to='/'
                    >
                       <img src="/assets/images/svg/icon001.svg" alt="" className='nav__logo' />
                    </NavLink> */}
                    <NavLink
                        to='/dashboard'
                    >
                        Queue
                    </NavLink>
                    <NavLink
                        to='/patients'
                    >
                        Patients
                    </NavLink>
                </ul>
                <div className="profile">
                    {/* <div className="notificationBtns">
                        <AntdBadge count={22}>
                            <Button
                                type=""
                                className="notification-btn"
                            >
                                <img
                                    src={notificationSvg}
                                    alt="notification icon"
                                    className="img-fluid"
                                    width={200}
                                    height={200}
                                />
                            </Button>
                        </AntdBadge>
                    </div> */}
                    <div className='d-flex justify-content-center me-3'>
                        <div className='circleDropdown '>
                            <p className='mt-1'>
                                {educatorName?.[0]?.toUpperCase()}
                            </p>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <img src={arrowDown} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
