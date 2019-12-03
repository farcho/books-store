import axios from '../../axios-api';

import { createActionObject } from '../utility'

export const GET_BOOK_LIST = createActionObject('GET_BOOK_LIST')
export const CREATE_NEW_BOOK = createActionObject('CREATE_NEW_BOOK')

export function getBookList() {
    return dispatch => {
        dispatch(getBookListStart());
        axios.get('/books')
            .then(response => {
                dispatch(getBookListSuccess(response.data.data));
            })
            .catch(error => {
                dispatch(getBookListFail(error));
            });
    };
}

export const getBookListSuccess = (bookList) => {
    return {
        type: GET_BOOK_LIST.SUCCESS,
        bookList
    };
};

export const getBookListFail = (error) => {
    return {
        type: GET_BOOK_LIST.FAIL,
        error: error
    };
}

export const getBookListStart = () => {
    return {
        type: GET_BOOK_LIST.START
    };
};

export const getBookListInit = () => {
    return {
        type: GET_BOOK_LIST.INIT
    };
};

export function createNewBook(bookData, file) {
    return dispatch => {
        dispatch(createNewBookStart());
        axios.post('/books', bookData)
            .then(response => {
                const formData = new FormData();
                formData.append('file', file, `file-${response.data.data.id}`)
                dispatch(uploadFile(formData));
            })
            .catch(error => {
                dispatch(getBookListFail(error));
            });
    };
};

export function uploadFile(formData) {
    return dispatch => {
        dispatch(createNewBookStart());
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('/file-upload', formData, config)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    };
}

export const createNewBookSuccess = () => {
    return {
        type: CREATE_NEW_BOOK.SUCCESS,
    };
};

export const createNewBookFail = (error) => {
    return {
        type: CREATE_NEW_BOOK.FAIL,
        error: error
    };
}

export const createNewBookStart = () => {
    return {
        type: CREATE_NEW_BOOK.START
    };
};

export const createNewBookInit = () => {
    return {
        type: CREATE_NEW_BOOK.INIT
    };
};