const React = require('react');
const DocumentTitle = require('react-document-title');
const mui = require('material-ui');
const ProfileItem = require('./ProfileItem.react.jsx');
const AuthActions = require('../../actions/AuthActions.jsx');
const AuthStore = require('../../stores/AuthStore.jsx');


const { IconButton } = mui;
const { FlatButton } = mui;

const ProfilePage = React.createClass({
  getInitialState() {
    AuthActions.initSession();

    return {
      session: AuthStore.getSession(),
    };
  },

  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  },

  render() {
    const containerStyle = {
      'position': 'relative',
      'width': '100%',
      'height': '100%',
      'minHeight': '100%',
      'margin': '0',
      'padding': '0',
    };
    const scrolllBarStyle = {
      'position': 'absolute',
      'height': '100%',
      'width': '100%',
      'margin': '0',
      'padding': '0',
    };
    const scrollBarBoxStyle = {
      'width': '100%',
      'height': '100%',
      'overflowY': 'auto',
      'overflowX': 'hidden',
    };
    const style = {
      'height': 'calc(100% - 56px)',
      'width': '100%',
      'margin': '0',
      'padding': '0',
    };

    return (
      <DocumentTitle title="Profile | Flux • Chat">
        <div className="row" style={style}>
          <div className="col-xs" style={style}>
            <div className="row" style={containerStyle}>
              <div className="col-xs" style={scrolllBarStyle}>
                <div style={scrollBarBoxStyle}>
                  <div className="row center-xs">

                    <div className="col-xs-12">
                      <h1>Profile</h1>
                    </div>

                    <div className="col-xs">
                      <div className="box">

                        <div className="row">
                          <div className="col-xs">
                            <div className="box">
                              <img
                                src={this.state.session.avatar}
                                className="avatar"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-xs">
                            <div className="box">
                              <p>
                                <strong>id: </strong>
                                {' '}
                                {this.state.session._id}
                              </p>
                              <p>
                                <strong>nickname: </strong>
                                {' '}
                                {this.state.session.nickname}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-xs">
                            <div className="box">
                              <FlatButton label="Update" />
                              <FlatButton label="Delete" />
                            </div>
                          </div>
                        </div>

                        <div className="row" style={{ "margin": "20px 0px" }}>

                          <ProfileItem
                            icon="fa fa-user fa-3x"
                            title="Local User"
                            url="local"
                            profile={this.state.session.local}
                          />

                          <ProfileItem
                            icon="fa fa-facebook fa-3x"
                            title="Facebook"
                            url="facebook"
                            profile={this.state.session.facebook}
                          />

                          <ProfileItem
                            icon="fa fa-twitter fa-3x"
                            title="Twitter"
                            url="twitter"
                            profile={this.state.session.twitter}
                          />

                          <ProfileItem
                            icon="fa fa-google-plus fa-3x"
                            title="Google"
                            url="google"
                            profile={this.state.session.google}
                          />

                          <ProfileItem
                            icon="fa fa-github fa-3x"
                            title="Github"
                            url="github"
                            profile={this.state.session.github}
                          />

                          <ProfileItem
                            icon="fa fa-vk fa-3x"
                            title="Vkontakte"
                            url="vkontakte"
                            profile={this.state.session.vkontakte}
                          />

                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState({ session: AuthStore.getSession() });

      if (!this.state.session._id) { return window.location.replace("/#/login"); }
    }
  },
});

module.exports = ProfilePage;
