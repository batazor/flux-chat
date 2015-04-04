var React = require('react');
var Router = require('react-router');

// Teplate Component ===========================================================
var TemplateHeader = require('./components/template/TemplateHeader.react.jsx');
var TemplateFooter = require('./components/template/TemplateFooter.react.jsx');
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
        <TemplateHeader />
        <main>
          <Handler/>
        </main>
        <div className="push"></div>
      </div>
      <TemplateFooter />
    </div>,
    document.body);
});
