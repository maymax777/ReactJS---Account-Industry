import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'app/auth/store/actions';
import Validations from '../../helper/Validations';
import {
  Icon, IconButton, Typography
} from '@material-ui/core';

class CompanyDialog extends React.Component {
  state = {
    open: false,
    type: '',
    row: {
      name: '',
      address: '',
      pan: '',
      regd: '',
      telephone: '',
      mobile: '',
      email: '',
      website: '',
      stateCity: '',
      country: '',
      createdby: '',
      Logo: null
    },
    flag: 0,
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({ row: this.props.row, type: this.props.type });
    this.setState({ Created_by: user.id })
  }
  handleLogoChange = (e) => {
    this.setState({ flag: 1 })
    let file = e.target.files[0];
    var cursor = this.state.row;
    cursor['logo'] = file;
    this.setState({ row: cursor });

    // this.props.row.Logo = 
    // alert(this.state.row.Logo)
  }
  handleClickOpen = () => {
    this.setState({ open: true, row: this.props.row, type: this.props.type });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleAllClose = () => {
    if (this.state.row.name === '') {
      alert("Please insert Company Name!")
    } else if (this.state.row.address === '') {
      alert("Please insert Company Address!")
    } else if (this.state.row.pan === '') {
      alert("Please insert PAN No!")
    } else if (!Validations.IntegerValidation(this.state.row.pan)) {
      alert("Please check your PAN No!")
    } else if (this.state.row.regd === '') {
      alert("Please insert Regd No!")
    } else if (!Validations.IntegerValidation(this.state.row.regd)) {
      alert("Please check your Regd No!")
    } else if (this.state.row.telephone === '') {
      alert("Please insert Telephone!")
    } else if (!Validations.TelephoneValidation(this.state.row.telephone)) {
      alert("Please check your Telephone Number!")
    } else if (this.state.row.mobile === '') {
      alert("Please insert Mobile!")
    } else if (!Validations.TelephoneValidation(this.state.row.mobile)) {
      alert("Please check your mobile Number!")
    } else if (this.state.row.email === '') {
      alert("Please insert Email ID!")
    } else if (!Validations.EmailValidation(this.state.row.email)) {
      alert("Please check your email!")
    } else if (this.state.row.website === '') {
      alert("Please insert Website!")
    } else if (!Validations.WebUrlValidation(this.state.row.website)) {
      alert("Please check your web site address!")
    } else if (this.state.row.stateCity === '') {
      alert("Please insert State/City!")
    } else if (this.state.row.country === '') {
      alert("Please insert Country!")
    } else {
      this.setState({ flag: 0 })
      this.setState({ open: false });
      this.props.onSave(this.state.row, this.state.type);
    }
  };

  handleChange = name => event => {
    var cursor = this.state.row;
    cursor[name] = event.target.value;
    this.setState({ row: cursor });
  }

  render() {
    const { onRemove } = this.props;
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
              if (window.confirm('Are you sure to remove this company?')) {
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
            }}>Add Company</Button>
          </div>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        // style={{backgroundColor:'#ffffff'}}
        >

          <DialogTitle id="form-dialog-title" >Company Info</DialogTitle>
          <DialogContent>
            {this.state.type === 'add'
              ? <DialogContentText >
                {'To create company, please enter description here.'}
              </DialogContentText>
              : <DialogContentText >
                {'To update company, please enter description here.'}
              </DialogContentText>
            }

            <TextField
              autoFocus
              margin="dense"
              id="Name"
              name="Name"
              label="Company"
              value={this.state.row.name || ''}
              onChange={this.handleChange('name')}
              variant='outlined'
              fullWidth

            />
            <TextField
              margin="dense"
              id="Address"
              name="Address"
              label="Address"
              value={this.state.row.address || ''}
              onChange={this.handleChange('address')}
              variant='outlined'
              fullWidth
            />
            <TextField
              margin="dense"
              id="Pan_No"
              name="Pan_No"
              label="PAN No"
              value={this.state.row.pan || ''}
              onChange={this.handleChange('pan')}
              variant='outlined'
              error={!Validations.IntegerValidation(this.state.row.pan)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="Regd_No"
              name="Regd_No"
              label="Regd. No"
              value={this.state.row.regd || ''}
              onChange={this.handleChange('regd')}
              variant='outlined'
              error={!Validations.IntegerValidation(this.state.row.regd)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="Telephone"
              name="Telephone"
              label="Telephone"
              value={this.state.row.telephone || ''}
              onChange={this.handleChange('telephone')}
              error={!Validations.TelephoneValidation(this.state.row.telephone)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="Mobile"
              name="Mobile"
              label="Mobile"
              value={this.state.row.mobile || ''}
              onChange={this.handleChange('mobile')}
              variant='outlined'
              error={!Validations.TelephoneValidation(this.state.row.mobile)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="Email"
              name="Eamil"
              label="Email ID"
              value={this.state.row.email || ''}
              onChange={this.handleChange('email')}
              variant='outlined'
              error={!Validations.EmailValidation(this.state.row.email)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="Web"
              name="Web"
              label="Website"
              value={this.state.row.website || ''}
              onChange={this.handleChange('website')}
              error={!Validations.WebUrlValidation(this.state.row.website)}
              variant='outlined'
              fullWidth
            />
            <TextField
              margin="dense"
              id="State"
              name="State"
              label="State/City"
              value={this.state.row.stateCity || ''}
              onChange={this.handleChange('stateCity')}
              variant='outlined'
              fullWidth
            />
            <TextField
              margin="dense"
              id="Country"
              name="Country"
              label="Country"
              value={this.state.row.country || ''}
              onChange={this.handleChange('country')}
              variant='outlined'
              fullWidth
            />
            <div className="flex" style={{ justifyContent: 'center' }}>
              <Typography variant="subtitle1">Logo: </Typography>
              <input className="m-4" type='file' id='photo_url' name='photo_url' onChange={this.handleLogoChange} />
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={ev => {
              this.handleAllClose();
            }
            } color="secondary">
              {this.state.type === 'edit' && 'Update'}
              {this.state.type === 'add' && 'Add'}
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDialog);