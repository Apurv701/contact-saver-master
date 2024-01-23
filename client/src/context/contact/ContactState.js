import React, { useReducer } from 'react'
import contactContext from './ContactContext'
import contactReducer from './contactReducer'
import axios from 'axios'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    FILTER_CONTACT,
    SET_ALERT,
    REMOVE_ALERT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_FILTER,
    GET_CONTACTS,
    CLEAR_CONTACT,
    CLEAR_ERRORS

} from './../Types'

const ContactState = props => {
       const initialState = { contacts: null,
                              current: null,
                              filtered: null,
                              error: null }
    
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const getContacts = async () => {
        try {
            const res = await axios.get('api/contacts');

            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (error) {

            dispatch({ type: CONTACT_ERROR, payload: error.data });

        }

    }

    const addContact = async contact => {
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        try{
            const res = await axios.post('api/contacts', contact, config);
            
            dispatch({ type: ADD_CONTACT, payload: res.data})
        
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.data });
        }
    }

    const deleteContact = async (id) => {
        try {
            const res = await axios.delete(`/api/contacts/${id}`);

            dispatch({ type: DELETE_CONTACT, payload: id });

        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg });

        }
    }

    const updateContact = async contacts =>{
        const config = {
            header: {
                'content-type': 'application/json'
            }
        };
        try{
            const res = await axios.put(`/api/contacts/${contacts._id}`, contacts, config);

            dispatch({type: UPDATE_CONTACT, payload: res.data});
        
        }catch(error){
            
            dispatch({type: CONTACT_ERROR, payload: error.response});
        
        }
        
    }

    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACT });
    }

    const filterContact = text => {
        dispatch({ type: FILTER_CONTACT, payload: text })
    }

    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    const clearError = () => {
        dispatch({ type: CLEAR_ERRORS });
    }

    return (
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                clearFilter,
                filterContact,
                getContacts,
                clearContacts,
                clearError
            }}>
            {props.children}
        </contactContext.Provider>
    )


}

export default ContactState;