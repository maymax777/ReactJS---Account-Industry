import React from "react";
import {
  Grid, Button, TextField, Icon, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "app/auth/store/actions";
import MenuItem from "@material-ui/core/MenuItem";
import Validations from '../../../helper/Validations'
import { NotificationManager } from 'react-notifications';
class BankManagerDialog extends React.Component {
  state = {
    open: false,
    type: "",
    accountTypes: ["Fixed Account", "Current Account", "Saving Account"],
    row: {
      trans_Id: 1,
      ledger_Code: 1,
      debit: (Math.random() * 1000).toFixed(2),
      credit: 0,
      gi_type: "gi_type",
      remarks: 'remarks',
      narration: 'naration',
      status: true,
      vouc_No: "3",
      fiscal: '1',
      date: '2019-11-8',
      tran_type: 'tran_type',
      branch_id: 1,
      project_id: 1
    },
  };

  async componentDidMount() {
    this.setState({ type: this.props.type, row: this.props.row });
    // this.handleClickOpen();
  }
  handleClickOpen = () => {
    this.setState({ open: true, type: this.props.type });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAllClose = () => {
    const { row } = this.state;
    if (!Validations.IntegerValidation(row.bank)) {
      NotificationManager.error("Please select bank type!", "Bank");
    } else if (!Validations.IntegerValidation(row.cash_balance)) {
      NotificationManager.error("Cash balance value is double!", "Cash Balance");
    } else if (!Validations.IntegerValidation(row.cash_balance)) {
      NotificationManager.error("Amount is double!", "Deposit Amont");
    } else if (row.remarks === '') {
      NotificationManager.error("Please enter remarks!", "Remarks");
    } else {
      this.setState({ open: false });
      this.props.onSave(this.state.row, this.state.type);
    }
  };

  handleChange = name => event => {
    var cursor = this.state.row;
    cursor[name] = event.target.value;
    this.setState({ row: cursor });
  };

  render() {
    const { onRemove, account, branch, bankType } = this.props;
    const { row, accountTypes } = this.state;
    return (
      <div>
        {this.state.type === "edit" && (
          <div>
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                this.handleClickOpen();
              }}
            >
              <Icon>edit_attributes</Icon>
            </IconButton>
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                if (window.confirm(`Are you sure to remove this ${bankType === 'debit' ? 'Doposit' : 'Withdraw'}?`)) {
                  onRemove(this.state.row);
                }
              }}
            >
              <Icon type="small">delete</Icon>
            </IconButton>
          </div>
        )}
        {this.state.type === "add" && (
          <div className="flex items-center justify-end">
            <Button
              className="normal-case"
              variant="contained"
              color="primary"
              aria-label="Add Message"
              onClick={ev => {
                ev.stopPropagation();
                this.handleClickOpen();
              }}>
              {`Add ${bankType === 'debit' ? 'Doposit' : 'Withdraw'}`}
            </Button>
          </div>
        )}
        <Dialog
          fullWidth
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Bank</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.type === 'add'
                ? `To create ${bankType === 'debit' ? 'doposit' : 'withdraw'}, please enter description here.`
                : `To update ${bankType === 'debit' ? 'doposit' : 'withdraw'}, please enter description here.`
              }
            </DialogContentText>
            <Grid container>
              <Grid item xs={12} className='p-4'>
                <TextField
                  fullWidth select
                  label='Bank Name'
                  value={row.bank || ''}
                  error={!Validations.IntegerValidation(row.bank)}
                  onChange={this.handleChange('bank')}
                >
                  {this.props.banks.map(element => (
                    <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} className='p-4'>
                <TextField
                  fullWidth disabled
                  label='Transaction No'
                  value={row.trans_Id || ''}
                  error={!Validations.IntegerValidation(row.trans_Id)}
                  onChange={this.handleChange('trans_Id')}
                />
              </Grid>
              <Grid item xs={6} className='p-4'>
                <TextField
                  fullWidth
                  label='Cash Balance'
                  value={row.cash_balance || ''}
                  error={!Validations.DoubleValidation(row.cash_balance)}
                  onChange={this.handleChange('cash_balance')}
                />
              </Grid>
              <Grid item xs={6} className='p-4'>
                <TextField
                  fullWidth
                  label={`${bankType === 'debit' ? 'Deposit' : 'Withdraw'} Amount`}
                  value={row[bankType] || ''}
                  error={!Validations.DoubleValidation(row.debit)}
                  onChange={this.handleChange(bankType)}
                />
              </Grid>
              <Grid item xs={6} className='p-4'>
                <TextField
                  fullWidth disabled
                  label={`${bankType === 'debit' ? 'Deposit' : 'Withdraw'} By`}
                  value={this.props.user.username}
                />
              </Grid>
              <Grid item xs={12} className='p-4'>
                <TextField
                  fullWidth
                  label='Deposit By'
                  value={row.remarks || ''}
                  error={row.remarks === ''}
                  onChange={this.handleChange('remarks')}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.handleAllClose();
              }}
              color="secondary"
            >
              {this.state.type === "edit" ? "Update" : 'Add'}
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

export default connect(mapStateToProps, mapDispatchToProps)(BankManagerDialog);
