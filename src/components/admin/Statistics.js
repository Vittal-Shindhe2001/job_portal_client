import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetAllUserInfo } from '../../action/userAction'
import { startGetJobs } from '../../action/jodPostAction'
import { startGetAllJobApplications } from '../../action/jobApplicationsAction'
import { Chart } from 'react-google-charts'
import { startGetAllCompanyDtls } from '../../action/companyAction'

const StatisticsAdmin = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAllUserInfo())
        dispatch(startGetJobs())
        dispatch(startGetAllJobApplications())
        dispatch(startGetAllCompanyDtls())
    }, [])

    const users = useSelector((state) => state.user.data)
    const jobs = useSelector((state) => state.job.data)
    const applications = useSelector((state) => state.applications.data)
    const companies=useSelector(state=>state.company.data)
    const counts = useMemo(
        () => ({
            users: users.length,
            jobs: jobs.length,
            applications: applications.length,
            companies:companies.length
        }),
        [users, jobs, applications,companies]
    )
    const data = [
        ['Category', 'Count'],
        ['Users', counts.users],
        ['Jobs', counts.jobs],
        ['Applications', counts.applications],
        ['companies', counts.companies],
    ]
    return (
        <div>
            <h1>Dashboard</h1>
            <Chart
                width={'700px'}
                height={'300px'}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    title: 'Statistics',
                    chartArea: { width: '50%' },
                    hAxis: {
                        title: 'Category',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'Count',
                    },
                }}
                legendToggle
            />
        </div>
    )
}

export default StatisticsAdmin
