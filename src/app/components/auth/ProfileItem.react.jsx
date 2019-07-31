const React = require("react");
const PropTypes = require("prop-types");
const _ = require("underscore");

const mui = require("material-ui");

const { IconButton } = mui;
const { RaisedButton } = mui;
const { FontIcon } = mui;
const { Paper } = mui;

const Connect = function (icon, title, url) {
  const link = url === "local" ? "/#/connect/local" : `/connect/${url}`;

  return (
    <RaisedButton style={{ padding: "5px" }} secondary href={link}>
      <FontIcon style={{ padding: "8px", color: "white" }} className={icon} />
      <span style={{ padding: "8px", color: "white", fontSize: "17px" }}>
        CONNECT
      </span>
    </RaisedButton>
  );
};

const Detail = function (icon, profile, url) {
  const link = `/unlink/${url}`;

  const style = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const data = [];
  _.each(profile, (el, key) => {
    data.push(
      <p style={style} key={data.length}>
        <strong>
          {key}
:
          {' '}
        </strong>
        {' '}
        {el}
      </p>,
    );
  });

  return (
    <div>
      {data}

      <RaisedButton style={{ padding: "5px" }} secondary href={link}>
        <FontIcon style={{ padding: "8px", color: "white" }} className={icon} />
        <span style={{ padding: "8px", color: "white", fontSize: "17px" }}>
          UNLINK
        </span>
      </RaisedButton>
    </div>
  );
};

const ProgileItem = React.createClass({
  propTypes: {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    profile: PropTypes.object,
  },

  render() {
    let profile;
    if (_.isUndefined(this.props.profile)) {
      profile = Connect(this.props.icon, this.props.title, this.props.url);
    } else if (
      _.isUndefined(this.props.profile.token || this.props.url === "local")
    ) {
      profile = Connect(this.props.icon, this.props.title, this.props.url);
    } else {
      profile = Detail(this.props.icon, this.props.profile, this.props.url);
    }

    return (
      <Paper zDepth={1} className="col-xs-6">
        <h4 className="row center-xs middle-xs">
          <IconButton iconClassName={this.props.icon} />
          {this.props.title}
        </h4>

        <div className="row" style={{ marginBottom: "30px" }}>
          <div className="col-xs">
            <div className="box">{profile}</div>
          </div>
        </div>
      </Paper>
    );
  },
});

module.exports = ProgileItem;
