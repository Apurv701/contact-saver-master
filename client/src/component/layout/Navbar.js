import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import contactContext from '../../context/contact/ContactContext';

const Navbar = (props) =>{
    const {title, icon} = props;
    const authContext = useContext(AuthContext);
    const ContactContext = useContext(contactContext);
    const {isAuthenticated, logout, user} = authContext;
    const {clearContacts} = ContactContext;
    const onLogout = () =>{
        logout();
        clearContacts();
    } 

    const authLinks = (
        <>
            <h4><li className='unm'>Hello <span style={{color:'#808080'}}>{user === null ? '' : user.name}</span></li></h4>
            <li className='logoutbtn'>
                <a onClick={onLogout}>
                <i className="fas fa-sign-out-alt" /><span style={{color:'white'}}> Logout</span></a>
            </li>
        </>
    )

    const guestLinks = (
        <>
            <li className='logbtnct'>
                <Link to="/login">Login</Link>
            </li>
            <li className='regbtnct'>
                <Link to="/register">Register</Link>
            </li>
        </>
    )

    return (
        <div className='navbar navbar-light'>
        <h1>
            <i className={icon}/>{title}
        </h1>
        <ul>
            {isAuthenticated? authLinks : guestLinks}
        </ul>

        </div>
    )
}

Navbar.defaultProps = {
    title : ' Contact Keeper',
    icon : 'fas fa-id-card-alt'
}

export default Navbar