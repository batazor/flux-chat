const React = require("react");
const PropTypes = require("prop-types");
const ReactEmoji = require("react-emoji");
const Markdown = require("react-remarkable");
const _ = require("underscore");

const mui = require("material-ui");
const ChatAction = require("../../actions/ChatAction.jsx");

const { IconButton } = mui;
const { TextField } = mui;

const MessageInput = React.createClass({
  mixins: [ReactEmoji],

  propTypres: {
    room: PropTypes.object,
    user: PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      message: "",
      previewFlag: false,
      markdown: false,
    };
  },

  render() {
    const disabledInput = !!_.isUndefined(this.props.room);
    const disabledButton = this.state.message === "";

    const eye = this.state.previewFlag
      ? "fa fa-eye-slash fa-4x"
      : "fa fa-eye fa-4x";

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
            defaultValue={this.state.text}
          />

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

  handleSubmit(e) {
    e.preventDefault();

    const message = {
      userId: { _id: this.props.user._id },
      roomId: this.props.room._id,
      message: this.state.message,
    };
    ChatAction.creatingMessage(message);

    this.refs.inputMessage.clearValue();

    this.setState({
      message: "",
      markdown: false,
      previewFlag: false,
    });
  },

  onChangeMessages(e) {
    const markdown = this.state.previewFlag ? (
      <Markdown>{this.emojify(e.target.value)}</Markdown>
    ) : (
      false
    );

    this.setState({
      message: e.target.value,
      markdown,
    });
  },

  onPreviewClick() {
    const previewFlag = !this.state.previewFlag;
    const markdown = previewFlag ? (
      <Markdown>{this.emojify(this.state.message)}</Markdown>
    ) : (
      false
    );

    this.setState({
      previewFlag,
      markdown,
    });
  },
});

module.exports = MessageInput;
