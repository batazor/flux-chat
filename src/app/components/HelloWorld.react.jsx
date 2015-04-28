var React = require('react');
var TestButtonActions = require('../actions/TestButtonActions.jsx');
var ButtonStore = require('../stores/ButtonStore.jsx');
var AuthActions = require('../actions/AuthActions.jsx');
var AuthStore = require('../stores/AuthStore.jsx');

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
  },

  render: function() {
    var sessionSocket;
    if (this.state.session._id) {
      sessionSocket = <button type="button" onClick={this.consoleData}>Session Socket</button>
    } else {
      sessionSocket = <button type="button" disabled onClick={this.consoleData}>Session Socket</button>
    }

    return (
      <div className="test">
        <h1>test</h1>
        <button type="button" onClick={this.addCount}>ADD COUNT</button>
        <p>Value: { this.state.value }</p>
        <p>{sessionSocket}</p>
      </div>
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
