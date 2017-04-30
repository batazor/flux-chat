var React = require('react');
var ReactEmoji = require('react-emoji');
var Markdown = require('react-remarkable');
var ChatAction = require('../../actions/ChatAction.jsx');
var _ = require('underscore');

var mui = require('material-ui');
var IconButton = mui.IconButton;
var TextField = mui.TextField;

var MessageInput = React.createClass({

  mixins: [ReactEmoji],

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
      <div className="center-xs bottom-xs">
        <div className="markdown">{this.state.markdown}</div>

        <form onSubmit={this.handleSubmit}>
          <TextField
            ref="inputMessage"
            multiLine={false}
            disabled={disabledInput}
            onChange={this.onChangeMessages}
            hintText="Enter Messages"
            floatingLabelText="Message"
            defaultValue={this.state.text} />

          <IconButton
            onClick={this.onPreviewClick}
            disabled={disabledButton}
            iconClassName={eye}
          />

          <IconButton
            disabled={disabledButton}
            iconClassName="fa fa-send fa-4x"
          />
        </form>

      </div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var message = {
      userId: {_id: this.props.user._id},
      roomId: this.props.room._id,
      message: this.state.message
    };
    ChatAction.creatingMessage(message);

    this.refs.inputMessage.clearValue();

    this.setState({
      message: '',
      markdown: false,
      previewFlag: false
    });
  },

  onChangeMessages: function(e) {
    var markdown = this.state.previewFlag ? <Markdown>{this.emojify(e.target.value)}</Markdown> : false;

    this.setState({
      message: e.target.value,
      markdown: markdown
    });
  },

  onPreviewClick: function() {
    var previewFlag = this.state.previewFlag ? false : true;
    var markdown = previewFlag ? <Markdown>{this.emojify(this.state.message)}</Markdown> : false;

    this.setState({
      previewFlag: previewFlag,
      markdown: markdown
    });
  }
});

module.exports = MessageInput;
