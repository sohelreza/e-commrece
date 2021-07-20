import React, { Component } from "react";
import { connect } from "react-redux";

import { formValidation, uniqueId } from "../../helperFunctions";

import { sAdminLogin, sAdminLogout } from "../../redux";

import { loaderUrl } from "../../constants";

import backgroundImage from "../../assets/image/e_commerce_background.jpg";
import "./sAdminLogin.css";

class SAdminLogin extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.sAdminLogout();

    this.state = {
      email: "",
      password: "",
      submitted: false,
      emailError: "",
      passwordError: "",
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    const data = formValidation.checkType(this.state, name, value);
    this.setState(data);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });

    const { email, password } = this.state;
    const { sAdminLogin } = this.props;

    if (email && password) {
      sAdminLogin(email, password);
    }
  }

  render() {
    // console.log("login render", this.state);
    const { loggingIn, error } = this.props;

    const { email, password, submitted, emailError, passwordError } =
      this.state;

    return (
      <div
        className="container login-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <header>
          <h1>Admin Login</h1>
        </header>

        <section>
          <div id="container_demo">
            <div id="wrapper">
              <div id="login" className="animate form">
                <form
                  autoComplete="on"
                  name="form"
                  onSubmit={this.handleSubmit.bind(this)}
                >
                  <h1>Login</h1>

                  {error && error === 404 && (
                    <span className="validation-error text-center">
                      Email or Password does not match
                    </span>
                  )}

                  <p>
                    <label htmlFor="email">Your email</label>

                    <input
                      id="email"
                      name="email"
                      required="required"
                      type="text"
                      placeholder="Enter your email..."
                      value={email}
                      onChange={this.handleChange.bind(this)}
                    />

                    {submitted &&
                      emailError.map((message) => {
                        return (
                          <span
                            key={uniqueId.id()}
                            className="validation-error"
                          >
                            {message}
                          </span>
                        );
                      })}
                  </p>

                  <p>
                    <label htmlFor="password" className="youpasswd">
                      Your password
                    </label>

                    <input
                      id="password"
                      name="password"
                      required="required"
                      type="password"
                      placeholder="Enter your password..."
                      value={password}
                      onChange={this.handleChange.bind(this)}
                    />

                    {submitted &&
                      passwordError.map((message) => {
                        return (
                          <span
                            key={uniqueId.id()}
                            className="validation-error"
                          >
                            {message}
                          </span>
                        );
                      })}
                  </p>

                  <p className="signin button">
                    {loggingIn ? (
                      <img src={loaderUrl} alt="Please Wait..." />
                    ) : (
                      <input type="submit" value="Sign In" />
                    )}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggingIn, error, loggedIn } = state.sAdminLoginReducer;

  return {
    loggingIn,
    error,
    loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sAdminLogin: (email, password) => dispatch(sAdminLogin(email, password)),
    sAdminLogout: () => dispatch(sAdminLogout()),
  };
};

const connectedSAdminLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(SAdminLogin);

export { connectedSAdminLogin as SAdminLogin };
