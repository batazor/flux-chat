var React = require('react');
var Router = require('react-router');
var injectTapEventPlugin = require("react-tap-event-plugin");
require('./utils/socketio.jsx'); // Socket listen

// Needed for React Developer Tools
window.React = React;

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Teplate Component ===========================================================
var Header = require('./components/template/Header.react.jsx');
var Footer = require('./components/template/Footer.react.jsx');

// Router setting ==============================================================
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
  <Route path="/">
    <Route name="/chat" handler={require('react-router-proxy!./components/chat/ChatPage.react.jsx')} />
    <Route name="/about" handler={require('react-router-proxy!./components/about/AboutPage.react.jsx')} />
    <Route path="/login" handler={require('react-router-proxy!./components/auth/LoginPage.react.jsx')} />
    <Route path="/signup" handler={require('react-router-proxy!./components/auth/SignupPage.react.jsx')} />
    <Route path="/profile" handler={require('react-router-proxy!./components/auth/ProfilePage.react.jsx')} />
    <Route path="/hello" handler={require('react-router-proxy!./components/HelloWorld.react.jsx')} />
    <DefaultRoute handler={require('react-router-proxy!./components/welcome/WelcomePage.react.jsx')} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(
    <div>
      <div className='wrapper'>
        <Header />
        <main className='col-xs-12 chat' style={{'padding': '0'}}>
          <Handler />
        </main>
        <div className="push"></div>
      </div>
      <Footer />
    </div>,
    document.getElementById('app'));
});
