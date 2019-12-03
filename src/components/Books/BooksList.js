import React from 'react';

import { Table } from 'semantic-ui-react'

const BooksList = (props) => {
    return (
        <div>
            <Table className="table-striped">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="left">
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="left">
                            Author
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                            Price
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                            Key Words
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                            Download
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                            Status
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.books && props.books.length > 0 &&
                        props.books.map((book, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell textAlign="left">
                                        {book.name}
                                    </Table.Cell>
                                    <Table.Cell textAlign="left">
                                        {book.author}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        {book.price}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        {book.keywords}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        {book.download_link}
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">
                                        <button
                                            onClick={props.onCreateNewBook}
                                            type="button"
                                            className={book.active ? 'btn btn-success' : 'btn btn-danger'}>
                                            {book.active ? 'Enabled' : 'Disabled'}
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                </Table.Body>
            </Table>
        </div>
    );
};

export default BooksList;