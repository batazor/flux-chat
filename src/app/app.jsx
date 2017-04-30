var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router-dom').HashRouter;
var Route = require('react-router-dom').Route;
var Switch = require('react-router-dom').Switch;
var HashRouter = require('react-router-dom').HashRouter;
var AppContainer = require('react-hot-loader').AppContainer;
var injectTapEventPlugin = require('react-tap-event-plugin');
var MuiThemeProvider = require('material-ui').MuiThemeProvider;
require('./utils/socketio.jsx'); // Socket listen

// Page
var WelcomePage = require('./components/welcome/WelcomePage.react.jsx');

// i18n - Localize
// var ReactIntl = require('react-intl');
// var i18nLoader = require('./utils/i18n');
// var LocaleStore = require('./stores/LocaleStore.jsx');
// var currentLocale = LocaleStore.getLocale(); // Get Default Language

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

const BasicExample = () => (
  <Router>
    <div>
      <div className='wrapper'>
        <Header />
        <main className='col-xs-12 chat' style={{'padding': '0'}}>
          <Switch>
            <Route path="/about" component={require('./components/about/AboutPage.react.jsx')} />
            <Route path="/chat" component={require('./components/chat/ChatPage.react.jsx')} />
            <Route path="/login" component={require('./components/auth/LoginPage.react.jsx')} />
            <Route path="/signup" component={require('./components/auth/SignupPage.react.jsx')} />
            <Route path="/connect/local" component={require('./components/auth/ConnectLocalPage.react.jsx')} />
            <Route path="/profile" component={require('./components/auth/ProfilePage.react.jsx')} />
            <Route path="/hello" component={require('./components/HelloWorld.react.jsx')} />
            <Route path="/" component={require('./components/welcome/WelcomePage.react.jsx')} />
          </Switch>
        </main>
        <div className="push"></div>
      </div>
      <Footer />
    </div>
  </Router>
)

ReactDOM.render((
  <HashRouter>
    <MuiThemeProvider>
      <BasicExample />
    </MuiThemeProvider>
  </HashRouter>
), document.getElementById('app'));
