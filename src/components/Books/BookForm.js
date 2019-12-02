import React, { Component } from 'react';

import { connect } from 'react-redux';
import axios from '../../axios-api';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { bookControls, checkValidity } from '../../utils'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from '../../containers/Auth/Auth.css';
import * as bookActions from '../../store/actions/books';

class BookForm extends Component {
    state = {
        bookControls,
        selectedFile: null
    }

    inputChangedHandler = (event, controlName) => {
        if (controlName === 'file') {
            this.setState({ selectedFile: event.target.files[0] })
        } else {
            const updatedControls = {
                ...this.state.bookControls,
                [controlName]: {
                    ...this.state.bookControls[controlName],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.bookControls[controlName].validation),
                    touched: true
                }
            };
            this.setState({ bookControls: updatedControls });
        }
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const bookData = {
            name: this.state.bookControls.name.value,
            author: this.state.bookControls.author.value,
            price: this.state.bookControls.price.value,
        }
        await this.setState({})
        this.props.createNewBook(bookData, this.state.selectedFile);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.bookControls) {
            formElementsArray.push({
                id: key,
                config: this.state.bookControls[key]
            });
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createNewBook: (data, file) => dispatch(bookActions.createNewBook(data, file))
    };
};

export default connect(null, mapDispatchToProps)(withErrorHandler(BookForm, axios));