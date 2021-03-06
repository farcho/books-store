import { GET_BOOK_LIST, CREATE_NEW_BOOK, CHANGE_BOOK_STATUS } from '../actions/books'
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    book_list: null,
    book: null,
}

/*Get Book List Reducer*/
const getBookListInit = (state, action) => {
    return updateObject(state, { loading: false });
};

const getBookListStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const getBookListSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        book_list: action.bookList,
    });
};

const getBookListFail = (state, action) => {
    return updateObject(state, { loading: false, registered: false });
};

/*Create New Book Reducer*/
const createNewBookInit = (state, action) => {
    return updateObject(state, { loading: false });
};

const createNewBookStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const createNewBookSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        book: action.book,
    });
};

const createNewBookFail = (state, action) => {
    return updateObject(state, { loading: false, registered: false });
};

/*Change book status reducer*/
const changeBookStatusInit = (state, action) => {
    return updateObject(state, { loading: false });
};

const changeBookStatusStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const changeBookStatusSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        book: action.book,
    });
};

const changeBookStatusFail = (state, action) => {
    return updateObject(state, { loading: false, registered: false });
};

const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOK_LIST.INIT: return getBookListInit(state, action);
        case GET_BOOK_LIST.START: return getBookListStart(state, action);
        case GET_BOOK_LIST.SUCCESS: return getBookListSuccess(state, action)
        case GET_BOOK_LIST.FAIL: return getBookListFail(state, action);
        case CREATE_NEW_BOOK.INIT: return createNewBookInit(state, action);
        case CREATE_NEW_BOOK.START: return createNewBookStart(state, action);
        case CREATE_NEW_BOOK.SUCCESS: return createNewBookSuccess(state, action)
        case CREATE_NEW_BOOK.FAIL: return createNewBookFail(state, action);
        case CHANGE_BOOK_STATUS.INIT: return changeBookStatusInit(state, action);
        case CHANGE_BOOK_STATUS.START: return changeBookStatusStart(state, action);
        case CHANGE_BOOK_STATUS.SUCCESS: return changeBookStatusSuccess(state, action)
        case CHANGE_BOOK_STATUS.FAIL: return changeBookStatusFail(state, action);
        default: return state;
    }
};


export default booksReducer