var React = require('react');
var AuthActions = require('../../actions/AuthActions.jsx');
var AuthStore = require('../../stores/AuthStore.jsx');
var RoomSection = require('./RoomSection.react.jsx');
var MessageSection = require('./MessageSection.react.jsx');

var ChatPage = React.createClass({
  getInitialState: function() {
    return {
      session: AuthStore.getSession()
    };
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="row chat">

        <div className="col-xs-3 chat">
          <RoomSection />
        </div>

        <div className="col-xs-6 chat">
          <MessageSection />
        </div>

        <div className="col-xs-3">UserSection</div>
      </div>
    );
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState({ session: AuthStore.getSession() });

      if (!this.state.session._id)
        return window.location.replace("/#/login");
    }
  }
});

module.exports = ChatPage;
