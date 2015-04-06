var React = require('react');

var Footer = React.createClass({
  propTypes: {
    copyright: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      copyright: '© 2015 NodeJS-Chat'
    };
  },
  render: function() {
    return (
      <footer id="footer" className="page-footer red darken-1">
        <div className="footer-copyright">
          <div className="container row">
            { this.props.copyright }
            <a className="grey-text text-lighten-4 offset-s1 right" href="http://batazor.ru/">batazor.ru</a>
            <a className="grey-text text-lighten-4 offset-s1 right" href="https://github.com/batazor">github.com</a>
            <a className="grey-text text-lighten-4 offset-s1 right" href="http://vk.com/batazor">vk.com</a>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
