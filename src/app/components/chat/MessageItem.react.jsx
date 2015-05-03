var React = require('react');
var _ = require('underscore');

var mui = require('material-ui');
var IconButton = mui.IconButton;
var Paper = mui.Paper;

var MessageItem = React.createClass({

  propTypes: {
    message: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  },

  render: function() {

    var date = new Date(this.props.message.createAt).toLocaleString();
    var disabled = this.props.message.isCreated ? false : true;
    var style = this.props.user.local.email === this.props.message.userId.local.email ? 'col-xs-offset-2 col-xs-10' : 'col-xs-10';

    return (
      <div className="row">
        <Paper zDepth={1} className={style}>
          <div className="box">
            <div className="row">
              <div className="col-xs-2">
                <div className="box">
                  <IconButton
                    disabled={disabled}
                    mini={true}
                    iconClassName="fa fa-user-secret fa-4x" />
                </div>
              </div>

              <div  className="col-xs-10">
                <div className="box start-xs">
                  <header>{this.props.message.userId.local.email} | {date}</header>
                  <p>{this.props.message.message}</p>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }

});

module.exports = MessageItem;
