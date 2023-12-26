import { Link, useNavigate } from "react-router-dom"
import "../../Stylesheets/Astrologers.scss"
import { useEffect, useState, useCallback } from "react"
import { Button, Badge, Spinner } from "react-bootstrap";
import { Box } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import React from 'react';
import {useSelector} from "react-redux";

function Methods() {
    const [isLoading, setIsloading] = useState(true)
    const [methods, setMethods] = useState(null)
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate()
    const {token}= useSelector(state=>state.authState)
    // const token = auth.token

    useEffect(() => {
        async function fetchData() {
            let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/method/show`, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },   
            method: "GET",
            });
            // console.log(response);
            let data = await response.json();
            console.log(data)
            setIsloading(false)
            setMethods(data.categories)
            console.log(methods);
        }
        fetchData();
    }, []);

    const rows = methods?.map((category, index) => ({
        ...category,
        
        serialNumber: index + 1,

        category :category.category[0]?.name   
      
    }))


    const columns = [
        {
            field: 'serialNumber', headerName: 'S.No.', width: 5, sortable: false,
            filterable: false, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"
        },
        {
            field:'category', headerName: 'Astrology', width: 200, headerClassName: 'super-app-theme--header',
            align: "center",
            headerAlign: 'center',
        },
      
        // {
        //     field: 'isActive',
        //     headerName: '',
        //     type: 'text',
        //     width: 250,
        //     headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        //     align: "center"

        // },
        // {
        //     field: 'mobilePrimary',
        //     headerName: 'Mobile No.',
        //     width: 200,
        //     sortable: false,
        //     headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        //     align: "center"

        // },
        // {
        //     field: 'isActive',
        //     headerName: 'Status',
        //     renderCell: (params) => params.row.isActive== "Yes" ? (<Badge bg="success">Active</Badge>) : (<Badge bg="danger">Inactive</Badge>),
        //     width: 150,
        //     headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        //     align: "center"

        // },
        {
            field: 'details',
            headerName: 'Details',
            renderCell: (params) => <Button variant="warning" onClick={() => navigate(`/method/${params?.row._id}`)} >
                View
            </Button>,
            width: 100,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: "center"

        },
    ];

    const getRowSpacing = useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
        };
    }, []);

    return (
        <div className="infoContainer">
            <main id="admin-astro">
                <section className="astro-head">
                    <div>
                        <h4>Methodology</h4>
                        <div style={{ height: "3px", width: "40px", backgroundColor: "#0042ae", borderRadius: "10px", marginTop: "3px" }}></div>
                    </div>
                    <div>
                        <Link to="/addmethod" className="addAstroLink">Add Method</Link>
                    </div>
                </section>
                {isLoading ? (
                    <div className="loading">
                        <Spinner animation="grow" variant="warning" className="text-center" />
                    </div>
                ) : (
                    <section className="my-4" style={{ backgroundColor: "#FFFFFF", textAlign: "center" }}>
                        <Box
                            sx={{
                              
                                width: '100%',
                                '& .super-app-theme--header': {
                                    // backgroundColor: 'rgba(0, 0, 0, 0.9)',
                                    // color: 'rgba(255,255,255,1)',
                                    fontWeight: "400"

                                },
                            }}
                        >
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                getRowId={row => row._id}
                                initialState={{
                                    ...methods.initialState,
                                    pagination: { paginationModel: { pageSize: 5 } },
                                }}
                                pageSizeOptions={[0, 5, 10, 25]}
                                disableRowSelectionOnClick
                                getRowSpacing={getRowSpacing}
                                sx={{
                                    [`& .${gridClasses.row}`]: {
                                        bgcolor: (theme) =>
                                            theme.palette.mode === 'light' ? grey[200] : grey[900],
                                    },
                                }}

                            />
                        </Box>
                    </section>
                )}
            </main>
        </div >
    )
}


export default Methods