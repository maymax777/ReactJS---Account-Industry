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
  Icon, IconButton,Checkbox
} from '@material-ui/core';
import moment from 'moment';

class FiscalDialog extends React.Component {
  state = {
    open: false,
    type: '',
    row: {
      fiscalyear: '',
      fromdate: '',
      todate: '',
      status: true,
    }
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({ row: this.props.row, type: this.props.type });
    this.setState({ Created_by: user.id })
  }
  handleClickOpen = () => {
    this.setState({ open: true, row: this.props.row, type: this.props.type });
  };

  handleClose = () => {
    if (this.state.row.fiscalyear === '') {
      alert("Please insert FiscalYear!")
    } else if (this.state.row.fromdate === '') {
      alert("Please insert From Date!")
    } else if (this.state.row.todate === '') {
      alert("Please insert To Date!")
    } else {
      this.setState({ flag: 0 })
      this.setState({ open: false });
      this.props.onSave(this.state.row, this.state.type);
    }
  };

  onClose = () => {
    this.setState({ open: false });
  }

  handleChange = name => event => {
    var cursor = this.state.row;
    switch (name) {
      case 'status':
        cursor[name] = event.target.checked;
        break;
      default:
        cursor[name] = event.target.value;
    }
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
              if (window.confirm('Are you sure to remove this Fiscal Year?')) {
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
            }}>Add Fiscal Year</Button>
          </div>
        }
        <Dialog
          open={this.state.open}
          onClose={() => this.onClose()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Fiscal Year</DialogTitle>
          <DialogContent>
            {this.state.type === 'add' ?
              <DialogContentText >
                To create fiscal year, please enter description here.
            </DialogContentText>
              :
              <DialogContentText >
                To update fiscal year, please enter description here.
            </DialogContentText>
            }
            <TextField
              autoFocus
              margin="dense"
              id="FiscalYear"
              name="FiscalYear"
              label="Fiscal Year"
              value={this.state.row.fiscalyear || ''}
              error={!Validations.IntegerValidation(this.state.row.fiscalyear)}
              onChange={this.handleChange('fiscalyear')}
              fullWidth
            />
            <TextField
              id="FromDate"
              label="From Date"
              type="date"
              format="YYYY-MM-DD"
              value={moment(this.state.row.fromdate).format("YYYY-MM-DD") || moment().format('YYYY-MM-DD')}
              onChange={this.handleChange('fromdate')}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="ToDate"
              label="To Date"
              type="date"
              value={moment(this.state.row.todate).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD')}
              onChange={this.handleChange('todate')}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogContentText >
              Status:
            </DialogContentText>
            <Checkbox checked={this.state.row.status} onChange={this.handleChange('status')} />

          </DialogContent>
          <DialogActions>
            <Button onClick={ev => {
              this.handleClose();
            }
            } color="secondary">
              {this.state.type === 'edit' && 'Update'}
              {this.state.type === 'add' && 'Add'}
            </Button>
            <Button onClick={() => this.onClose()} color="secondary">
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

export default connect(mapStateToProps, mapDispatchToProps)(FiscalDialog);