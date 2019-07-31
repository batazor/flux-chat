const React = require("react");
const DocumentTitle = require("react-document-title");
const AuthActions = require("../../actions/AuthActions.jsx");
const AuthStore = require("../../stores/AuthStore.jsx");
const RoomSection = require("./RoomSection.react.jsx");
const MessageSection = require("./MessageSection.react.jsx");
const UserSection = require("./UserSection.react.jsx");

const ChatPage = React.createClass({
  getInitialState() {
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
    return (
      <DocumentTitle title="Chat | Flux • Chat">
        <div className="row chat">
          <div className="col-xs-3 chat">
            <RoomSection />
          </div>

          <div className="col-xs-6 chat">
            <MessageSection />
          </div>

          <div className="col-xs-3 chat">
            <UserSection />
          </div>
        </div>
      </DocumentTitle>
    );
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState({ session: AuthStore.getSession() });

      if (!this.state.session._id) {
        return window.location.replace("/#/login");
      }
    }
  },
});

module.exports = ChatPage;
