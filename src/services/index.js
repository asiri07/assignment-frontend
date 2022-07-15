import axios from 'axios';
import axiosInstance from '../axios-instance';
import * as Constants from '../constants';

const postSignIn = async (req) => {
    return await axios({
        method: `post`,
        url: `${Constants.API_URL}/api/user/signin`,
        data: req
    });
}

const postSignUp = async (req) => {
    return await axios({
        method: `post`,
        url: `${Constants.API_URL}/api/users`,
        data: req
    });
}

const signOut = async () => {
    return await axiosInstance({
        method: `delete`,
        url: `${Constants.API_URL}/api/user/signout`
    });
}

const uploadFile = async (req) => {
    return await axiosInstance({
        method: `post`,
        data: req,
        url: `${Constants.API_URL}/api/file`
    });
}


export {
    postSignIn,
    postSignUp,
    signOut,
    uploadFile
}