var React = require('react');
var AuthActions = require('../../actions/AuthActions.jsx');
var AuthStore = require('../../stores/AuthStore.jsx');

var Header = React.createClass({
  getInitialState: function() {
    AuthActions.initSession();

    return {
      session: AuthStore.getSession()
    };
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  logout: function() {
    AuthActions.logoutAuth();
  },

  render: function() {
    var style = {
      display: this.state.session._id ? "list-item" : "none"
    };

    return (
      <header>
        <ul id="user" className="dropdown-content">
          <li><a href='/#/profile'>Profile</a></li>
          <li><a onClick={this.logout}>Logout</a></li>
        </ul>
        <nav className="red">
          <div className="nav-wrapper">
            <div className="col s12">
              <a className="brand-logo right" href="/#/">NodeJS-Chat</a>
              <ul className="hide-on-med-and-down">
                <li><a href="/#/chat">Chat</a></li>
                <li><a href="/#/about">About</a></li>
                <li><a href="/#/hello">Hello</a></li>
                <li style={style}>
                  <a className="dropdown-button" data-activates="user" href="/#/">
                    <i className="mdi-navigation-arrow-drop-down right"></i> User
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState({ session: AuthStore.getSession() });
    }
  }
});

module.exports = Header;
