var React = require('react');
var DocumentTitle = require('react-document-title');
var AuthActions = require('../../actions/AuthActions.jsx');
var AuthStore = require('../../stores/AuthStore.jsx');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;
var TextField = mui.TextField;

var LoginPage = React.createClass({
  getInitialState: function() {
    AuthActions.initSession();

    return {
      emailError: null,
      passwordError: null,

      session: AuthStore.getSession()
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var form = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue()
    };

    if (this.validate(form)) {
      AuthActions.signupAuth(form);
    }
  },

  validate: function (form) {
    // Check email
    if (!form.email) {
      this.setState({emailError: "Email cannot be empty!"});
      form.email = false;
    } else {
      this.setState({emailError: null});
    }

    // Check password
    if (!form.password) {
      this.setState({passwordError: "Password cannot be empty!"});
      form.password = false;
    } else if (form.password.length < 8) {
      this.setState({passwordError: "The password must contain at least 8 characters"});
      form.password = false;
    } else {
      this.setState({passwordError: null});
    }

    return form.email && form.password;
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <DocumentTitle title='Login | Flux • Chat'>
        <div>
          <h1 className="row center-xs">Login</h1>
          <div className="row center-xs" >

            <FlatButton
              className="btn-facebook"
              linkButton={true}
              href="/auth/facebook"
              label="Facebook" />
            <FlatButton
              className="btn-twitter"
              linkButton={true}
              href="/auth/twitter"
              label="Twitter" />
            <FlatButton
              className="btn-google"
              linkButton={true}
              href="/auth/google"
              label="Google" />

          </div>

          <form onSubmit={this.handleSubmit}>

            <div className="row center-xs">
              <div className="col-xs-3">
                <div className="box">
                  <TextField
                    ref="email"
                    hintText="Hint Email"
                    floatingLabelText="Email"
                    required={true}
                    errorText={this.state.emailError}
                    type="email" />
                </div>
              </div>

              <div className="col-xs-3">
                <div className="box">
                  <TextField
                    ref="password"
                    hintText="Hint Password"
                    floatingLabelText="Password"
                    required={true}
                    errorText={this.state.passwordError}
                    type="password" />
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
                <p>Need an account? <a href="/#/signup">Signup</a></p>
                <p>Or go? <a href="/#/">home</a>.</p>
              </div>
            </div>

          </form>
        </div>
      </DocumentTitle>
    );
  },

  _onChange: function() {
    if (this.isMounted()) {
      if (this.state.session._id) {
        return window.location.replace("/#/profile");
      }

      this.setState({ session: AuthStore.getSession() });
    }
  }
});

module.exports = LoginPage;
