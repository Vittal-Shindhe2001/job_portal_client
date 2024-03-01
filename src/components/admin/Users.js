import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGetAllUserInfo } from '../../action/userAction'

const UsersAdmin = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage] = useState(5)
    useEffect(() => {
        dispatch(startGetAllUserInfo())
    }, [currentPage])

    const users = useSelector(state => state.user.data)
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = Array.isArray(users) ? users.slice(indexOfFirstUser, indexOfLastUser) : []

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)
    return (
        <div className="container">
            <h1>Users - Admin</h1>
            {/* <Link to="/admin/add-user" className="btn btn-primary mb-3">Add User</Link> */}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers && currentUsers.length > 0 && currentUsers?.map((user, i) => (
                        <tr key={user._id}>
                            <td>{i + 1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage - 1)} className="page-link">
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(i + 1)} className="page-link">
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(users.length / usersPerPage) ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage + 1)} className="page-link">
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default UsersAdmin
