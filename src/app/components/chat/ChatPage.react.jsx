var React = require('react');
var RoomSection = require('./RoomSection.react.jsx');

var ChatPage = React.createClass({
  render: function() {
    return (
      <div className="row">

        <div className="col-xs-3">
          <RoomSection />
        </div>

        <div className="col-xs-6">MessageSection</div>

        <div className="col-xs-3">UserSection</div>
      </div>
    );
  }
});

module.exports = ChatPage;
