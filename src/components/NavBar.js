import React, { Suspense, useEffect, useState } from 'react'
import { Link, Route, Switch, useHistory, useLocation, withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Spinner from './Loding-Spinner'
import { jwtDecode } from 'jwt-decode'
import PrivateRoute from './helper_function/Private_route'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Lazy load components
// const Home = React.lazy(() => import('./Home')) 
// const Register = React.lazy(() => import('./Register')) 
// const Login = React.lazy(() => import('./Login')) 
import Home from './Home'
import Register from './Register'
import Login from './Login'


const Logout = React.lazy(() => import('./Logout'))
// Admin 
const Dashboard = React.lazy(() => import('./admin/Dashboard'))
const Job_Listing = React.lazy(() => import('./admin/Job_Listing'))
const Statistics = React.lazy(() => import("./admin/Statistics"))
const Users = React.lazy(() => import('./admin/Users'))
// employees
const Applications = React.lazy(() => import('./employees/Applications'))
const Job_ListingEmployees = React.lazy(() => import('./employees/Job_Listing'))
const EmployeesProfile = React.lazy(() => import('./employees/Profile'))
const JobPost = React.lazy(() => import('./employees/JobPost'))
const ApplicationView = React.lazy(() => import('./employees/ApplicationView'))
// job seekers
const FindJob = React.lazy(() => import('./jobseekers/FindJobs'))
const jobseekersProfile = React.lazy(() => import('./jobseekers/Profile'))
const Job_details = React.lazy(() => import('./jobseekers/Job_details'))
const AppliedJods = React.lazy(() => import('./jobseekers/AppliedJods'))
const NavBar = () => {
    const history = useHistory()
    let token = localStorage.getItem('token')

    let tokendata
    if (token) {
        tokendata = jwtDecode(token)
    }

    const location = useLocation()

    useEffect(() => {
        //console.log(location) 
    }, [location])
    useEffect(() => {
        if (!token) {
            history.push("/login")
        }
    }, [token, history])
    const handleLogout = () => {
        history.push("/login")
        localStorage.clear()
        toast.success("Logout successfully")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-light">
                {token && tokendata.role === "admin" &&
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">JobPortal</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                <li className='nav-item'>
                                    <Link className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard"><span className={location.pathname === '/dashboard' ? 'fw-bold' : ''}>Dashboard</span></Link>
                                </li>
                                <li className='nav-item' >
                                    <Link className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`} to="/users"><span className={location.pathname === '/users' ? 'fw-bold' : ''}>Users</span></Link>
                                </li>
                                <li className='nav-item' >
                                    <Link className={`nav-link ${location.pathname === '//admin/jobs' ? 'active' : ''}`} to="/admin/jobs"><span className={location.pathname === '/admin/jobs' ? 'fw-bold' : ''}>Job Listings</span></Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className={`nav-link ${location.pathname === '/statistics' ? 'active' : ''}`} to="/statistics"><span className={location.pathname === '/statistics' ? 'fw-bold' : ''}>Statistics</span></Link>
                                </li>
                                <Logout handleLogout={handleLogout} location={location} />
                            </ul>
                        </div>
                    </div>
                }
                {
                    token && tokendata.role === "employer" &&
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">JobPortal</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className='nav-item'>
                                    <Link className={`nav-link ${location.pathname === '/employe/jobs' ? 'active' : ''}`} to="/employe/jobs"><span className={location.pathname === '/employe/jobs' ? 'fw-bold' : ''}>Job Listings</span></Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className={`nav-link ${location.pathname === '/applications' ? 'active' : ''}`} to="/applications"><span className={location.pathname === '/applications' ? 'fw-bold' : ''}>Applications</span></Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className={`nav-link ${location.pathname === '/employe/profile' ? 'active' : ''}`} to="/employe/profile"><span className={location.pathname === '/employe/profile' ? 'fw-bold' : ''}>Profile</span></Link>
                                </li>
                                <Logout handleLogout={handleLogout} location={location} />
                            </ul>
                        </div>
                    </div>

                }
                {
                    token && tokendata.role === "jobseeker" &&
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">JobSeeker</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className='nav-item' >
                                    <Link className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`} to="/jobs"><span className={location.pathname === '/jobs' ? 'fw-bold' : ''}>Find Jobs</span></Link>
                                </li>
                                <li className='nav-item' >
                                    <Link className={`nav-link ${location.pathname === '/applied/jobs' ? 'active' : ''}`} to="/applied/jobs"><span className={location.pathname === '/applied/jobs' ? 'fw-bold' : ''}>Jobs</span></Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile"><span className={location.pathname === '/profile' ? 'fw-bold' : ''}>Profile</span></Link>
                                </li>
                                <Logout handleLogout={handleLogout} location={location} />
                            </ul>
                        </div>
                    </div>

                }
                {
                    !token &&
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Job Portal</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className='nav-item'>
                                    <Link className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} to="/register"><span className={location.pathname === '/register' ? 'fw-bold' : ''}>Register</span></Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login"><span className={location.pathname === '/login' ? 'fw-bold' : ''}>Login</span></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            </nav >
            {!token && <>
                <Suspense fallback={<Spinner />}>

                    <Route path='/' component={Home} exact={true} />
                    <Route path="/register" component={Register} exact={true} />
                    <Route path="/login"
                        render={(props) => (
                            <Login {...props} />
                        )} />

                </Suspense>
            </>}
            {
                token && tokendata.role === 'admin' && <div>
                    <Suspense fallback={<Spinner />}>
                        <PrivateRoute path='/' component={Home} exact={true} />
                        <PrivateRoute path='/dashboard' component={Dashboard} exact={true} />
                        <PrivateRoute path='/users' component={Users} exact={true} />
                        <PrivateRoute path='/admin/jobs' component={Job_Listing} exact={true} />
                        <PrivateRoute path='/statistics' component={Statistics} exact={true} />

                    </Suspense>
                </div>
            }
            {
                token && tokendata.role === 'employer' && <div>
                    <Suspense fallback={<Spinner />}>
                        <PrivateRoute path='/' component={Home} exact={true} />
                        <PrivateRoute path='/employe/jobs' component={Job_ListingEmployees} exact={true} />
                        <PrivateRoute path='/applications' component={Applications} exact={true} />
                        <PrivateRoute path='/employe/profile' component={EmployeesProfile} exact={true} />
                        <PrivateRoute path="/job/:id" component={JobPost} />
                        <PrivateRoute path='/employer/application/view/:id' component={ApplicationView} />
                    </Suspense>
                </div>
            }
            {
                token && tokendata.role === 'jobseeker' && <div>
                    <Suspense fallback={<Spinner />}>
                        <PrivateRoute path='/' component={Home} exact={true} />
                        <PrivateRoute path='/jobs' component={FindJob} exact={true} />
                        <PrivateRoute path='/profile' component={jobseekersProfile} exact={true} />
                        <PrivateRoute path="/jobseeker/job/:id" component={Job_details} />
                        <PrivateRoute path='/applied/jobs' component={AppliedJods} />
                    </Suspense>
                </div>
            }

            <ToastContainer />
        </>
    )
}

export default withRouter(NavBar) 
