var React = require('react');
var jade = require('react-jade');

var template = jade.compileFile(__dirname + '/__header.jade');

var TemplateHeader = React.createClass({
  render: function() {
    return (
      template()
    );
  }
});

module.exports = TemplateHeader;
