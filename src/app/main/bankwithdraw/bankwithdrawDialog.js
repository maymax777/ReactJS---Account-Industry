import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Icon, IconButton
} from '@material-ui/core';

export default class bankwithdrawDialog extends React.Component {
  state = {
    open: false,
    type: '',
    row: {
        bankname: '',
        date: '',
        withdrawby: '',
        remarks: '',
        debit : '',
        credit : '',
        createdby : '',

    }
  };

  componentDidMount()
  {
    this.setState( { row: this.props.row, type: this.props.type } );
  }

  handleClickOpen = () => {
    this.setState({ open: true, row: this.props.row, type: this.props.type });
  };

  handleClose = () => {
    if(this.state.row.bankname === ''){
      alert("Please insert Branch Name!")
    } else if (this.state.row.debit === ''){
      alert("Please insert Branch Code!")
    }else if (this.state.row.depositedby ===''){
      alert("Please insert Address!")
  
    }else{
      this.setState({flag:0})
      this.setState({ open: false });
      this.props.onSave(this.state.row, this.state.type);
    }
  };
    


  handleChange = name => event => {
      var cursor = this.state.row;
      cursor[name] = event.target.value;
      this.setState({row: cursor});
  }

  render() {
      const {onSave, onRemove} = this.props;
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
                }}>Bank Withdraw</Button>
            </div>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Bank Withdraw</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Enter Bank Deposit Information
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="bankname"
              name="bankname"
              label="Bank Name"
              value={this.state.row.bankname}
              onChange={this.handleChange('bankname')}
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="depositedby"
              name="depositedby"
              label="Deposited By"
              value={this.state.row.depositedby}
              onChange={this.handleChange('depositedby')}
              variant="outlined"
              fullWidth
            />
            <TextField
              margin="dense"
              id="amount"
              name="amount"
              label="Amount"
              value={this.state.row.amount}
              onChange={this.handleChange('amount')}
              variant="outlined"
              fullWidth
            />
               <TextField
              margin="dense"
              id="remarks"
              name="remarks"
              label="Remarks"
              value={this.state.row.remarks}
              onChange={this.handleChange('remarks')}
              variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={ev=>{
                this.handleClose();
                onSave(this.state.row, this.state.type);}
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