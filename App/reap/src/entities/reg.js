import { started, succeeded, failed } from '../asyncOperations';

const initialState = {};

const Register = {
    key: 'register',
    actionNames: {
        register: 'SUBSCRIPTION',
    },
}

export const reducer = (state = initialState, action) => {
     const { register } = Register.actionNames;

    switch(action.type){
    case succeeded(register):
        return {...state, registrationStatus: action.payload};
    case failed(register):
        return {...state, registrationStatus: action.payload};
    default:
        return state;
    }
}