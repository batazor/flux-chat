var React = require('react');
var ChatAction = require('../../actions/ChatAction.jsx');
var _ = require('underscore');

var mui = require('material-ui');
var IconButton = mui.IconButton;
var TextField = mui.TextField;

var MessageInput = React.createClass({
  propTypres: {
    room: React.PropTypes.object,
    user: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      message: ''
    };
  },

  render: function() {
    var disabledInput = _.isUndefined(this.props.room) ? true : false;
    var disabledButton = this.state.message === '' ? true : false;

    return (
      <form className="row" onSubmit={this.handleSubmit}>
        <TextField
          disabled={disabledInput}
          onChange={this.onChangeMessages}
          hintText="Enter Messages"
          floatingLabelText="Message"
          setValue={this.state.text} />

        <IconButton
          disabled={disabledButton}
          iconClassName="fa fa-send fa-4x"
          tooltip="Send Message" />
      </form>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var message = {
      userId: {_id: this.props.user._id, local: {email: this.props.user.local.email}},
      roomId: this.props.room._id,
      message: this.state.message
    };
    ChatAction.creatingMessage(message);

    this.setState({ message: '' });
  },

  onChangeMessages: function(e) {
    this.setState({ message: e.target.value });
  }
});

module.exports = MessageInput;
