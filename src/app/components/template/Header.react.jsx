var React = require('react');
var Link = require('react-router-dom').Link;
var AuthActions = require('../../actions/AuthActions.jsx');
var AuthStore = require('../../stores/AuthStore.jsx');

var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var FlatButton = mui.FlatButton;
var Menu = mui.Menu;
var DropDownMenu = mui.DropDownMenu;
var ToolbarGroup = mui.ToolbarGroup;

var userMenuItems = [
   { payload: '1', text: 'User' },
   { payload: 'profile', text: 'Profile' },
   { payload: 'logout', text: 'Logout' }
];

var Header = React.createClass({
  getInitialState: function() {
    AuthActions.initSession();

    return {
      session: AuthStore.getSession()
    };
  },

  logout: function() {
    AuthActions.logoutAuth();
  },

  profilePage: function() {
    return window.location.replace("/#/login");
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    if (this.state.session._id) {
      var userMenuVisibility =
        <ToolbarGroup>
          <DropDownMenu selectedIndex={0} onChange={this.userMenuItems} menuItems={userMenuItems} />
        </ToolbarGroup>
    }

    return (
      <header>
        <Toolbar>
          <ToolbarGroup>
            <Link to="/chat"><FlatButton label="Chat" /></Link>
            <Link to="/about"><FlatButton label="About" /></Link>
            <Link to="/hello"><FlatButton label="Hello" /></Link>
          </ToolbarGroup>

          {userMenuVisibility}

          <ToolbarGroup>
            <FlatButton href="/#/" label="Flux • Chat" />
          </ToolbarGroup>
        </Toolbar>
      </header>
    );
  },

  userMenuItems: function(e, selectedIndex, menuItem) {
    switch(menuItem.payload) {
      case 'profile':
        this.profilePage();
        break;
      case 'logout':
        this.logout();
        break;
    }
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState({ session: AuthStore.getSession() });
    }
  }
});

module.exports = Header;
