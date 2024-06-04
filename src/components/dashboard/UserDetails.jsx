import React from 'react'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../utils/app-constants'
import ProfilePlaceholder from '../../assets/img/profile-placeholder.jpg'

const UserDetails = () => {
    const { selectedData } = useSelector(state => state.user)

    return (
        <div className='details user-detail'>
            <div className='mb-3'>
                <div className="img-wrapper">
                    <img src={`${baseUrl}/${selectedData?.profileImage}`} alt="" onError={(e) => e.target.src = ProfilePlaceholder} />
                </div>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Name: </b></p>
                <p className='ms-2'>{selectedData?.fullName || '-'}</p>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Email: </b></p>
                <p className='ms-2'>{selectedData?.email || '-'}</p>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Phone: </b></p>
                <p className='ms-2'>{selectedData?.phone || '-'}</p>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Role: </b></p>
                <p className='ms-2'>{selectedData?.role == "parent" ? "Parent" : "Child"}</p>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Blocked: </b></p>
                <p className='ms-2'>{selectedData?.blocked == 0 ? "No" : 'Yes'}</p>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Verified: </b></p>
                <p className='ms-2'>{selectedData?.isVerified == 0 ? "No" : 'Yes'}</p>
            </div>
        </div>
    )
}

export default UserDetails