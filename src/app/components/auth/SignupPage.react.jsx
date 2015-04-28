var React = require('react');
var AuthActions = require('../../actions/AuthActions.jsx');
var AuthStore = require('../../stores/AuthStore.jsx');

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
      <div className="row container">
        <form className="card-panel" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input id="email" type="text" onChange={this.onChangeEmail} defaultValue={this.state.email} />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field col s6">
              <input id="password" type="password" onChange={this.onChangePassword} defaultValue={this.state.password} />
              <label htmlFor="password">Password</label>
            </div>
          </div>

          <div className="row">
            <button className="btn col s12 waves-effect waves-light lime darken-3" type="submit">Register</button>
          </div>

          <p>Need an account? <a href="/#/login">Login</a></p>
          <p>Or go? <a href="/#/">home</a>.</p>
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

module.exports = SignupPage;
