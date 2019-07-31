const React = require("react");
const DocumentTitle = require("react-document-title");
const mui = require("material-ui");
const AuthActions = require("../../actions/AuthActions.jsx");
const AuthStore = require("../../stores/AuthStore.jsx");

const { FlatButton } = mui;

const WelcomePage = React.createClass({
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
    const hiddenIcon = this.state.session._id ? "none" : "flex";
    const style = { display: hiddenIcon };

    return (
      <DocumentTitle title="Welcome | Flux • Chat">
        <div>
          <h1 className="row center-xs">Chat on Node.js</h1>
          <div className="row center-xs">
            <FlatButton
              className="btn btn-local"
              href="/#/login"
              label="Local Login"
            />
            <FlatButton
              className="btn btn-signup"
              href="/#/signup"
              label="Local Signup"
            />
            <FlatButton
              className="btn btn-facebook"
              href="/auth/facebook"
              label="Facebook"
            />
            <FlatButton
              className="btn btn-twitter"
              href="/auth/twitter"
              label="Twitter"
            />
            <FlatButton
              className="btn btn-google"
              href="/auth/google"
              label="Google"
            />
            <FlatButton
              className="btn btn-github"
              href="/auth/github"
              label="Github"
            />
            <FlatButton
              className="btn btn-vk"
              href="/auth/vkontakte"
              label="VK"
            />
          </div>
        </div>
      </DocumentTitle>
    );
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState({ session: AuthStore.getSession() });
    }
  },
});

module.exports = WelcomePage;
