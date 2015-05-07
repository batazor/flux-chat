var React = require('react');
var UserOnlineStore = require('../../stores/UserOnlineStore.jsx');
var _ = require('underscore');

var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var getUserOnlineIcon = function(user) {
  return (
    <FlatButton className="center-xs" mini={true} key={user._id}>
      <img src={user.avatar} />
    </FlatButton>
  );
};

var UserSection = React.createClass({

  getInitialState: function() {
    return {
      user: UserOnlineStore.getUserOnline()
    };
  },

  componentDidMount: function() {
    UserOnlineStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserOnlineStore.removeChangeListener(this._onChange);
  },

  render: function() {

    var UserOnlineItems = _.map(this.state.user, getUserOnlineIcon);

    return (
      <div className="col-xs chat-app user-section">
        <div className="row center-xs chat-header">
          <div className="col-xs">
            <h2>User online</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs">
            {UserOnlineItems}
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState({
        user: UserOnlineStore.getUserOnline()
      });
    }
  }

});

module.exports = UserSection;
