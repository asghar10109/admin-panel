import React from 'react'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../utils/app-constants'
import ProfilePlaceholder from '../../assets/img/profile-placeholder.jpg'

const UserServiceDetails = () => {
    const { selectedData } = useSelector(state => state.service)

    return (
        <div className='details user-detail'>
            <div className='mb-3'>
                <div className="img-wrapper">
                    <img src={`${baseUrl}/${selectedData?.user?.profileImage}`} alt="" onError={(e) => e.target.src = ProfilePlaceholder} />
                </div>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Name: </b></p>
                <p className='ms-2'>{`${selectedData?.user?.firstName} ${selectedData?.user?.lastName}` || '-'}</p>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Email: </b></p>
                <p className='ms-2'>{selectedData?.user?.email || '-'}</p>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Role: </b></p>
                <p className='ms-2'>{selectedData?.user?.role == "technician" ? "Technician" : "User"}</p>
            </div>
            <div className='d-flex align-items-center mb-3'>
                <p><b>Hourly Charges: </b></p>
                <p className='ms-2'>{selectedData?.hourlyCharges || 0}</p>
            </div>
            <div className=' align-items-center mb-3'>
                <p><b>Tire Sale Images: </b></p>
                {
                    selectedData?.tireSales?.images && selectedData?.tireSales?.images.length > 0 ? selectedData?.tireSales?.images.map(dt => {
                        return (<><img className="m-1" src={`${baseUrl}/${dt}`} alt=""
                                    onError={(e) => e.target.src = ProfilePlaceholder} width={50}/></>)
                    }) : 'No Images uploaded'
                }
            </div>
            <div className=' align-items-center mb-3'>
                <p><b>Tire Sale Images: </b></p>
                {
                    selectedData?.tireRepair?.images && selectedData?.tireRepair?.images.length > 0 ? selectedData?.tireRepair?.images.map(dt => {
                        return (<><img className="m-1" src={`${baseUrl}/${dt}`} alt=""
                                       onError={(e) => e.target.src = ProfilePlaceholder} width={50}/></>)
                    }) : 'No Images uploaded'
                }
            </div>
            <div className=' align-items-center mb-3'>
                <p><b>Tire Sale Images: </b></p>
                {
                    selectedData?.tireInstallation?.images && selectedData?.tireInstallation?.images.length > 0 ? selectedData?.tireInstallation?.images.map(dt => {
                        return (<><img className="m-1" src={`${baseUrl}/${dt}`} alt=""
                                       onError={(e) => e.target.src = ProfilePlaceholder} width={50}/></>)
                    }) : 'No Images uploaded.'
                }
            </div>
        </div>
    )
}

export default UserServiceDetails