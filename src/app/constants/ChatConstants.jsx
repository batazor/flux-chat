const keyMirror = require("fbjs/lib/keyMirror");

// Define action constants
module.exports = keyMirror({
  INIT_ROOM: null,
  ADD_ROOM: null,
  CREATING_ROOM: null,
  CREATED_ROOM: null,
  CLICKING_ROOM: null,
  UPDATED_ROOM: null,

  INIT_MESSAGE: null,
  CREATING_MESSAGE: null,
  CREATED_MESSAGE: null,

  UPDATE_USER: null
});
