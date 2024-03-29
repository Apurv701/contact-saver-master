import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    FILTER_CONTACT,
    CONTACT_ERROR,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT,
    UPDATE_CONTACT,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_CONTACT,
    CLEAR_ERRORS

} from './../Types'

export default (state,action) => {
 console.log("calling reducer...");
switch(action.type){
    case GET_CONTACTS : 
    return {
        ...state,
        contacts: action.payload,
        loading: false 
    }
    case ADD_CONTACT:
        return {
            ...state,
            contacts: [action.payload, ...state.contacts],
            loading: false
        }
     case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => (contact._id !== action.payload)),
                loading: false
            }
     case UPDATE_CONTACT:
             return {
                 ...state,
                 contacts: state.contacts.map((contact) => (contact._id === action.payload._id ? action.payload : contact)),
                 loading: false
                }
     case CONTACT_ERROR:
             return {
                 ...state,
                 error: action.payload,
                }                
     case SET_CURRENT:
             return {
                 ...state,
                 current: action.payload,
                 loading: false
                }     
     case CLEAR_CURRENT:
             return {
                  ...state,
                 current: null,
                 loading: false
                    }  
     case CLEAR_CONTACT:
             return {
                  ...state,
                 contacts: null,
                 filtered: null,
                 error: null,
                 current: null
                        }  
     case FILTER_CONTACT:
             return {
                  ...state,
                  filtered: state.contacts.filter(contact => {
                  const regx = new RegExp(`${action.payload}`, 'gi');
                  return contact.name.match(regx) || contact.email.match(regx) || contact.phone.match(regx);
                        }),
                    }   
     case CLEAR_FILTER:
             return {
                 ...state,
                 filtered: null,
                    }     
     case CLEAR_ERRORS: 
             return {
                 ...state,
                 error: null
                    } 
     default:
             return state;  
                                                                   
}
     
}

