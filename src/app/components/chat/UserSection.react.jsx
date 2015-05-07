var React = require('react');

var UserSection = React.createClass({
  render: function() {
    return (
      <div className="col-xs chat-app room-section">
        <div className="row center-xs chat-header">
          <h2 className="room-name">User section</h2>
        </div>
      </div>
    );
  }
});

module.exports = UserSection;
