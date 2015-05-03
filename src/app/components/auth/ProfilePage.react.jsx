var React = require('react');
var AuthActions = require('../../actions/AuthActions.jsx');
var AuthStore = require('../../stores/AuthStore.jsx');

var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var ProfilePage = React.createClass({
  getInitialState: function() {
    AuthActions.initSession();

    return {
      session: AuthStore.getSession()
    };
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="row center-xs">
        <div className="col s4">
          <div className="box">
            <h3 className="row center-xs">Local Account</h3>

            <div className="row">
              <div className="box">
                <p>
                  <strong>id: </strong> {this.state.session._id}
                </p>
                <p>
                  <strong>email: </strong> {this.state.session.local.email}
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
    if (this.isMounted()) {
      this.setState({ session: AuthStore.getSession() });
      
      if (!this.state.session._id)
        return window.location.replace("/#/login");
    }
  }
});

module.exports = ProfilePage;
