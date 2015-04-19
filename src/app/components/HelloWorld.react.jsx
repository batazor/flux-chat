var React = require('react');
var TestButtonActions = require('../actions/TestButtonActions.jsx');
var ButtonStore = require('../stores/ButtonStore.jsx');

var HelloWorld = React.createClass({
  // Get initial state from stores
  getInitialState: function() {
    TestButtonActions.initValue();

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
        <h1>test</h1>
        <button type="button" onClick={this.addCount}>ADD COUNT</button>
        <p>Value: { this.state.value }</p>
      </div>
    );
  },

  // Method to setState based upon Store changes
  _onChange: function() {
    if (this.isMounted()) {
      this.setState({ value: ButtonStore.getValue() });
    }
  }
});

module.exports = HelloWorld;
