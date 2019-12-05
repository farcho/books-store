import axios from '../../axios-api';
import * as constants from '../../constants/pagination'
//import { push } from 'react-router-redux'
import { createActionObject } from '../utility'

// import { createBrowserHistory } from 'history';
// const browserHistory = createBrowserHistory();

export const GET_BOOK_LIST = createActionObject('GET_BOOK_LIST');
export const CREATE_NEW_BOOK = createActionObject('CREATE_NEW_BOOK');
export const CHANGE_BOOK_STATUS = createActionObject('CHANGE_BOOK_STATUS');

export function getBookList(activePage) {
    return dispatch => {
        dispatch(getBookListStart());
        axios.get(`/books?limit=${constants.PAGINATION_RECORDS_LIMIT}&page=${activePage}`)
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
                const book_id = response.data.data.id;
                const formData = new FormData();
                formData.append('file', file, `file-${book_id}`)
                dispatch(createNewBookSuccess(response.data.data));
                dispatch(uploadFile(formData, book_id));
            })
            .catch(error => {
                dispatch(getBookListFail(error));
            });
    };
};

export function uploadFile(formData, bookId) {
    return dispatch => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('/books/file-upload', formData, config)
            .then(response => {
                dispatch(setBookKeyWords({ filename: response.data.filename, book_id: bookId }));
            })
            .catch(error => {
                console.log(error)
            });
    };
}

export function setBookKeyWords(data) {
    return dispatch => {
        axios.put('/books/set-book-keywords', data)
            .then(response => {
                window.location.href = '/books';
            })
            .catch(error => {
                console.log(error)
            });
    };
}

export const createNewBookSuccess = (book) => {
    return {
        type: CREATE_NEW_BOOK.SUCCESS,
        book
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

export function changeBookStatus(data, activePage) {
    return dispatch => {
        dispatch(createNewBookStart());
        axios.patch('/books/change-status', data)
            .then(response => {
                dispatch(changeBookStatusSuccess(response.data.data));
                dispatch(getBookList(activePage));
            })
            .catch(error => {
                dispatch(getBookListFail(error));
            });
    };
};

export const changeBookStatusSuccess = (book) => {
    return {
        type: CHANGE_BOOK_STATUS.SUCCESS,
        book
    };
};

export const changeBookStatusFail = (error) => {
    return {
        type: CHANGE_BOOK_STATUS.FAIL,
        error: error
    };
}

export const changeBookStatusStart = () => {
    return {
        type: CHANGE_BOOK_STATUS.START
    };
};

export const changeBookStatusInit = () => {
    return {
        type: CHANGE_BOOK_STATUS.INIT
    };
};
