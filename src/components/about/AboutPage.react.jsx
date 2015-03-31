var React = require('react');
var jade = require('react-jade');

var template = jade.compileFile(__dirname + '/index.jade');

var AboutPage = React.createClass({
  render: function() {
    return (
      template()
    );
  }
});

module.exports = AboutPage;
