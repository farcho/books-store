import React, { Component } from 'react';
import { connect } from 'react-redux';
import BooksList from '../../components/Books/BooksList'
import * as bookActions from '../../store/actions/books'
import { Header } from 'semantic-ui-react'
import axios from '../../axios-api';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Pagination from 'react-bootstrap/Pagination'

import classes from './Books.css';

class Books extends Component {
    state = {
        activePage: 1,
        books: []
    }

    componentDidMount() {
        this.props.getBookList(this.state.activePage);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.bookList && (nextProps.bookList.books !== nextState.books)
    }

    createNewBook = () => {
        console.log('Foo Bar')
        this.props.history.push('/create-book')
    }

    onChangeBookStatus = (id, status) => {
        const { changeBookStatus } = this.props;
        const data = { id, status: !status }
        changeBookStatus(data, this.state.activePage);
    }

    handlePaginationChange = async (page) => {
        await this.setState({ activePage: page, books: this.props.bookList.books })
        this.props.getBookList(page);
    }

    getPages = () => {
        const pages = this.props.bookList.pageCount
        let active = this.state.activePage;
        let items = [];
        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={() => this.handlePaginationChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items
    }

    render() {
        const hasData = this.props.bookList && this.props.bookList.books.length > 0;
        return (
            <div className={classes.Books}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-md-6">
                                <h1>Book List</h1>
                            </div>
                            <div className="col-md-6">
                                <button type="button" onClick={this.createNewBook} className="btn btn-info float-right">Create New</button>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        {hasData && (
                            <BooksList
                                books={this.props.bookList.books}
                                changeBookStatus={this.onChangeBookStatus}
                            />
                        )}
                        {hasData && (
                            <Pagination>{this.getPages()}</Pagination>
                        )}
                        {!hasData && (
                            <Header className={classes.noresults}>{'Not results found'}</Header>
                        )}
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
        getBookList: (page) => dispatch(bookActions.getBookList(page)),
        changeBookStatus: (data, activePage) => dispatch(bookActions.changeBookStatus(data, activePage))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Books, axios));