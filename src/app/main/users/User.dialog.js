import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'app/auth/store/actions';
import {
  Icon, IconButton, Button, TextField, Grid,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem
} from '@material-ui/core';
import Validations from '../../helper/Validations'
import { NotificationManager } from 'react-notifications';
class UserDialog extends React.Component {
  state = {
    open: false,
    type: '',
    branchs: [],
    roles: [],
    row: {
      username: '',
      useremail: '',
      branch_Id: '',
      emp_Id: '',
      password: '',
      passwordConfirm: '',
      status: '',
    },
  };
  async componentDidMount() {
    this.setState({ row: this.props.row, type: this.props.type, branchs: this.props.branchs, roles: this.props.roles });
  }
  handleClickOpen = () => {
    this.setState({ open: true, row: this.props.row, type: this.props.type });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleAllClose = () => {
    const { row } = this.state;
    if (!Validations.IntegerValidation(row.roll_Id)) {
      NotificationManager.error("Please check role", "Role");
    } else if (!Validations.IntegerValidation(row.branch_Id)) {
      NotificationManager.error("Please check branch", "Branch");
    } else if (!Validations.IntegerValidation(row.emp_Id)) {
      NotificationManager.error("Please check employee", "Employee");
    } else if (!row.username) {
      NotificationManager.error("Please check your name", "Full Name");
    } else if (!Validations.EmailValidation(row.useremail)) {
      NotificationManager.error("Please check your email", "Email");
    } else if (row.password !== row.confirmPassword) {
      NotificationManager.error("Please check your password", "Password");
    } else {
      this.setState({ open: false });
      this.props.onSave(this.state.row, this.state.type);
    }
  };

  handleChange = name => event => {
    var cursor = this.state.row;
    switch (name) {
      default:
        cursor[name] = event.target.value;
    }
    this.setState({ row: cursor });
  }
  render() {
    const { onRemove, roles, branchs } = this.props;
    const { row } = this.state
    return (
      <div>
        {this.state.type === 'edit' &&
          <div className="flex">
            <IconButton onClick={(ev) => {
              ev.stopPropagation();
              this.handleClickOpen();
            }}>
              <Icon>edit_attributes</Icon>
            </IconButton>
            <IconButton onClick={(ev) => {
              ev.stopPropagation();
              if (window.confirm('Are you sure to remove this product?')) {
                onRemove(this.state.row);
              }
            }}>
              <Icon type="small">delete</Icon>
            </IconButton>
          </div>
        }
        {this.state.type === 'add' &&
          <div className="flex items-center justify-end">
            <Button className="normal-case" variant="contained" color="primary" onClick={(ev) => {
              ev.stopPropagation();
              this.handleClickOpen();
            }}>Add User</Button>
          </div>
        }
        <Dialog
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" >Edit User Information</DialogTitle>
          <DialogContent>
            {this.state.type === 'add'
              ? <DialogContentText >
                {'To create user, please enter description here.'}
              </DialogContentText>
              : <DialogContentText >
                {'To update user, please enter description here.'}
              </DialogContentText>
            }
            <Grid container className='edit-content'>
              <Grid item xs={6} className='p-4'>
                <TextField
                  select fullWidth label='Role'
                  value={row.roll_Id || 0}
                  error={!Validations.IntegerValidation(row.roll_Id)}
                  onChange={this.handleChange('roll_Id')}>
                  {roles.map(element => (
                    <MenuItem key={element.roll_Id} value={element.roll_Id}>{element.rollname}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} className='p-4'>
                <TextField
                  select fullWidth label='Branch'
                  value={row.branch_Id || 0}
                  error={!Validations.IntegerValidation(row.branch_Id)}
                  onChange={this.handleChange('branch_Id')}>
                  {branchs.map(element => (
                    <MenuItem key={element.branch_Id} value={element.branch_Id}>{element.branch_Name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} className='p-4'>
                <TextField
                  fullWidth label='Employee'
                  value={row.emp_Id || 0}
                  error={!Validations.IntegerValidation(row.emp_Id)}
                  onChange={this.handleChange('emp_Id')} />
              </Grid>
              <Grid item xs={6} className='p-4'>
                <TextField
                  fullWidth label='Full Name'
                  value={row.username || ''}
                  error={!row.username}
                  onChange={this.handleChange('username')} />
              </Grid>
              <Grid item xs={12} className='p-4'>
                <TextField
                  fullWidth label='User Email'
                  value={row.useremail || ''}
                  error={!Validations.EmailValidation(row.useremail)}
                  onChange={this.handleChange('useremail')} />
              </Grid>
              <Grid item xs={6} className='p-4'>
                <TextField
                  fullWidth label='Password'
                  value={row.password || ''}
                  error={row.password !== row.confirmPassword}
                  onChange={this.handleChange('password')} />
              </Grid>
              <Grid item xs={6} className='p-4'>
                <TextField
                  fullWidth label='Confirm Password'
                  value={row.confirmPassword || ''}
                  error={row.password !== row.confirmPassword}
                  onChange={this.handleChange('confirmPassword')} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAllClose} color="secondary">
              {this.state.type === 'edit' ? 'Update' : 'Add'}
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout: authActions.logoutUser
  }, dispatch);
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDialog);