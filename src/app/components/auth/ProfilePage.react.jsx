var React = require('react');
var AuthActions = require('../../actions/AuthActions.jsx');
var AuthStore = require('../../stores/AuthStore.jsx');

var ProfilePage = React.createClass({
  getInitialState: function() {
    AuthActions.initSession();

    return {
      session: AuthStore.getSession()
    };
  },

  componentDidMount: function() {
    if (!this.state.session._id)
      return window.location.replace("/#/login");

    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className="row valign-wrapper">
        <div className="col s4">
          <div className="card valign blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Local Account</span>
            </div>
            <div className="card-content white-text">
              <p>
                <strong>id: </strong> {this.state.session._id}
              </p>
              <p>
                <strong>email: </strong> {this.state.session.local.email}
              </p>
            </div>
            <div className="card-content white-text">
              <a>Update</a>
              <a>Delete</a>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState({ session: AuthStore.getSession() });
    }
  }
});

module.exports = ProfilePage;
