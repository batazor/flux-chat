const React = require('react');
const DocumentTitle = require('react-document-title');

const AboutPage = React.createClass({
  render() {
    return (
      <DocumentTitle title="About | Flux • Chat">
        <h1 className="row center-xs">About</h1>
      </DocumentTitle>
    );
  },
});

module.exports = AboutPage;
