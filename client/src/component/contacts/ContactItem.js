import React, { useContext } from 'react';
import contactContext from '../../context/contact/ContactContext';


const ContactItem = (props) =>{
    const {contact} = props;


    const ContactContext = useContext(contactContext);
    const { deleteContact, setCurrent } = ContactContext;
    const { _id, name, email, phone, type } = contact;

    const onDelete = () =>{
        deleteContact(_id);
    }

    return(
        <div className='itmcrd bg-light'>
        <h3 className='text-dark text-left'>
        {name}
        <span style={{float: 'right'}}
        className={'badge ' + (type === 'professional' ?
                  'bg-dark' : 'bg-secondary')}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}

        </span>

        </h3>
         <ul className="listitm">
                {email && (<li className='mb-1'>
                    <i className="fas fa-envelope-open"></i>{" " + email}
                </li>)}
                {phone && (<li className='mb-3'>
                    <i className="fas fa-phone"></i>{" " + phone}
                </li>)}
                <p>
                    <button className="editbtn" onClick={() => setCurrent(contact)}>Edit</button>
                    <button className="delbtn ms-2" onClick={onDelete}>Delete</button>

                </p>

            </ul>

        </div>
    )
}

export default ContactItem