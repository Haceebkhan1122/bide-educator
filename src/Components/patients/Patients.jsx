import React, { useEffect, useState } from 'react'
import WraperLayout from '../wraperLayout/wraperLayout';
import { useNavigate } from 'react-router-dom';
import { Table  } from 'antd';
import Navbar from '../navbar/Navbar';
import API from '../../utils/httpService';
import Cookies from 'js-cookie';
import './patients.scss';
import { render } from '@testing-library/react';

const Patients = () => {

    const navigate = useNavigate();
    const [patientList, setPatientList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItemCount, setTotalItemCount] = useState(0);


    useEffect(() => {
        getInitialPatientList();
    }, [currentPage]); // Fetch initial patient list whenever currentPage changes

    const getInitialPatientList = async () => {
        try {
            const response = await API.get(`patient/list?page=${currentPage}`);
            setPatientList(response?.data);
            setTotalItemCount(response?.meta?.total)
            const calculatedTotalPages = Math.ceil(response?.meta?.total / 4); // Assuming 4 rows per page
            setTotalPages(calculatedTotalPages);
        } catch (error) {
            console.error('Error fetching initial patient list:', error);
        }
    };

    // const handlePageClick = async (event) => {
    //     setCurrentPage(event.page + 1); // Page is zero-based, so increment by 1
    // };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const searchPatients = async (searchKey) => {
        try {
            const response = await API.get(`patient/search?search_key=${searchKey}`);
            setPatientList(response?.data);
        } catch (error) {
            console.error('Error searching patients:', error);
        }
    };

    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchKey(value);
        searchPatients(value);
    };

    const handleAction = (rowData) => {
        const existingPatientID = Cookies.get('patientID');
        if (existingPatientID) {
            Cookies.remove('patientID');
        }
        Cookies.set('patientID', rowData?.patient_id);
        navigate('/patient/patient-profile');
    };

    const actionTemplate = (rowData) => {
        return (
            <button onClick={() => handleAction(rowData)} className='patient-view-btn'>View</button>
        );
    };

    const textTemplate = (text, rowData) => {
        return (
            <span className='years-text'> {text} yrs</span>
        );
    };


    const columns = [
        {
            title: 'Registration Date',
            dataIndex: 'registration_date',
        },
        {
            title: 'MR No',
            dataIndex: 'mr_no',
        },
        {
            title: 'Patient',
            dataIndex: 'name',
        },
        ,
        {
            title: 'Number',
            dataIndex: 'number',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            render: (text, rowData) => textTemplate(text,rowData)
        },
        {
            title: 'Last visit',
            dataIndex: 'last_visit',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, rowData) => actionTemplate(rowData),
        }
    ];


    return (
        <>
            <Navbar />
            <WraperLayout>
                <div className='patients'>
                    <h2> Patients </h2>
                    <input
                        type="text"
                        placeholder='Search patients by number, name, MR number'
                        value={searchKey}
                        onChange={handleSearchInputChange} />
                    <div className="table-wraper-patients">
                        {/* <DataTable
                            paginator
                            rows={3} // Set the number of rows per page
                            value={patientList}
                            totalRecords={totalPages * 3}
                            // first={(currentPage)} // Calculate the first record index based on currentPage
                            onPage={handlePageClick} // This event triggers when the user clicks on a different page
                        >
                            <Column field="registration_date" header="Registration Date"></Column>
                            <Column field="mr_no" header="MR No"></Column>
                            <Column field="name" header="Patient"></Column>
                            <Column field="number" header="Number"></Column>
                            <Column field="age" header="Age"></Column>
                            <Column field="last_visit" header="Last visit"></Column>
                            <Column field='action' header="Action" body={actionTemplate}></Column>
                        </DataTable> */}
                        <Table
                            columns={columns}
                            dataSource={patientList}
                            pagination={{
                                current: currentPage,
                                defaultPageSize: 4,
                                total: totalItemCount,
                                showSizeChanger: false,
                                onChange: handlePageChange,
                            }}
                        />
                    </div>
                </div>
            </WraperLayout>
        </>
    )
}

export default Patients;
