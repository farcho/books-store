import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authControls, checkValidity } from '../../utils'
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import * as actions from '../../store/actions/auth';

class Auth extends Component {
    state = {
        authControls
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.authControls,
            [controlName]: {
                ...this.state.authControls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.authControls[controlName].validation),
                touched: true
            }
        };
        this.setState({ authControls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authControls.email.value, this.state.authControls.password.value);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.authControls) {
            formElementsArray.push({
                id: key,
                config: this.state.authControls[key]
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
                    <button className={`${'btn btn-info'} ${classes.submit}`} type="submit">LOG IN</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(null, mapDispatchToProps)(Auth);