import React from 'react'
import Navbar from './navbar/Navbar';

const BaseLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default BaseLayout;
