import React, { Component } from 'react';
import { connect } from 'react-redux';
import BooksList from '../../components/Books/BooksList'
import * as bookActions from '../../store/actions/books'

import axios from '../../axios-api';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './Books.css';

class Books extends Component {

    componentDidMount() {
        this.props.getBookList();
    }

    createNewBook = () => {
        console.log('Foo Bar')
        this.props.history.push('/create-book')
    }

    render() {
        return (
            <div className={classes.Books}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-md-6">
                                <h1>Book List</h1>
                            </div>
                            <div className="col-md-6">
                                <button type="button" className="btn btn-info float-right">Create New</button>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <BooksList
                            books={this.props.bookList}
                            onCreateNewBook={this.createNewBook}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        bookList: state.books.book_list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBookList: () => dispatch(bookActions.getBookList())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Books, axios));