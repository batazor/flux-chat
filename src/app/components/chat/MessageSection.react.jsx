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

  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      var node = React.findDOMNode(this.refs.scrollbar);
      node.scrollTop = node.scrollHeight;
    }
  },

  componentWillUpdate: function() {
    var node;

    if (!_.isEmpty(this.state.messages)) {
      var last = _.last(this.state.messages);

      if (last.userId._id === this.state.user._id) {
        node = React.findDOMNode(this.refs.scrollbar);
        node.scrollTop = node.scrollHeight;
      }
    }

    node = React.findDOMNode(this.refs.scrollbar);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    RoomStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {

    var roomName = _.isUndefined(this.state.room) ? 'Welcome!' : this.state.room.name;
    var messagesListItems = _.isEmpty(this.state.messages) ? 'No Messages' : _.map(this.state.messages, getMessageItem, this);

    return (
      <div className="row chat">
        <div className="col-xs chat-app">
          <div className="row center-xs chat-header">
            <h4 className="room-name">{roomName}</h4>
          </div>
          <div className="row container">
            <div className="col-xs scrollbar">
              <div className="scrollbar-box" ref="scrollbar">
                {messagesListItems}
              </div>

              <div className="row center-xs scrollbar-box message-input">
                <MessageInput
                  room={this.state.room}
                  user={this.state.user} />
              </div>
            </div>
          </div>
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
