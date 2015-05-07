var React = require('react');
var DocumentTitle = require('react-document-title');
var TestButtonActions = require('../actions/TestButtonActions.jsx');
var ButtonStore = require('../stores/ButtonStore.jsx');
var AuthActions = require('../actions/AuthActions.jsx');
var AuthStore = require('../stores/AuthStore.jsx');

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var HelloWorld = React.createClass({
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
          <h1 className="row center-xs">test</h1>

          <div className="row center-xs">
            <RaisedButton onClick={this.addCount} label="ADD COUNT" />
          </div>
          <p className="row center-xs">Value: { this.state.value }</p>

          <div className="row center-xs">
            <RaisedButton onClick={this.consoleData} label="Session Socket" disabled={sessionStatus} />
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
