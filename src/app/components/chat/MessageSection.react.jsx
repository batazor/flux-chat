const React = require("react");
const _ = require("underscore");
const AuthActions = require("../../actions/AuthActions.jsx");
const MessageStore = require("../../stores/MessageStore.jsx");
const RoomStore = require("../../stores/RoomStore.jsx");
const AuthStore = require("../../stores/AuthStore.jsx");
const MessageItem = require("./MessageItem.react.jsx");
const MessageInput = require("./MessageInput.react.jsx");

const getMessageItem = function (message) {
  return (
    <MessageItem key={message._id} message={message} user={this.state.user} />
  );
};

const MessageSection = React.createClass({
  getInitialState() {
    AuthActions.initSession();

    return {
      room: RoomStore.getCurrentRoom(),
      messages: MessageStore.getMessage(),
      user: AuthStore.getSession(),
    };
  },

  componentDidMount() {
    MessageStore.addChangeListener(this._onChange);
    RoomStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },

  // componentDidUpdate: function() {
  //   if (this.shouldScrollBottom) {
  //     var node = this.scrollbar;
  //     node.scrollTop = node.scrollHeight;
  //   }
  // },

  componentWillUpdate() {
    let node;

    if (!_.isEmpty(this.state.messages)) {
      const last = _.last(this.state.messages);

      // if (last.userId._id === this.state.user._id) {
      //   node = this.scrollbar;
      //   node.scrollTop = node.scrollHeight;
      // }
    }

    node = this.scrollbar;
    // this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
    RoomStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  render() {
    const roomName = _.isUndefined(this.state.room)
      ? "Welcome!"
      : this.state.room.name;
    const messagesListItems = _.isEmpty(this.state.messages)
      ? "No Messages"
      : _.map(this.state.messages, getMessageItem, this);

    return (
      <div className="row chat">
        <div className="col-xs chat-app">
          <div className="row center-xs chat-header">
            <h4 className="room-name">{roomName}</h4>
          </div>
          <div className="row container">
            <div className="col-xs scrollbar">
              <div className="scrollbar-box" ref={c => (this.scrollbar = c)}>
                {messagesListItems}
              </div>

              <div className="row center-xs scrollbar-box message-input">
                <MessageInput room={this.state.room} user={this.state.user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState({
        user: AuthStore.getSession(),
        room: RoomStore.getCurrentRoom(),
        messages: MessageStore.getMessage(this.state.room),
      });
    }
  },
});

module.exports = MessageSection;
