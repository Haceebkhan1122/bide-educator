import React from 'react';
import './topbarHeader.scss';
import { Divider } from '@mui/material';
import bideLogo from '../../assets/images/svg/ndn.svg';
import hpfSvg from '../../assets/images/svg/hpfSvg.svg';


const TopbarHeader = () => {
    return (
        <div className='topbarHeader'>
            <span className="logoHeader"></span>
            <div className="circular_bar">
                <img src={hpfSvg} alt="" className='hpfLogo' />
                <Divider orientation="vertical" className='divider' />
                <img src={bideLogo} alt="" className='bideLogo' />
            </div>
        </div>
    )
}

export default TopbarHeader;
