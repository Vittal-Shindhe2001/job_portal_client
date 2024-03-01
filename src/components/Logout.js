import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Logout(props) {
    return (
        <div>
            <li className='nav-item'>
                <Link className={`nav-link ${props.location.pathname === '/logout' ? 'active' : ''}`} to="/logout"
                    onClick={props.handleLogout}
                ><span className={props.location.pathname === '/logout' ? 'fw-bold' : ''}>Logout</span></Link>
            </li>
        </div>
    )
}
