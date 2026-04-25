import React from 'react'
import styles from './wraperLayout.scss';

const WraperLayout = ({ children }) => {
    return (
        <div className='wraperLayout'>
            {children}
        </div>
    )
}

export default WraperLayout;
