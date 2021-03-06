import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../rActions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    document.body.style = 'background: #223843;';
    return (
      <div className="login back-indigo">
        <div className="container centered">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h3 className="display-4 text-center">Entre</h3>
              <p className="lead text-center">Identifique-se e entre no Elephas</p>
              <form noValidate onSubmit={ this.onSubmit }>
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={ this.state.email }
                  onChange={ this.onChange }
                  error={ errors.email }
                  />
                <TextFieldGroup
                  placeholder="Senha"
                  type="password"
                  name="password"
                  value={ this.state.password }
                  onChange={ this.onChange }
                  error={ errors.password }
                  />
                <input
                  type="submit"
                  value="Entrar"
                  className="btn btn-lg btn-block grey-blue mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
