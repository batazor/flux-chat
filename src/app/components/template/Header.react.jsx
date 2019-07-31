const React = require("react");
const { Link } = require("react-router-dom");
const mui = require("material-ui");
const AuthActions = require("../../actions/AuthActions.jsx");
const AuthStore = require("../../stores/AuthStore.jsx");

const { Toolbar } = mui;
const { FlatButton } = mui;
const { Menu } = mui;
const { DropDownMenu } = mui;
const { ToolbarGroup } = mui;

const userMenuItems = [
  { payload: "1", text: "User" },
  { payload: "profile", text: "Profile" },
  { payload: "logout", text: "Logout" }
];

const Header = React.createClass({
  getInitialState() {
    AuthActions.initSession();

    return {
      session: AuthStore.getSession()
    };
  },

  logout() {
    AuthActions.logoutAuth();
  },

  profilePage() {
    return window.location.replace("/#/login");
  },

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render() {
    if (this.state.session._id) {
      var userMenuVisibility = (
        <ToolbarGroup>
          <DropDownMenu
            selectedIndex={0}
            onChange={this.userMenuItems}
            menuItems={userMenuItems}
          />
        </ToolbarGroup>
      );
    }

    return (
      <header>
        <Toolbar>
          <ToolbarGroup>
            <Link to="/chat">
              <FlatButton label="Chat" />
            </Link>
            <Link to="/about">
              <FlatButton label="About" />
            </Link>
            <Link to="/hello">
              <FlatButton label="Hello" />
            </Link>
          </ToolbarGroup>

          {userMenuVisibility}

          <ToolbarGroup>
            <FlatButton href="/#/" label="Flux • Chat" />
          </ToolbarGroup>
        </Toolbar>
      </header>
    );
  },

  userMenuItems(e, selectedIndex, menuItem) {
    switch (menuItem.payload) {
      case "profile":
        this.profilePage();
        break;
      case "logout":
        this.logout();
        break;
    }
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState({ session: AuthStore.getSession() });
    }
  }
});

module.exports = Header;
