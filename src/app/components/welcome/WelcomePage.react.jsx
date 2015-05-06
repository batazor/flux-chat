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
            <FlatButton linkButton={true} href="/#/login" label="Local Login" />
            <FlatButton linkButton={true} href="/#/signup" label="Local Signup" />
            <FlatButton linkButton={true} href="/auth/facebook" label="Facebook" />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = WelcomePage;
