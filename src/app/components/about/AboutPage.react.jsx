var React = require('react');
var DocumentTitle = require('react-document-title');

var AboutPage = React.createClass({
  render: function() {
    return (
      <DocumentTitle title='About | Flux • Chat'>
        <h1 className="row center-xs">About</h1>
      </DocumentTitle>
    );
  }
});

module.exports = AboutPage;
