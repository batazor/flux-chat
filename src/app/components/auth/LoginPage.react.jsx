var React = require('react');
var AuthActions = require('../../actions/AuthActions.jsx');

var LoginPage = React.createClass({
  getInitialState: function() {
    return {
      email: "",
      password: ""
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
            <button className="btn col s12 waves-effect waves-light lime darken-3" type="submit">Login</button>
          </div>

          <p>Need an account? <a href="/#/signup">Signup</a></p>
          <p>Or go? <a href="/#/">home</a>.</p>
        </form>
      </div>
    );
  }
});

module.exports = LoginPage;
