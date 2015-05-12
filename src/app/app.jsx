var React = require('react');
var Router = require('react-router');
var injectTapEventPlugin = require("react-tap-event-plugin");
require('./utils/socketio.jsx'); // Socket listen

// i18n - Localize
var ReactIntl = require('react-intl');
var i18nLoader = require('./utils/i18n');
var LocaleStore = require('./stores/LocaleStore.jsx');
var currentLocale = LocaleStore.getLocale(); // Get Default Language

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

var App = React.createClass({
  //Make sure to include the ReactIntl.IntlMixin here so
  //that the i18n gets passed into it from the RouteHandler
  mixins: [ReactIntl.IntlMixin, Router.State, Router.Navigation],

  componentDidMount: function() {
    LocaleStore.addChangeListener(this.onLocaleChange);
  },

  componentWillUnmount: function() {
    LocaleStore.removeChangeListener(this.onLocaleChange);
  },

  onLocaleChange: function() {
    currentLocale = LocaleStore.getLocale();
    i18nLoader(currentLocale, renderApp);

    //now re-render the app when the i18n data gets changed
    renderApp();
  },

  render: function () {
    return (
      <div>
        <div className='wrapper'>
          <Header />
          <main className='col-xs-12 chat' style={{'padding': '0'}}>
            <RouteHandler />
          </main>
          <div className="push"></div>
        </div>
        <Footer />
      </div>
    );
  }
});


var routes = (
  <Route  handler={App} name="app" path="/">
    <Route name="/chat" handler={require('react-router-proxy!./components/chat/ChatPage.react.jsx')} />
    <Route name="/about" handler={require('react-router-proxy!./components/about/AboutPage.react.jsx')} />
    <Route path="/login" handler={require('react-router-proxy!./components/auth/LoginPage.react.jsx')} />
    <Route path="/signup" handler={require('react-router-proxy!./components/auth/SignupPage.react.jsx')} />
    <Route path="/connect/local" handler={require('react-router-proxy!./components/auth/ConnectLocalPage.react.jsx')} />
    <Route path="/profile" handler={require('react-router-proxy!./components/auth/ProfilePage.react.jsx')} />
    <Route path="/hello" handler={require('react-router-proxy!./components/HelloWorld.react.jsx')} />
    <DefaultRoute handler={require('react-router-proxy!./components/welcome/WelcomePage.react.jsx')} />
  </Route>
);

var CurrentHandler = null;

//this method re-renders the app
function renderApp(currentLocale) {
  if (CurrentHandler) {
    //this is where the i18n data gets passed in
    React.render(<CurrentHandler {...currentLocale} />, document.getElementById('app'));
  }
}

//The initial rendering of the app happens here.
Router.run(routes, function(Handler) {
  CurrentHandler = Handler;
  i18nLoader(currentLocale, renderApp);
  renderApp();
});
