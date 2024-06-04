import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import ThemeInput from '../components/input/ThemeInput'
import {useForm} from 'react-hook-form'
import {LuSearch, LuUserCircle2} from "react-icons/lu";
import {useDebounce} from 'use-debounce';
import ThemeDataTable from '../components/general/ThemeDataTable';
import {setPage, setPaginatedData, setPerPage} from '../store/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {getFilteredData} from '../utils/helper';
import ViewModal from '../components/modal/ViewModal';
import DeleteModal from '../components/modal/DeleteModal';
import { reportColumns} from '../utils/columns-constants'
import {errorMsg, successMsg} from "../constants/msgs.js";
import {useDeleteReportsMutation, useGetAllReportTypesQuery} from "../store/apis/reportApi.js";
import ReportTypeDetails from "../components/dashboard/ReportTypeDetails.jsx";
import AddReportTypesModal from "../components/modal/AddReportTypesModal.jsx";
import EditReportTypesModal from "../components/modal/EditReportTypesModal.jsx";

const ReportTypes = () => {
    const {register, control, handleSubmit, watch, formState: {errors}} = useForm({mode: 'onChange'})
    const dispatch = useDispatch()
    const searchText = watch('searchText')
    const [stats, setStats] = useState([])
    const [isOpen, setIsOpen] = useState({type: null, open: false})
    const {isLoading, data, refetch} = useGetAllReportTypesQuery()
    const [deleteReport, {isLoading: isDeleteLoading}] = useDeleteReportsMutation()
    const {selectedData} = useSelector(state => state.reports)
    const [open, setOpen] = useState(false)

    const handleDeleteUser = async () => {
        const userId = selectedData?._id
        const {data, error} = await deleteReport(userId)

        if (data) {
            setIsOpen({type: null, open: false})
            successMsg(data.message)
        } else {
            errorMsg(error.data.message)
        }
    }
    const handleAddModal = (e) => {
        e.preventDefault();
        if (open) setOpen(false)
        else setOpen(true)
    }
    return (
        <>
            <div className='pages user-page'>
                <Row>
                    <Col xs={12} className='mb-4'>
                        <h2 className='text-black fw-800'>Report Types</h2>
                    </Col>

                    {/*{*/}
                    {/*    stats?.map((item, index) => (*/}
                    {/*        <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3} className='mb-3'>*/}
                    {/*            <StatsCard data={item}/>*/}
                    {/*        </Col>*/}
                    {/*    ))*/}
                    {/*}*/}

                    <Col xs={12} className='mt-2'>
                        <div className="table-wrapper">
                            <Row className='justify-content-between'>
                                <Col sm={6} lg={5} xl={4}>
                                    <div className="search-input">
                                        <ThemeInput
                                            name="searchText"
                                            control={control}
                                            errors={errors}
                                            placeholder="Search..."
                                            type="text"
                                        />
                                        <LuSearch className='icon text-black'/>
                                    </div>

                                </Col>

                                <Col sm={4} lg={3} xl={2} className='text-end mt-3 mt-sm-0'>
                                    <Button className='w-100 h-100 btn-solid btn-purple' onClick={handleAddModal}>Add Report</Button>
                                </Col>
                            </Row>

                            <Row className='mt-3'>
                                <ThemeDataTable
                                    columns={reportColumns(setIsOpen, dispatch)}
                                    rows={getFilteredData(data?.data, searchText)}
                                    isLoading={isLoading}
                                    setPage={setPage}
                                    setPerPage={setPerPage}
                                />
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
            <AddReportTypesModal isOpen={open} setIsOpen={setOpen} refetch={refetch}/>
            <ViewModal children={<ReportTypeDetails/>} title="Report Type Details" size="md" isOpen={isOpen}
                       setIsOpen={setIsOpen}/>
            <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} handleDelete={handleDeleteUser}
                         isLoading={isDeleteLoading}/>
            <EditReportTypesModal selectedData={selectedData} isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch}/>
            {/*<BlockUnblockModal isOpen={isOpen} setIsOpen={setIsOpen}/>*/}
        </>
    )
}

export default ReportTypes