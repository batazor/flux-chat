var React = require('react');
var DocumentTitle = require('react-document-title');
var LocaleActions = require('../actions/LocaleActions.jsx');
var TestButtonActions = require('../actions/TestButtonActions.jsx');
var ButtonStore = require('../stores/ButtonStore.jsx');
var AuthActions = require('../actions/AuthActions.jsx');
var AuthStore = require('../stores/AuthStore.jsx');

var IntlMixin = require('react-intl');
var i18nLoader = require('../utils/i18n');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var HelloWorld = React.createClass({
  mixins: [IntlMixin],

  handleLocaleChange: function(e) {
    LocaleActions.updateLocale(e.target.value);
  },

  // Get initial state from stores
  getInitialState: function() {
    TestButtonActions.initValue();
    AuthActions.initSession();

    return {
      value: 0,
      session: AuthStore.getSession()
    };
  },

  // ADD COUNT VALUE
  addCount: function() {
    TestButtonActions.addValue(this.state.value);
  },

  // consoleData
  consoleData: function() {
    TestButtonActions.socketSession();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    ButtonStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ButtonStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var sessionStatus = this.state.session._id ? false : true;

    return (
      <DocumentTitle title='Hello World | Flux • Chat'>
        <div>
          <h1 className="row center-xs">test socket.io</h1>

          <div className="row center-xs">
            <RaisedButton onClick={this.addCount} label="ADD COUNT" />
          </div>
          <p className="row center-xs">Value: { this.state.value }</p>

          <h1 className="row center-xs">test session</h1>
          <div className="row center-xs">
            <RaisedButton onClick={this.consoleData} label="Session Socket" disabled={sessionStatus} />
          </div>

          <h1 className="row center-xs">test i18n</h1>
          
          <p className="row center-xs">{ this.getIntlMessage('hello') }</p>

          <p className="row center-xs">
            {this.formatNumber(1000, {
                style   : 'currency',
                currency: 'USD'
            })}
          </p>

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
  _onChange: function() {
    if (this.isMounted()) {
      this.setState({ value: ButtonStore.getValue() });
      this.setState({ session: AuthStore.getSession() });
    }
  }
});

module.exports = HelloWorld;
