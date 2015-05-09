var React = require('react');
var DocumentTitle = require('react-document-title');

var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var WelcomePage = React.createClass({
  render: function() {
    return (
      <DocumentTitle title='Welcome | Flux • Chat'>
        <div>
          <h1 className="row center-xs">Chat on Node.js</h1>
          <div className="row center-xs">

            <FlatButton
              className="btn btn-local"
              linkButton={true}
              href="/#/login"
              label="Local Login" />
            <FlatButton
              className="btn btn-signup"
              linkButton={true}
              href="/#/signup"
              label="Local Signup" />
            <FlatButton
              className="btn btn-facebook"
              linkButton={true}
              href="/auth/facebook"
              label="Facebook" />
            <FlatButton
              className="btn btn-twitter"
              linkButton={true}
              href="/auth/twitter"
              label="Twitter" />
            <FlatButton
              className="btn btn-google"
              linkButton={true}
              href="/auth/google"
              label="Google" />
            <FlatButton
              className="btn btn-github"
              linkButton={true}
              href="/auth/github"
              label="Github" />
            <FlatButton
              className="btn btn-vk"
              linkButton={true}
              href="/auth/vkontakte"
              label="VK" />

          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = WelcomePage;
