import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'app/auth/store/actions';
import {
  Icon, IconButton
} from '@material-ui/core';

class InvoiceDialog extends React.Component {
  state = {
    open: false,
    type: '',
    row: {
      invoiceno: '',
      custname: '',
      orderref: '',
      netamt: '',
      tax: '',
      totalamt: '',
      Created_by: '',


    },

    flag: 0,
  };

  componentDidMount() {
    this.setState({ row: this.props.row, type: this.props.type });
    this.setState({ Created_by: 1 })
  }
  handleLogoChange = (e) => {
    this.setState({ flag: 1 })
    let file = e.target.files[0];
    var cursor = this.state.row;
    cursor['Logo'] = file;
    this.setState({ row: cursor });


  }
  handleClickOpen = () => {
    this.setState({ open: true, row: this.props.row, type: this.props.type });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleAllClose = () => {
    if (this.state.row.custname === '') {
      alert("Please insert Customer Name!")
    }
    else if (this.state.row.orderref === '') {
      alert("Please insert Order Ref!")
    }
    else {
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
    const { onSave, onRemove } = this.props;
    return (
      <div>
        {this.state.type === 'edit' &&
          <div>
            <IconButton onClick={(ev) => {
              ev.stopPropagation();
              this.handleClickOpen();
            }}>
              <Icon>edit_attributes</Icon>
            </IconButton>
            <IconButton onClick={(ev) => {
              ev.stopPropagation();
              if (window.confirm('Do you want to delete this transaction?')) {
                onRemove(this.state.row);
              }
            }}>
              <Icon type="small">delete</Icon>
            </IconButton>
          </div>
        }
        {this.state.type === 'add' &&
          <div className="flex items-center justify-end">
            <Button className="normal-case" variant="contained" color="primary" aria-label="Add Message" onClick={(ev) => {
              ev.stopPropagation();
              this.handleClickOpen();
            }}>Create Invoice</Button>
          </div>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Invoice</DialogTitle>
          <DialogContent>

            <TextField
              autoFocus
              margin="dense"
              id="invoiceno"
              name="invoiceno"
              label="invoce noName"
              value={this.state.row.custname}
              onChange={this.handleChange('invoiceno')}
              variant="outlined"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="custname"
              name="custname"
              label="Customer Name"
              value={this.state.row.custname}
              onChange={this.handleChange('custname')}
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="orderref"
              name="orderref"
              label="Order Ref"
              value={this.state.row.orderref}
              onChange={this.handleChange('orderref')}
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="netamt"
              name="netamt"
              label="Net Amount"
              value={this.state.row.netamt}
              onChange={this.handleChange('netamt')}
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="tax"
              name="tax"
              label="Tax"
              value={this.state.row.tax}
              onChange={this.handleChange('tax')}
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="totalamt"
              name="totalamt"
              label="Total"
              value={this.state.row.tota}
              onChange={this.handleChange('totalamt')}
              variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={ev => {
              this.handleAllClose();
              onSave(this.state.row, this.state.type);
            }
            } color="secondary">
              {this.state.type === 'edit' && 'Save'}
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDialog);