import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Icon, IconButton,
} from '@material-ui/core';

export default class CustomerDialog extends React.Component {
  state = {
    open: false,
    type: '',
    row: {
      cid: '',
      date: '',
      name: '',
      address: '',
      emailid: '',
      region: '',
      mobile: '',
      telephone: '',
      netdues: '',
      salesagent: '',
      createdby: '',
      status: '',
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
    this.setState({ open: false });
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
                if (window.confirm('Are you sure to remove this Bank?')) {
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
                }}>Create Customer</Button>
            </div>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Customer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To Create the Bank Please enter Bank Details Here.
            </DialogContentText>
            <TextField
               margin="dense"
               id="name"
               name="name"
               label="Name"
               value={this.state.row.name}
               onChange={this.handleChange('name')}
               variant="outlined"
               fullWidth
             />
             <TextField
               margin="dense"
               id="address"
               name="address"
               label="Address"
               value={this.state.row.address}
               onChange={this.handleChange('address')}
               variant="outlined"
               fullWidth
             />
             <TextField
               margin="dense"
               id="emailid"
               name="emailid"
               label="Email ID"
               value={this.state.row.emailid}
               onChange={this.handleChange('emailid')}
               variant="outlined"
               fullWidth
             />
             <TextField
               margin="dense"
               id="region"
               name="region"
               label="Region"
               value={this.state.row.region}
               onChange={this.handleChange('region')}
 
               variant="outlined"
               fullWidth
             />
             <TextField
               margin="dense"
               id="mobile"
               name="mobile"
               label="Mobile"
               value={this.state.row.mobile}
               onChange={this.handleChange('mobile')}
               type="number"
               variant="outlined"
               fullWidth
             />
             <TextField
               margin="dense"
               id="telephone"
               name="telephone"
               label="Telephone"
               value={this.state.row.telephone}
               onChange={this.handleChange('telephone')}
               type="number"
               variant="outlined"
               fullWidth
             />
             <TextField
               margin="dense"
               id="netdues"
               name="netdues"
               label="Net Dues"
               value={this.state.row.netdues}
               onChange={this.handleChange('netdues')}
               variant="outlined"
               fullWidth
            />
                 <TextField
               margin="dense"
               id='salesagentid'
               name="saleagentid"
               label="Sales Agent"
               value={this.state.row.salesagentid}
               onChange={this.handleChange('salesagentid')}
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
// function mapDispatchToProps(dispatch)
// {
//     return bindActionCreators({
//         logout: authActions.logoutUser
//     }, dispatch);
// }

// function mapStateToProps({auth})
// {
//     return {
//         user: auth.user
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(FaqDialog);