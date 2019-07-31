const React = require("react");
const DocumentTitle = require("react-document-title");
const mui = require("material-ui");
const AuthActions = require("../../actions/AuthActions.jsx");
const AuthStore = require("../../stores/AuthStore.jsx");

const { RaisedButton } = mui;
const { TextField } = mui;

const SignupPage = React.createClass({
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
      <DocumentTitle title="Signup | Flux • Chat">
        <form action="/connect/local" method="post">
          <h1 className="row center-xs">Signup</h1>

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
                <RaisedButton label="GO" />
              </div>
            </div>
          </div>

          <div className="row center-xs">
            <div className="box">
              <p>
                Or go?
                <a href="/#/">home</a>
.
              </p>
            </div>
          </div>
        </form>
      </DocumentTitle>
    );
  },

  _onChange() {
    if (this.isMounted()) {
      if (!this.state.session._id) {
        return window.location.replace("/#/login");
      }

      this.setState({ session: AuthStore.getSession() });
    }
  },
});

module.exports = SignupPage;
