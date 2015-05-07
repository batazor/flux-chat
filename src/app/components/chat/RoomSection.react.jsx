var React = require('react');
var _ = require('underscore');
var RoomStore = require('../../stores/RoomStore.jsx');
var ChatAction = require('../../actions/ChatAction.jsx');

var mui = require('material-ui');
var Dialog = mui.Dialog;
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var Menu = mui.Menu;

var RoomSection = React.createClass({

  getInitialState: function() {
    return {
      modal: false,
      nameRoom: "",
      rooms: RoomStore.getAll(),
      roomsAction: false
    };
  },

  componentDidMount: function() {
    ChatAction.initRoom();
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
        var lastMessage = room.lastMessage ? 'wrote: ' + room.lastMessage.author.nickname : undefined;

        roomListItems.push({
          payload: room._id,
          text: room.name,
          data: lastMessage,
          disabled: disabled,
          type: active
        });
      });
    }

    return (
      <div className="col-xs chat-app room-section">
        <div className="row center-xs chat-header">
          <h2 className="room-name">Rooms</h2>
          <RaisedButton
            label="ADD ROOM"
            onTouchTap={this.addRoomDialogOpen} />
        </div>
        <div className="row container">
          <div className="col-xs scrollbar">
            <div className="scrollbar-box rtl">
              <div className="row">
                <Menu
                  autoWidth={false}
                  onItemClick={this.clickRoom}
                  menuItems={roomListItems} />
              </div>
            </div>
          </div>
        </div>

        <Dialog
          ref="addRoomDialog"
          title="Add Room"
          actions={addRoomDialogActions}
          modal={this.state.modal}
          className="col-xs-5" >

          <TextField
            ref="nameRoomDialog"
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

    ChatAction.creatingRoom(this.state.nameRoom);

    this.refs.nameRoomDialog.clearValue();
  },

  onChangeNameRoom: function(e) {
    this.setState({ nameRoom: e.target.value });
  },

  // Click Room ================================================================
  clickRoom: function(e, selectedIndex, menuItem) {
    ChatAction.clickRoom({ open: menuItem.payload, close: this.state.roomsAction });
    this._updateLastRoom(menuItem.payload);
  },

  _updateLastRoom: function(roomId) {
    this.setState({
      roomsAction: roomId
    });
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
