import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetUserInfo } from '../action/userAction'
import './css/Home.css'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startGetUserInfo())
  }, [])
  const { user } = useSelector(state => state.user.data)
  return (
    <div className="container">
      <h3>Welcome to the Job Portal</h3>
      
      {user?.role == 'jobseeker' && <div className="section">
        <h4>For Job Seekers</h4>
        <p>
          Explore thousands of job listings from leading companies across various industries.
          Use advanced search filters to narrow down your options based on location, industry,
          job type, experience level, and more.
        </p>
        <p>
          Save your favorite job listings for later, and easily apply to positions that match your skills
          and interests. Keep track of your applications and receive updates on the status of your
          submissions.
        </p>
      </div>}
      {user?.role == 'employer' && <div className="section">
        <h4>For Employers</h4>
        <p>
          Post your job openings to attract qualified candidates. Customize your job listings with
          detailed descriptions, requirements, and benefits to attract top talent.
        </p>
        <p>
          Manage applications efficiently with our intuitive dashboard. Review applicant resumes,
          schedule interviews, and communicate directly with candidates all in one place.
        </p>
      </div>}
     {user?.role=='admin' &&  <div className="section">
        <h4>For Administrators</h4>
        <p>
          As an administrator, you play a crucial role in managing the job portal system.
          Monitor site activity, manage user accounts, and ensure the smooth operation of the platform.
        </p>
        <p>
          Customize settings and configurations to meet the needs of job seekers and employers.
          Implement new features and enhancements to improve the user experience and drive engagement.
        </p>
      </div>}
      <div className="section">
        <h4>Why Choose Us?</h4>
        <p>
          Our job portal offers a user-friendly interface, robust search functionality, and seamless
          application process. Whether you're a job seeker, employer, or administrator, we're committed
          to providing the tools and resources you need to succeed.
        </p>
        <p>
          Join thousands of satisfied users who have found success through our platform. Get started today
          and take the next step towards achieving your career goals or finding the perfect candidate for
          your team.
        </p>
      </div>
    </div>
  )
}
