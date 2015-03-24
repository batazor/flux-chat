var React = require('react');
var TestButtonActions = require('../actions/TestButtonActions');
var ButtonStore = require('../stores/ButtonStore');

// Method to retrieve state from Stores
function getButtonState() {
  return {
    value: ButtonStore.getValue()
  };
}

var HelloWorld = React.createClass({
  // Get initial state from stores
  getInitialState: function() {
    return {value: 0};
  },

  // ADD COUNT VALUE
  addCount: function() {
    TestButtonActions.addValue(this.state.value);
  },

  // Add change listeners to stores
  componentDidMount: function() {
    ButtonStore.addChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="test">
        <h1>Hello, world!</h1>
        <button type="button" onClick={this.addCount}>ADD COUNT</button>
        <p>Value: { this.state.value }</p>
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getButtonState());
  }
});

module.exports = HelloWorld;
