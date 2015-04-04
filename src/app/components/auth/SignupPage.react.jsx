var React = require('react');

var SignupPage = React.createClass({
  propsTypes: {
    form: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      form: {
        _action: '/signup',
        button: 'Signup',
        link: {
          name: 'Login',
          url: '/login'
        }
      },
      text: '123'
    };
  },
  render: function() {
    return (
      <div>
        123
      </div>
    );
  }
});

module.exports = SignupPage;
