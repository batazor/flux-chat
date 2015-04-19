var React = require('react');
// var Auth = require('../../clients/Authentication');

var SignupPage = React.createClass({
  getInitialState: function() {
    return {
      username: null,
      validUsername: false,
      password: null,
      password2: null,
      email: null,
      validEmail: false
    };
  },

  // validPassword: function() {
  //   return (
  //     this.state.password !== undefined &&
  //     this.state.password !== null &&
  //     Auth.validPassword(this.state.password)
  //   );
  // },

  render: function() {
    return (
      <div className="row container">
        <form className="card-panel" action="/user/signup" method="post">
          <div className="row">
            <div className="input-field col s6">
              <input id="email" className="validate" type="text" name="email" />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field col s6">
              <input id="password" className="validate" type="password" name="password" />
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
  }
});

module.exports = SignupPage;
