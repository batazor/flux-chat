var React = require('react');
var Icon = require('../UI/Icon.react.jsx');

var Header = React.createClass({
  render: function() {
    return (
      <header>
        <ul id="user" className="dropdown-content">
          <li><a href='/#/profile'>Profile</a></li>
          <li><a href='/#/logout'>Logout</a></li>
        </ul>
        <nav className="red">
          <div className="nav-wrapper">
            <div className="col s12">
              <a className="brand-logo right" href="/">NodeJS-Chat</a>
              <ul className="hide-on-med-and-down">
                <li><a href="/#/chat">Chat</a></li>
                <li><a href="/#/about">About</a></li>
                <li>
                  <a className="dropdown-button" data-activates="user" href="#">
                    <i className="mdi-navigation-arrow-drop-down right"></i> User
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
});

module.exports = Header;
