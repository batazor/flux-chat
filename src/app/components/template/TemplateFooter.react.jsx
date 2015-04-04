var React = require('react');
var Link = require('./Link.react.jsx');

var TemplateFooter = React.createClass({
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
            <Link />
            <Link />
            <Link />
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = TemplateFooter;
