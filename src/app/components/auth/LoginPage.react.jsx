const React = require("react");
const DocumentTitle = require("react-document-title");
const mui = require("material-ui");
const AuthActions = require("../../actions/AuthActions.jsx");
const AuthStore = require("../../stores/AuthStore.jsx");

const { RaisedButton } = mui;
const { FlatButton } = mui;
const { TextField } = mui;

const LoginPage = React.createClass({
  getInitialState() {
    AuthActions.initSession();

    return {
      emailError: null,
      passwordError: null,

      session: AuthStore.getSession(),
    };
  },

  validate() {
    const form = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    };

    // Check email
    if (!form.email) {
      this.setState({ emailError: "Email cannot be empty!" });
      form.email = false;
    } else {
      this.setState({ emailError: null });
    }

    // Check password
    if (!form.password) {
      this.setState({ passwordError: "Password cannot be empty!" });
      form.password = false;
    } else if (form.password.length < 8) {
      this.setState({
        passwordError: "The password must contain at least 8 characters",
      });
      form.password = false;
    } else {
      this.setState({ passwordError: null });
    }

    return form.email && form.password;
  },

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render() {
    return (
      <DocumentTitle title="Login | Flux • Chat">
        <div>
          <h1 className="row center-xs">Login</h1>
          <div className="row center-xs">
            <FlatButton
              className="btn btn-facebook"
              href="/auth/facebook"
              label="Facebook"
            />
            <FlatButton
              className="btn btn-twitter"
              href="/auth/twitter"
              label="Twitter"
            />
            <FlatButton
              className="btn btn-google"
              href="/auth/google"
              label="Google"
            />
            <FlatButton
              className="btn btn-github"
              href="/auth/github"
              label="Github"
            />
            <FlatButton
              className="btn btn-vk"
              href="/auth/vkontakte"
              label="VK"
            />
          </div>

          <form action="/auth/login" method="post">
            <div className="row center-xs">
              <div className="col-xs-3">
                <div className="box">
                  <TextField
                    ref="email"
                    onBlur={this.validate}
                    hintText="Hint Email"
                    floatingLabelText="Email"
                    required
                    errorText={this.state.emailError}
                    name="email"
                    type="email"
                  />
                </div>
              </div>

              <div className="col-xs-3">
                <div className="box">
                  <TextField
                    ref="password"
                    onBlur={this.validate}
                    hintText="Hint Password"
                    floatingLabelText="Password"
                    required
                    errorText={this.state.passwordError}
                    name="password"
                    type="password"
                  />
                </div>
              </div>
            </div>

            <div className="row center-xs">
              <div className="col-xs-4">
                <div className="box">
                  <RaisedButton label="Login" />
                </div>
              </div>
            </div>

            <div className="row center-xs">
              <div className="box">
                <p>
                  Need an account?
                  <a href="/#/signup">Signup</a>
                </p>
                <p>
                  Or go?
                  <a href="/#/">home</a>
.
                </p>
              </div>
            </div>
          </form>
        </div>
      </DocumentTitle>
    );
  },

  _onChange() {
    if (this.isMounted()) {
      if (this.state.session._id) {
        return window.location.replace("/#/profile");
      }

      this.setState({ session: AuthStore.getSession() });
    }
  },
});

module.exports = LoginPage;
