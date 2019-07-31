const React = require("react");
const DocumentTitle = require("react-document-title");
const mui = require("material-ui");
const LocaleActions = require("../actions/LocaleActions.jsx");
const TestButtonActions = require("../actions/TestButtonActions.jsx");
const ButtonStore = require("../stores/ButtonStore.jsx");
const AuthActions = require("../actions/AuthActions.jsx");
const AuthStore = require("../stores/AuthStore.jsx");

// var IntlMixin = require('react-intl');
// var i18nLoader = require('../utils/i18n');

const { RaisedButton } = mui;

const HelloWorld = React.createClass({
  // mixins: [IntlMixin],

  handleLocaleChange(e) {
    LocaleActions.updateLocale(e.target.value);
  },

  // Get initial state from stores
  getInitialState() {
    TestButtonActions.initValue();
    AuthActions.initSession();

    return {
      value: 0,
      session: AuthStore.getSession(),
    };
  },

  // ADD COUNT VALUE
  addCount() {
    TestButtonActions.addValue(this.state.value);
  },

  // consoleData
  consoleData() {
    TestButtonActions.socketSession();
  },

  // Add change listeners to stores
  componentDidMount() {
    ButtonStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ButtonStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  render() {
    const sessionStatus = !this.state.session._id;

    return (
      <DocumentTitle title="Hello World | Flux • Chat">
        <div>
          <h1 className="row center-xs">test socket.io</h1>

          <div className="row center-xs">
            <RaisedButton onClick={this.addCount} label="ADD COUNT" />
          </div>
          <p className="row center-xs">
            Value:
            {this.state.value}
          </p>

          <h1 className="row center-xs">test session</h1>
          <div className="row center-xs">
            <RaisedButton
              onClick={this.consoleData}
              label="Session Socket"
              disabled={sessionStatus}
            />
          </div>

          <h1 className="row center-xs">test i18n</h1>

          <p className="row center-xs">hello</p>

          <div className="row center-xs">
            <select onChange={this.handleLocaleChange}>
              <option value="en">English</option>
              <option value="it">Italiano</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </DocumentTitle>
    );
  },

  // Method to setState based upon Store changes
  _onChange() {
    if (this.isMounted()) {
      this.setState({ value: ButtonStore.getValue() });
      this.setState({ session: AuthStore.getSession() });
    }
  },
});

module.exports = HelloWorld;
