import React from 'react'
import {useSelector} from 'react-redux'
import {baseUrl} from '../../utils/app-constants'
import ProfilePlaceholder from '../../assets/img/profile-placeholder.jpg'

const UserDetails = () => {
    const {selectedData} = useSelector(state => state.reports)

    return (
        <div className='details user-detail'>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Type: </b></p>
                <p className='ms-2'>{selectedData?.text || '-'}</p>
            </div>
        </div>
    )
}

export default UserDetails