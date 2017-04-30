var React = require('react');

var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var FlatButton = mui.FlatButton;
var ToolbarGroup = mui.ToolbarGroup;

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="page-footer">
        <Toolbar>
          <ToolbarGroup>
            <h3>© 2015 Flux • Chat</h3>
          </ToolbarGroup>

          <ToolbarGroup>
            <FlatButton href="http://batazor.ru/" label="batazor.ru" />
            <FlatButton href="https://github.com/batazor" label="github.com" />
            <FlatButton href="http://vk.com/batazor" label="vk.com" />
          </ToolbarGroup>
        </Toolbar>
      </footer>
    );
  }
});

module.exports = Footer;
