const React = require('react');
const _ = require('underscore');

const mui = require('material-ui');
const UserOnlineStore = require('../../stores/UserOnlineStore.jsx');

const { FlatButton } = mui;

const getUserOnlineIcon = function (user) {
  return (
    <FlatButton className="center-xs" mini key={user._id}>
      <img src={user.avatar} />
    </FlatButton>
  );
};

const UserSection = React.createClass({

  getInitialState() {
    return {
      user: UserOnlineStore.getUserOnline(),
    };
  },

  componentDidMount() {
    UserOnlineStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    UserOnlineStore.removeChangeListener(this._onChange);
  },

  render() {

    const UserOnlineItems = _.map(this.state.user, getUserOnlineIcon);

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

  _onChange() {
    if (this.isMounted()) {
      this.setState({
        user: UserOnlineStore.getUserOnline(),
      });
    }
  },

});

module.exports = UserSection;
