var React = require('react');
var DocumentTitle = require('react-document-title');
var AuthActions = require('../../actions/AuthActions.jsx');
var AuthStore = require('../../stores/AuthStore.jsx');

var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var ProfilePage = React.createClass({
  getInitialState: function() {
    return {
      user: AuthStore.getSession()
    };
  },

  componentDidMount: function() {
    AuthActions.initSession();
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="row center-xs">
        <div className="col-xs-12">
          <h1>Profile</h1>
        </div>
        <div className="col s4">
          <div className="box">
            <h3 className="row center-xs">Local Account</h3>

            <div className="row">
              <div className="box">
                <p>
                  <strong>id: </strong> {this.state.user._id}
                </p>
                <p>
                  <strong>nickname: </strong> {this.state.user.nickname}
                </p>
              </div>
            </div>

            <div className="row">
              <FlatButton label="Update" />
              <FlatButton label="Delete" />
            </div>
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
      this.setState({ session: AuthStore.getSession() });
    if (this.isMounted()) {

      if (!this.state.session._id)
        return window.location.replace("/#/login");
    }
  }
});

module.exports = ProfilePage;
