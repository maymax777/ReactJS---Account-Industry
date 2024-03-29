import React, { Component } from "react";
import {
  Avatar,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Typography
} from "@material-ui/core";
import { connect } from "react-redux";
import * as authActions from "app/auth/store/actions";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

class UserMenu extends Component {
  state = {
    userMenu: null
  };

  userMenuClick = event => {
    this.setState({ userMenu: event.currentTarget });
  };

  userMenuClose = () => {
    this.setState({ userMenu: null });
  };

  render() {
    const { user, logout } = this.props;
    const { userMenu } = this.state;
    return (
      <React.Fragment>
        <Button className="h-64" onClick={this.userMenuClick}>
          {user.avatar
            ? <Avatar className="" alt="user photo" src={user.avatar} />
            : <Avatar className="">{user.username}</Avatar>
          }

          <div className="hidden md:flex flex-col ml-12 items-start">
            <Typography className="text-11 capitalize" color="textSecondary">
              {user.username || ''}
            </Typography>
          </div>

          <Icon className="text-16 ml-12 hidden sm:flex" variant="action">
            keyboard_arrow_down
          </Icon>
        </Button>

        <Popover
          open={Boolean(userMenu)}
          anchorEl={userMenu}
          onClose={this.userMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          classes={{
            paper: "py-8"
          }}
        >
          {/* {user.role === "guest" ? ( */}
            <React.Fragment>
              <MenuItem component={Link} to="/login">
                <ListItemIcon>
                  <Icon>lock</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Login" />
              </MenuItem>
              <MenuItem component={Link} to="/register">
                <ListItemIcon>
                  <Icon>person_add</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Register" />
              </MenuItem>

              <MenuItem
                component={Link}
                to={"/profile/" + user.user_id}
                onClick={this.userMenuClose}
              >
                <ListItemIcon>
                  <Icon>account_circle</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="My Profile" />
              </MenuItem>
              <MenuItem
                component={Link}
                to="/chat"
                onClick={this.userMenuClose}
              >
                <ListItemIcon>
                  <Icon>mail</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Inbox" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  console.log(user);
                  this.userMenuClose();
                }}
              >
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Logout" />
              </MenuItem>
            </React.Fragment>
          ) 
          {/* : (
              <React.Fragment></React.Fragment>
            )} */}
        </Popover>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: authActions.logoutUser
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu);
