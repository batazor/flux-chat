var React = require('react');
var ChatAction = require('../../actions/ChatAction.jsx');
var Markdown = require('react-remarkable');
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
      message: '',
      previewFlag: false,
      markdown: false
    };
  },

  render: function() {

    var disabledInput = _.isUndefined(this.props.room) ? true : false;
    var disabledButton = this.state.message === '' ? true : false;

    var eye = this.state.previewFlag ? 'fa fa-eye-slash fa-4x' : 'fa fa-eye fa-4x';

    return (
      <div className="center-xs middle-xs">
        <div>{this.state.markdown}</div>

        <TextField
          ref="inputMessage"
          multiLine={true}
          disabled={disabledInput}
          onChange={this.onChangeMessages}
          hintText="Enter Messages"
          floatingLabelText="Message"
          setValue={this.state.text} />

        <IconButton
          onClick={this.onPreviewClick}
          disabled={disabledButton}
          iconClassName={eye}
          tooltip="Send Message" />

        <IconButton
          onClick={this.handleClick}
          disabled={disabledButton}
          iconClassName="fa fa-send fa-4x"
          tooltip="Send Message" />
      </div>
    );
  },

  handleClick: function(e) {
    e.preventDefault();

    var message = {
      userId: {_id: this.props.user._id, local: {email: this.props.user.local.email}},
      roomId: this.props.room._id,
      message: this.state.message
    };
    ChatAction.creatingMessage(message);

    this.refs.inputMessage.clearValue();

    this.setState({
      markdown: false,
      previewFlag: false
    });
  },

  onChangeMessages: function(e) {
    var markdown = this.state.previewFlag ? <Markdown source={e.target.value} /> : false;

    this.setState({
      message: e.target.value,
      markdown: markdown
    });
  },

  onPreviewClick: function() {
    var previewFlag = this.state.previewFlag ? false : true;
    var markdown = previewFlag ? <Markdown source={this.state.message} /> : false;

    this.setState({
      previewFlag: previewFlag,
      markdown: markdown
    });
  }
});

module.exports = MessageInput;
