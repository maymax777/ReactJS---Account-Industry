import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'app/auth/store/actions';
import _ from '@lodash';
import api from 'app/ApiConfig'
import {
    Icon, IconButton, Typography
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

class taxDialog extends React.Component {
  state = {
    open: false,
    type: '',
    row: {
        taxname: '',
        taxrate: '',
        Status: '',   
    
    },
    checkedA: true,
  };

  componentDidMount()
  {
    const {user} = this.props;
    this.setState( { row: this.props.row, type: this.props.type } );
    this.setState({Created_by:user.id})
  }
  handleLogoChange = (e) =>{
    let file = e.target.files[0];
    var cursor = this.state.row;
      cursor['Logo'] = file;
      this.setState({row: cursor});
    
  
  }
  handleClickOpen = () => {
    this.setState({ open: true, row: this.props.row, type: this.props.type });
  };

  handleClose = () => {
    if(this.state.row.taxname == ''){
      alert("Please insert FiscalYear!")
    } else if (this.state.row.taxrate == ''){
      alert("Please insert From Date!")
    }
    else{
      this.setState({flag:0})
      this.setState({ open: false });
      this.props.onSave(this.state.row, this.state.type, this.state.checkedA);
    }
  };

  handleChange = name => event => {
      var cursor = this.state.row;
      cursor[name] = event.target.value;
      this.setState({row: cursor});
      // alert(this.state.row.FromDate)
  }
  handleCheckChange = name => event => {
    if (event.target.value === "true"){
      
      this.setState({checkedA: false});
    } else {
      this.setState({checkedA: true});
    }
    
    
  }

  render() {
      const {onSave, onRemove, onChangeLogo} = this.props;
      
      
      // console.log("000000000000000000000000"+JSON.stringify(user))
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
                <Button className="normal-case" variant="contained" color="primary" aria-label="Add Message" onClick={(ev) => {
                    ev.stopPropagation();
                    this.handleClickOpen();
                }}>Add Tax</Button>
            </div>
        }
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Tax</DialogTitle>
          <DialogContent>
          {this.state.type === 'add' ?
            <DialogContentText >
              To create Tax
            </DialogContentText>
            :
            <DialogContentText >
              To update Tax
            </DialogContentText>
          }
            <TextField
              autoFocus
              margin="dense"
              id="taxname"
              name="taxname"
              label="Tax Ledger "
              value={this.state.row.taxname}
              onChange={this.handleChange('taxname')}
              
              fullWidth
            />
                <TextField
              autoFocus
              margin="dense"
              id="taxrate"
              name="taxrate"
              label="Tax Rate"
              value={this.state.row.taxrate}
              onChange={this.handleChange('taxrate')}
              
              fullWidth
            />
            <DialogContentText >
              Status:
            </DialogContentText>
            <Checkbox checked={this.state.checkedA} onChange={this.handleCheckChange('checkedA')} value= {this.state.checkedA}/>
                    
            
          </DialogContent>
          <DialogActions>
            <Button onClick={ev=>{
                this.handleClose();
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

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        logout: authActions.logoutUser
    }, dispatch);
}

function mapStateToProps({auth})
{
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(taxDialog);