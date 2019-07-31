const React = require('react');

const mui = require('material-ui');

const { Toolbar } = mui;
const { FlatButton } = mui;
const { ToolbarGroup } = mui;

const Footer = React.createClass({
  render() {
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
  },
});

module.exports = Footer;
