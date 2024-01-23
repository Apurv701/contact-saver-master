import React ,{ useState ,useEffect ,useContext } from 'react';
import contactContext from './../../context/contact/ContactContext';
import alertContext from './../../context/alert/alertContext';

const ContactForm = () => {
    const ContactContext = useContext(contactContext);
    const AlertContext = useContext(alertContext);
    const { addContact, updateContact, current, clearCurrent, error, clearError } = ContactContext;
    const { setAlert } = AlertContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
        if (error === "Phone number all ready saved") {
            setAlert("Phone number already saved", "secondary");
            clearError();
        }
    }, [ContactContext, current, error])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });




    const onChange = (event) => {

        setContact({ ...contact, [event.target.name]: event.target.value })
    }



    const onSubmit = (event) => {

        event.preventDefault();
        if (current === null) {
            addContact(contact);
            //getContacts();
        } else {
            updateContact(contact);
            clearCurrent();
        }

        setContact({
            name: "",
            email: "",
            phone: "",
            type: "personal"
        })

    }
    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='frmhdng mb-4'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder='Name' name='name' value={contact.name} onChange={onChange} className="form-control" required />
            <br/>
            <input type="email" placeholder='Email' name='email' value={contact.email} onChange={onChange} className="form-control" required />
            <br/>
            <input type="text" placeholder='Phone' name='phone' value={contact.phone} onChange={onChange} className="form-control" />
            <h4 className='mt-3'>Contact Type :</h4>
            <h5><input type="radio" name='type' value="personal" id='rdclr' className='me-2' checked={contact.type === 'personal'} onChange={onChange} />
             Personal{' '}</h5>
            <h5><input type="radio" name='type' value="professional" id='rdclr' className='me-2' checked={contact.type === 'professional'} onChange={onChange} />
             Professional{' '}</h5>
            <div>
               <h4><input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="ctfrmbtn mt-3" /></h4>
            </div>
            {current && (
                <div>
                   <h4> <button className="ctfrmbtn mt-3" onClick={clearAll}>Clear</button></h4>
                </div>
            )}
        </form>
    )
}

export default ContactForm;







