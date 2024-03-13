import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { startGetUserInfo } from '../../action/userAction'

export default function Dashboard() {
  const dispatch=useDispatch()
  const token=localStorage.getItem("token")
  useEffect(()=>{
    dispatch(startGetUserInfo(token))
  },[])
  const user=useSelector(state=>state.user.data)
  
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text">View user info.</p>
              <Link to="/users" className="btn btn-primary">Go to Users</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Manage Job Listings</h5>
              <p className="card-text">Add, edit, or remove job listings.</p>
              <Link to="/admin/jobs" className="btn btn-primary">Go to Jobs</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">View Statistics</h5>
              <p className="card-text">View analytics and statistics for the job portal.</p>
              <Link to="/statistics" className="btn btn-primary">View Statistics</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
