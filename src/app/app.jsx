var React = require('react');
var Router = require('react-router');
var injectTapEventPlugin = require("react-tap-event-plugin");

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
// Page Component ==============================================================
var WelcomePage = require('./components/welcome/WelcomePage.react.jsx');
var AboutPage = require('./components/about/AboutPage.react.jsx');
var LoginPage = require('./components/auth/LoginPage.react.jsx');
var SignupPage = require('./components/auth/SignupPage.react.jsx');

// Router setting ==============================================================
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function () {
    return (<RouteHandler />);
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route path="/about" handler={AboutPage} />
    <Route path="/login" handler={LoginPage} />
    <Route path="/signup" handler={SignupPage} />
    <DefaultRoute handler={WelcomePage} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(
    <div>
      <div className='wrapper'>
        <Header />
        <main>
          <Handler/>
        </main>
        <div className="push"></div>
      </div>
      <Footer />
    </div>,
    document.body);
});
