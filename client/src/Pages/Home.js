import React, { useContext, useEffect } from "react";
import ContactForm from "../component/contacts/ContactForm";
import ContactFilter from "../component/contacts/ContactFilter";
import AuthContext from "../context/auth/authContext";
import Contacts from "../component/contacts/Contact";

const Home = () =>{
    const authContext = useContext(AuthContext);
    useEffect(()=>{
        authContext.loadUser();
    },[])

    return (
        <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
                <ContactForm />
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
                <ContactFilter />
                <Contacts/>
            </div>
        </div>

    )
}
export default Home;