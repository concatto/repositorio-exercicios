import axios from 'axios';

const path = "http://localhost:4000";

export const performRequest = (dispatch, name, url) => {
    dispatch({type: name + "_STARTED"});

    axios.get(path + url).then(response => {
        console.log(response);
        dispatch({type: name + "_SUCCEEDED", payload: response.data});
    }).catch(err => {
        console.log(err);
        dispatch({type: name + "_FAILED", payload: err});
    });
};
