import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import ThemeInput from '../components/input/ThemeInput'
import { useForm } from 'react-hook-form'
import { LuSearch, LuUserCircle2 } from "react-icons/lu";
import { useDebounce } from 'use-debounce';
import ThemeDataTable from '../components/general/ThemeDataTable';
import { RiParentFill } from 'react-icons/ri';
import { FaChildReaching } from 'react-icons/fa6';
import { MdInsertPageBreak } from 'react-icons/md';
import StatsCard from '../components/dashboard/StatsCard';
import {useDashboardDataQuery, useDeleteUserMutation, useGetAllUsersQuery} from '../store/apis/userApi';
import { setPage, setPaginatedData, setPerPage } from '../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredData } from '../utils/helper';
import UserDetails from '../components/dashboard/UserDetails';
import ViewModal from '../components/modal/ViewModal';
import DeleteModal from '../components/modal/DeleteModal';
import {userColumns, userServiceColumns} from '../utils/columns-constants'
import BlockUnblockModal from '../components/modal/BlockUnblockModal';
import {errorMsg, successMsg} from "../constants/msgs.js";
import {useGetUserServiceQuery} from "../store/apis/userserviceApi.js";
import UserServiceDetails from "../components/dashboard/UserServiceDetails.jsx";

const UserPage = () => {
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm({ mode: 'onChange' })
    const dispatch = useDispatch()
    const searchText = watch('searchText')
    const [stats, setStats] = useState([])
    const [isOpen, setIsOpen] = useState({ type: null, open: false })
    const { isLoading, data } = useGetUserServiceQuery()
    const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation()
    const { isLoading: isDashboardLoading, data: dashboard } = useDashboardDataQuery()
    const { selectedData } = useSelector(state => state.service)

    const handleDeleteUser = async () => {
        const userId = selectedData?._id
        const { data, error } = await deleteUser(userId)

        if (data) {
            setIsOpen({ type: null, open: false })
            successMsg(data.message)
        }
        else {
            errorMsg(error.data.message)
        }
    }

    useEffect(() => {
        setStats([
            {
                title: "Total User",
                count: dashboard?.data?.total_users || 0,
                color: "bg-purple",
                icon: <LuUserCircle2 className='icon' />,
            },
            {
                title: "Blocked User",
                count: dashboard?.data?.block_user || 0,
                color: "bg-yellow",
                icon: <RiParentFill className='icon' />,
            },
            {
                title: "Deleted User",
                count: dashboard?.data?.deleted_user || 0,
                color: "bg-blue",
                icon: <FaChildReaching className='icon' />,
            },
            {
                title: "Inactive User",
                count: dashboard?.data?.inactive_user || 0,
                color: "bg-red",
                icon: <MdInsertPageBreak className='icon' />,
            },
        ])
    }, [isDashboardLoading])

    return (
        <>
            <div className='pages user-page'>
                <Row>
                    <Col xs={12} className='mb-4'>
                        <h2 className='text-black fw-800'>User Services</h2>
                    </Col>

                    {
                        stats?.map((item, index) => (
                            <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3} className='mb-3'>
                                <StatsCard data={item} />
                            </Col>
                        ))
                    }

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
                                        <LuSearch className='icon text-black' />
                                    </div>

                                </Col>

                                {/*<Col sm={4} lg={3} xl={2} className='text-end mt-3 mt-sm-0'>*/}
                                {/*    <Button className='w-100 h-100 btn-solid btn-purple'>Add User</Button>*/}
                                {/*</Col>*/}
                            </Row>

                            <Row className='mt-3'>
                                <ThemeDataTable
                                    columns={userServiceColumns(setIsOpen, dispatch)}
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

            <ViewModal children={<UserServiceDetails  />} title="User Details" size="md" isOpen={isOpen} setIsOpen={setIsOpen} />
            <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} handleDelete={handleDeleteUser} isLoading={isDeleteLoading} />
            <BlockUnblockModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}

export default UserPage