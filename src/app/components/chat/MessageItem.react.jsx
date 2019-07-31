const React = require('react');
const PropTypes = require('prop-types');
const ReactEmoji = require('react-emoji');
const Markdown = require('react-remarkable');

// var ReactIntl = require('react-intl');
// var IntlMixin = ReactIntl.IntlMixin;
// var FormattedRelative = ReactIntl.FormattedRelative;

const mui = require('material-ui');

const { FlatButton } = mui;
const { Paper } = mui;

const MessageItem = React.createClass({

  mixins: [ReactEmoji],

  propTypes: {
    message: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  },

  render() {

    const date = new Date(this.props.message.createAt).toLocaleString();
    const disabled = !this.props.message.isCreated;
    const style = this.props.user._id === this.props.message.userId._id ? 'col-xs-offset-2 col-xs-10' : 'col-xs-10';
    const message = this.emojify(this.props.message.message);

    return (
      <div className="row">
        <Paper zDepth={1} className={style}>
          <div className="box">
            <header className="row">
              <div className="col-xs">
                <div className="box">
                  <img
                    src={this.props.message.userId.avatar}
                    className="avatar"
                  />
                  {this.props.message.userId.nickname}
                  {' '}
|
                  <FormattedRelative value={date} />
                </div>
              </div>
            </header>
            <div className="row">
              <div className="col-xs">
                <div className="box start-xs markdown">
                  <Markdown>
                    {message}
                  </Markdown>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  },

});

module.exports = MessageItem;
