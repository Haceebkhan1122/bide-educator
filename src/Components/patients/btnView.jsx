import React from 'react'
import { useNavigate } from 'react-router-dom'

const BtnView = ({rowData,onClick}) => {
    const navigate = useNavigate();

    return (
        <button onClick={onClick} className='patient-view-btn'>
            View
        </button>
    )
}

export default BtnView;