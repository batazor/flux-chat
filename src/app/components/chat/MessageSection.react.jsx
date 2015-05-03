var React = require('react');
var AuthActions = require('../../actions/AuthActions.jsx');
var MessageStore = require('../../stores/MessageStore.jsx');
var RoomStore = require('../../stores/RoomStore.jsx');
var AuthStore = require('../../stores/AuthStore.jsx');
var MessageItem = require('./MessageItem.react.jsx');
var MessageInput = require('./MessageInput.react.jsx');
var _ = require('underscore');

var getMessageItem = function(message) {
  return (
    <MessageItem
      key={message._id}
      message={message}
      user={this.state.user} />
  );
};

var MessageSection = React.createClass({

  getInitialState: function() {
    AuthActions.initSession();

    return {
      room: RoomStore.getCurrentRoom(),
      messages: MessageStore.getMessage(),
      user: AuthStore.getSession()
    };
  },

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
    RoomStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    RoomStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    
    var roomName = _.isUndefined(this.state.room) ? false : this.state.room.name;
    var messagesListItems = _.isEmpty(this.state.messages) ? 'No Messages' : _.map(this.state.messages, getMessageItem, this);

    return (
      <div>
        <div className="row center-xs">
          <h4>{roomName}</h4>
        </div>
        <div className="row center-xs">
          <div className="col-xs">
            {messagesListItems}
          </div>
        </div>
        <div className="row center-xs">
          <MessageInput
            room={this.state.room}
            user={this.state.user} />
        </div>
      </div>
    );
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState({
        user: AuthStore.getSession(),
        room: RoomStore.getCurrentRoom(),
        messages: MessageStore.getMessage(this.state.room)
      });
    }
  }

});

module.exports = MessageSection;
