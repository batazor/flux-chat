var React = require('react');
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

    AuthActions.loginAuth(form);
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <div className="row center-xs" >

          <FlatButton
            linkButton={true}
            href="/auth/facebook"
            label="Facebook" />

        </div>

        <form onSubmit={this.handleSubmit}>

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
              <RaisedButton label="Login" />
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
