var React = require('react');
var DocumentTitle = require('react-document-title');
var AuthActions = require('../../actions/AuthActions.jsx');
var AuthStore = require('../../stores/AuthStore.jsx');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;

var SignupPage = React.createClass({
  getInitialState: function() {
    AuthActions.initSession();

    return {
      email: "",
      password: "",
      session: AuthStore.getSession()
    };
  },

  onChangeEmail: function(e) {
    this.setState({ email: e.target.value });
  },

  onChangePassword: function(e) {
    this.setState({ password: e.target.value });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var form = {
      email: this.state.email,
      password: this.state.password
    };

    AuthActions.signupAuth(form);
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {

    return (
      <DocumentTitle title='Signup | Flux • Chat'>
        <form onSubmit={this.handleSubmit}>
          <h1 className="row center-xs">Signup</h1>

          <div className="row center-xs">
            <div className="col-xs-3">
              <div className="box">
                <TextField
                  onChange={this.onChangeEmail}
                  hintText="Hint Email"
                  floatingLabelText="Email" />
              </div>
            </div>

            <div className="col-xs-3">
              <div className="box">
                <TextField
                  onChange={this.onChangePassword}
                  hintText="Hint Password"
                  floatingLabelText="Password" />
              </div>
            </div>
          </div>

          <div className="row center-xs">
            <div className="col-xs-4">
              <RaisedButton label="Register" />
            </div>
          </div>

          <div className="row center-xs">
            <div className="box">
              <p>Need an account? <a href="/#/login">Login</a></p>
              <p>Or go? <a href="/#/">home</a>.</p>
            </div>
          </div>

        </form>
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

module.exports = SignupPage;
