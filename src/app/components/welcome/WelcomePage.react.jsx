var React = require('react');

var WelcomePage = React.createClass({
  render: function() {
    return (
      <header>
        <div className="container">
          <div className="row">
            <h1 className="center-align lime-text text-darken-4">Chat on Node.js</h1>
          </div>
        </div>
        <div className="container row valign-wrapper">
          <div className="col s12 valign">
            <div className="row">
              <a className="btn col s5 waves-effect waves-light lime darken-3" href="/#/login">Local Login</a>
              <a className="btn col s5 offset-s2 waves-effect waves-light lime darken-3" href="/#/login">Local Signup</a>
            </div>
          </div>
        </div>
    </header>
    );
  }
});

module.exports = WelcomePage;
