import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import ThemeInput from '../components/input/ThemeInput'
import {useForm} from 'react-hook-form'
import {LuSearch, LuUserCircle2} from "react-icons/lu";
import {useDebounce} from 'use-debounce';
import ThemeDataTable from '../components/general/ThemeDataTable';
import {useDeleteFaqMutation, useGetAllFaqsQuery} from '../store/apis/faqApi.js';
import {setPage, setPaginatedData, setPerPage} from '../store/slices/faqSlice';
import {useDispatch, useSelector} from 'react-redux';
import {getFilteredData} from '../utils/helper';
import ViewModal from '../components/modal/ViewModal';
import DeleteModal from '../components/modal/DeleteModal';
import {faqColumns} from '../utils/columns-constants'
import {errorMsg, successMsg} from "../constants/msgs.js";
import FaqDetails from "../components/dashboard/FaqDetails.jsx";
import AddFaqModal from "../components/modal/AddFaqModal.jsx";
import EditFaqModal from "../components/modal/EditFaqModal.jsx";

const Faqs = () => {
    const {register, control, handleSubmit, watch, formState: {errors}} = useForm({mode: 'onChange'})
    const dispatch = useDispatch()
    const searchText = watch('searchText')
    const [isOpen, setIsOpen] = useState({type: null, open: false})
    const {isLoading, data, refetch} = useGetAllFaqsQuery()
    const [deleteFaq, {isLoading: isDeleteLoading}] = useDeleteFaqMutation()
    const {selectedData} = useSelector(state => state.faqs)
    const [open, setOpen] = useState(false)

    const handleDeleteUser = async () => {
        const faqId = selectedData?._id
        const {data, error} = await deleteFaq(faqId)

        if (data) {
            setIsOpen({type: null, open: false})
            successMsg(data.message)
            refetch()
        } else {
            errorMsg(error.data.message)
        }
    }

    const handleAddModal = (e) => {
        e.preventDefault();
        if(open) setOpen(false)
        else setOpen(true)
    }

    return (
        <>
            <div className='pages user-page'>
                <Row>
                    <Col xs={12} className='mb-4'>
                        <h2 className='text-black fw-800'>FAQs</h2>
                    </Col>

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
                                    <Button className='w-100 h-100 btn-solid btn-purple' onClick={handleAddModal}>Add Faq</Button>
                                </Col>
                            </Row>

                            <Row className='mt-3'>
                                <ThemeDataTable
                                    columns={faqColumns(setIsOpen, dispatch)}
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

            <AddFaqModal isOpen={open} setIsOpen={setOpen} refetch={refetch} />
            <ViewModal children={<FaqDetails/>} title="FAQ Details" size="md" isOpen={isOpen} setIsOpen={setIsOpen}/>
            <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} handleDelete={handleDeleteUser} isLoading={isDeleteLoading}/>
            <EditFaqModal selectedData={selectedData} isOpen={isOpen} setIsOpen={setIsOpen} refetch={refetch}/>
            {/*<BlockUnblockModal isOpen={isOpen} setIsOpen={setIsOpen}/>*/}
        </>
    )
}

export default Faqs