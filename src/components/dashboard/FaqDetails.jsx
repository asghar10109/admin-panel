import React from 'react'
import { useSelector } from 'react-redux'


const UserDetails = () => {
    const { selectedData } = useSelector(state => state.faqs)

    return (
        <div className='details user-detail'>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Question: </b></p>
                <p className='ms-2'>{selectedData?.question || '-'}</p>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Answer: </b></p>
                <p className='ms-2'>{selectedData?.answer || '-'}</p>
            </div>
        </div>
    )
}

export default UserDetails