import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
            message: null
        }

        componentWillMount() {
            const token = JSON.parse(localStorage.getItem('token'))
            this.reqInterceptor = axios.interceptors.request.use(req => {
                if (token !== null) {
                    req.headers.Authorization = `Bearer ${token}`;
                }
                this.setState({ error: null, message: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error, message: error.response.data.message });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null, message: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.message}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.message ? this.state.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;