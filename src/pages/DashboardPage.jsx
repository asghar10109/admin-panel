import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import StatsCard from '../components/dashboard/StatsCard'
import { LuUserCircle2 } from "react-icons/lu";
import { RiParentFill } from "react-icons/ri";
import { FaChildReaching } from "react-icons/fa6";
import { MdInsertPageBreak } from "react-icons/md";
import ThemeChart from '../components/general/ThemeChart';
import faker from 'faker'
import { useDashboardDataQuery } from '../store/apis/userApi';

const DashboardPage = () => {

    //api calls
    const { isLoading, data } = useDashboardDataQuery()

    const [showData, setData] = useState([])
    useEffect(() => {
        setData([
            {
                title: "Total User",
                count: data?.data?.total_users || 0,
                color: "bg-purple",
                icon: <LuUserCircle2 className='icon' />,
            },
            {
                title: "Total Driver",
                count: data?.data?.total_drivers || 0,
                color: "bg-yellow",
                icon: <RiParentFill className='icon' />,
            },
            {
                title: "Total Users",
                count: data?.data?.total_user || 0,
                color: "bg-blue",
                icon: <FaChildReaching className='icon' />,
            },
            {
                title: "Total Page",
                count: "2",
                color: "bg-red",
                icon: <MdInsertPageBreak className='icon' />,
            },
        ])
    }, [isLoading])
    const [labels, setLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July'])
    const [chartData, setChartData] = useState({
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    })

    return (
        <div className='pages dashboard-page'>
            <Row>
                <Col xs={12} className='mb-4'>
                    <h2 className='text-black fw-800'>Dashboard</h2>
                </Col>
                {
                    showData?.map((item, index) => (
                        <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3} className='mb-3'>
                            <StatsCard data={item} />
                        </Col>
                    ))
                }
            </Row>

            <Row className='mt-4'>
                <Col xs={6}>
                    <ThemeChart type="line" data={chartData} />
                </Col>

                <Col xs={6}>
                    <ThemeChart type="line" data={chartData} />
                </Col>
            </Row>
        </div>
    )
}

export default DashboardPage