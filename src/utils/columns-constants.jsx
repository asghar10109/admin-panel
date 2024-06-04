import {FaRegEye} from "react-icons/fa";
import {RiDeleteBin7Line, RiEdit2Line} from "react-icons/ri";
import {baseUrl, modalType} from "./app-constants";
import ProfilePlaceholder from '../assets/img/profile-placeholder.jpg'
import {TbUserCog} from "react-icons/tb";
import {setSelectedData} from "../store/slices/userSlice";
import {setSelectedFaqData} from "../store/slices/faqSlice.js"
import {setSelectedReportData} from "../store/slices/reportSlice.js"

export const userColumns = (setIsOpen, dispatch) => {
    return (
        [
            {
                key: 'name',
                name: 'Name',
                sortable: true,
                selector: row => row?.fullName || "-",
            },
            {
                key: 'image_name',
                name: 'Image',
                sortable: true,
                selector: row => <div style={{width: '40px', height: "40px", borderRadius: "50%",}}
                                      className='profile-wrapper'>
                    <img style={{objectFit: "cover", objectPosition: "center"}} src={`${baseUrl}/${row?.profileImage}`}
                         alt="" onError={(e) => e.target.src = ProfilePlaceholder}/>
                </div>,
            },
            {
                key: 'email',
                name: 'Email',
                sortable: true,
                selector: row => row?.email || "-",
            },
            {
                key: 'phone',
                name: 'Phone',
                sortable: true,
                selector: row => row?.phone || "-",
            },
            {
                key: 'role',
                name: 'Role',
                sortable: true,
                selector: row => row?.role == "driver" ? "Driver" : "User",
            },
            {
                key: 'block',
                name: 'Blocked',
                sortable: true,
                selector: row => row.block == 0 ? "No" : "Yes"
            },
            {
                key: 'action',
                name: 'Action',
                selector: row => (
                    <div className='theme-action'>
                        <FaRegEye
                            className='icon'
                            onClick={() => {
                                setIsOpen({type: modalType.view, open: true})
                                dispatch(setSelectedData(row))
                            }}
                        />
                        <TbUserCog
                            className='icon'
                            onClick={() => {
                                setIsOpen({type: modalType.block, open: true})
                                dispatch(setSelectedData(row))
                            }}
                        />
                        <RiDeleteBin7Line
                            className='icon'
                            onClick={() => {
                                setIsOpen({type: modalType.delete, open: true})
                                dispatch(setSelectedData(row))
                            }}
                        />
                    </div>
                ),
            },
        ]
    )
}


export const faqColumns = (setIsOpen, dispatch) => {
    return (
        [
            {
                key: 'question',
                name: 'Question',
                sortable: true,
                selector: row => row?.question || "-",
            },
            {
                key: 'answer',
                name: 'Answer',
                sortable: true,
                selector: row => row?.answer || "-",
            },
            {
                key: 'Created At',
                name: 'Created At',
                sortable: true,
                selector: row => row?.createdAt.toString() || '-' ,
            },
            {
                key: 'action',
                name: 'Action',
                selector: row => (
                    <div className='theme-action'>
                        <FaRegEye
                            className='icon'
                            onClick={() => {
                                setIsOpen({type: modalType.view, open: true})
                                dispatch(setSelectedFaqData(row))
                            }}
                        />
                        <TbUserCog
                            className='icon'
                            onClick={() => {
                                setIsOpen({type: modalType.edit, open: true})
                                dispatch(setSelectedFaqData(row))
                            }}
                        />
                        <RiDeleteBin7Line
                            className='icon'
                            onClick={() => {
                                setIsOpen({type: modalType.delete, open: true})
                                dispatch(setSelectedFaqData(row))
                            }}
                        />
                    </div>
                ),
            },
        ]
    )
}

export const reportColumns = (setIsOpen, dispatch) => {
    return (
        [
            {
                key: 'types',
                name: 'Types',
                sortable: true,
                selector: row => row?.text || "-",
            },
            {
                key: 'Created At',
                name: 'Created At',
                sortable: true,
                selector: row => row?.createdAt.toString() || '-' ,
            },
            {
                key: 'action',
                name: 'Action',
                selector: row => (
                    <div className='theme-action'>
                        <FaRegEye
                            className='icon'
                            onClick={() => {
                                setIsOpen({type: modalType.view, open: true})
                                dispatch(setSelectedReportData(row))
                            }}
                        />
                        <TbUserCog
                            className='icon'
                            onClick={() => {
                                setIsOpen({type: modalType.edit, open: true})
                                dispatch(setSelectedReportData(row))
                            }}
                        />
                        <RiDeleteBin7Line
                            className='icon'
                            onClick={() => {
                                setIsOpen({type: modalType.delete, open: true})
                                dispatch(setSelectedReportData(row))
                            }}
                        />
                    </div>
                ),
            },
        ]
    )
}