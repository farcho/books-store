import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-api';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { signUpControls, checkValidity } from '../../utils'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Signup.css';
import * as signupActions from '../../store/actions/signup';

class Signup extends Component {
    state = {
        signUpControls
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.signUpControls,
            [controlName]: {
                ...this.state.signUpControls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.signUpControls[controlName].validation),
                touched: true
            }
        };
        this.setState({ signUpControls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        const userData = {
            name: this.state.signUpControls.name.value,
            email: this.state.signUpControls.email.value,
            password: this.state.signUpControls.password.value
        }
        this.props.onRegisterUser(userData);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.signUpControls) {
            formElementsArray.push({
                id: key,
                config: this.state.signUpControls[key]
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
            <div className={classes.Signup}>
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
        onRegisterUser: (data) => dispatch(signupActions.registerUser(data))
    };
};

export default connect(null, mapDispatchToProps)(withErrorHandler(Signup, axios));