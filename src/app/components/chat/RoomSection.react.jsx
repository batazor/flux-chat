var React = require('react');
var _ = require('underscore');
var RoomStore = require('../../stores/RoomStore.jsx');
var RoomAction = require('../../actions/RoomAction.jsx');

var mui = require('material-ui');
var Dialog = mui.Dialog;
var FlatButton = mui.FlatButton;
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var Menu = mui.Menu;

var RoomSection = React.createClass({

  getInitialState: function() {
    return {
      modal: false,
      nameRoom: "",
      rooms: RoomStore.getAll()
    };
  },

  componentDidMount: function() {
    RoomAction.initRoom();
    RoomStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RoomStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var addRoomDialogActions = [
      { text: 'Cancel' },
      { text: 'Submit', onClick: this.addRoomDialogSubmit }
    ];

    var roomListItems = [];
    if (this.state.rooms.length) {
      _.map(this.state.rooms, function(room) {
        var disabled = room.isCreated ? false : true;
        var active = room.isCurrent ? mui.MenuItem.Types.SUBHEADER : '';

        roomListItems.push({
          payload: room._id,
          text: room.name,
          data: room.lastMessage,
          disabled: disabled,
          type: active
        });
      });
    }

    return (
      <div>
        <div className="row middle-xs">
          <h1>Rooms</h1>
          <RaisedButton
            label="ADD ROOM"
            onTouchTap={this.addRoomDialogOpen} />
        </div>
        <div className="row">
          <Menu
            autoWidth={false}
            onItemClick={this.clickRoom}
            menuItems={roomListItems} />
        </div>

        <Dialog
          ref="addRoomDialog"
          title="Add Room"
          actions={addRoomDialogActions}
          modal={this.state.modal}>

          <TextField
            onChange={this.onChangeNameRoom}
            hintText="Name Room"
            floatingLabelText="Name Room" />

        </Dialog>
      </div>
    );
  },

  // New Room ==================================================================
  addRoomDialogOpen: function() {
    this.refs.addRoomDialog.show();
  },

  addRoomDialogSubmit: function() {
    this.refs.addRoomDialog.dismiss();

    RoomAction.creatingRoom(this.state.nameRoom);

    this.setState({ nameRoom: null });
  },

  onChangeNameRoom: function(e) {
    this.setState({ nameRoom: e.target.value });
  },

  // Click Room ================================================================
  clickRoom: function(e, selectedIndex, menuItem) {
    RoomAction.clickRoom(menuItem.payload);
  },

  _onChange: function() {
    if (this.isMounted()) {
      this.setState({
        modal: false,
        nameRoom: "",
        rooms: RoomStore.getAll()
      });
    }
  }

});

module.exports = RoomSection;
