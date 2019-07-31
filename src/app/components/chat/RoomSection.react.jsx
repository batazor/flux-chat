const React = require("react");
const _ = require("underscore");
const mui = require("material-ui");
const RoomStore = require("../../stores/RoomStore.jsx");
const ChatAction = require("../../actions/ChatAction.jsx");

const { FlatButton } = mui;
const { Dialog } = mui;
const { RaisedButton } = mui;
const { TextField } = mui;
const { Menu } = mui;
const { MenuItem } = mui;

const RoomSection = React.createClass({
  getInitialState() {
    return {
      modal: false,
      nameRoom: "",
      rooms: RoomStore.getAll(),
      roomsAction: false,
      openModal: false,
    };
  },

  componentDidMount() {
    ChatAction.initRoom();
    RoomStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    RoomStore.removeChangeListener(this._onChange);
  },

  render() {
    const addRoomDialogActions = [
      <FlatButton label="Cancel" primary onTouchTap={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.addRoomDialogSubmit}
      />,
    ];

    const roomListItems = [];
    if (this.state.rooms.length) {
      _.map(this.state.rooms, room => {
        const disabled = !room.isCreated;
        const active = room.isCurrent ? mui.MenuItem.Types.SUBHEADER : "";
        const lastMessage = room.lastMessage
          ? `wrote: ${room.lastMessage.author.nickname}`
          : undefined;

        roomListItems.push({
          payload: room._id,
          text: room.name,
          data: lastMessage,
          disabled,
          type: active,
        });
      });
    }

    return (
      <div className="col-xs chat-app room-section">
        <div className="row center-xs chat-header">
          <h2 className="room-name">Rooms</h2>
          <RaisedButton label="ADD ROOM" onTouchTap={this.addRoomDialogOpen} />
        </div>
        <div className="row container">
          <div className="col-xs scrollbar">
            <div className="scrollbar-box rtl">
              <div className="row">
                <Menu autoWidth={false} onClick={this.clickRoom}>
                  {roomListItems.map(item => (
                    <MenuItem primaryText={item} />
                  ))}
                </Menu>
              </div>
            </div>
          </div>
        </div>

        <Dialog
          ref="addRoomDialog"
          title="Add Room"
          actions={addRoomDialogActions}
          modal={this.state.modal}
          open={this.state.openModal}
          className="col-xs-5"
        >
          <TextField
            ref="nameRoomDialog"
            onChange={this.onChangeNameRoom}
            hintText="Name Room"
            floatingLabelText="Name Room"
          />
        </Dialog>
      </div>
    );
  },

  // New Room ==================================================================
  addRoomDialogOpen() {
    this.setState({ addRoomDialog: true });
  },

  addRoomDialogSubmit() {
    this.refs.addRoomDialog.dismiss();

    ChatAction.creatingRoom(this.state.nameRoom);

    this.refs.nameRoomDialog.clearValue();
  },

  onChangeNameRoom(e) {
    this.setState({ nameRoom: e.target.value });
  },

  // Click Room ================================================================
  clickRoom(e, selectedIndex, menuItem) {
    ChatAction.clickRoom({
      open: menuItem.payload,
      close: this.state.roomsAction,
    });
    this._updateLastRoom(menuItem.payload);
  },

  _updateLastRoom(roomId) {
    this.setState({
      roomsAction: roomId,
    });
  },

  _onChange() {
    if (this.isMounted()) {
      this.setState({
        modal: false,
        nameRoom: "",
        rooms: RoomStore.getAll(),
      });
    }
  },
});

module.exports = RoomSection;
