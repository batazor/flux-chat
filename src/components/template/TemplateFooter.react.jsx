var React = require('react');
var jade = require('react-jade');

var template = jade.compileFile(__dirname + '/__footer.jade');

var TemplateFooter = React.createClass({
  render: function() {
    return (
      template()
    );
  }
});

module.exports = TemplateFooter;
