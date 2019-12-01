import React, {Component} from 'react';
import api from 'app/ApiConfig'
import PropTypes from 'prop-types';
import {withStyles, Typography,  Tooltip } from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'app/auth/store/actions';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
  
const rows = [
    { id: 'taxname', numeric: false, disablePadding: true, label: 'Tax Name' },
    { id: 'taxrate', numeric: false, disablePadding: false, label: 'Tax Rate' },    
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },    

];

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
        <TableHead>
            <TableRow>
            {rows.map(row => {
                return (
                <TableCell
                    key={row.id}
                    align="center"
                    padding={row.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === row.id ? order : false}
                >
                    <Tooltip
                    title="Sort"
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                    >
                    <TableSortLabel
                        active={orderBy === row.id}
                        direction={order}
                        onClick={this.createSortHandler(row.id)}
                    >
                        {row.label}
                    </TableSortLabel>
                    </Tooltip>
                </TableCell>
                );
            }, this)}
            </TableRow>
        </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
};
  
const styles = theme => ({
    layoutHeader : {
        height                        : 320,
        minHeight                     : 320,
        [theme.breakpoints.down('md')]: {
            height   : 240,
            minHeight: 240
        }
    }
});


class taxPage extends Component {

    state = {
        order: 'asc',
        orderBy: 'monthly_rate',
        rows: [],
        open: false,
        vertical: 'center',
        horizontal: 'center',
    };
    
    componentDidMount() {
        api.get('http://127.0.0.1:8000/core/role/', {})
        .then(res => {  
            console.log(JSON.stringify(res.data.role))
            this.setState({rows: res.data.role});
        });
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
          order = 'asc';
        }
    
        this.setState({ order, orderBy });
    };
    
    handleLogoChange = (e) =>{
        this.setState({
          Logo: e.target.files[0]
        })
        // alert(e.target.files[0])
      }

    handleSave = (row, type, checked) => {
        var rows = this.state.rows;
        var form_data = new FormData();
        var res = [];
        console.log(row);
        form_data.append('Tax Name', row.taxname);
        form_data.append('Tax Rate', row.taxrate);
        // form_data.append('Status', checked); 
        this.setState({Status:checked})      
        if (type === 'edit') {
            api.put('http://127.0.0.1:8000/core/role/'+row.id, form_data)
            .then(res=>{
                api.get('http://127.0.0.1:8000/core/role/', {})
                .then(res => {                    
                    console.log(JSON.stringify(res.data.role[0]))
                    this.setState({rows: res.data.role, open:true});
                });
            });
            res = rows;
            // rows.forEach(function(cur, err) {
            //     if (cur._id !== row._id)
            //         res.push(cur);
            //     else res.push(row);
            // });
        }
        else {
            axios.post('http://127.0.0.1:8000/core/role/', form_data, {
                headers: {
                  'content-type': 'multipart/form-data'
                }
              })            
            .then(res=>{
                api.get('http://127.0.0.1:8000/core/role/', {})
                .then(res => {                   
                    console.log(JSON.stringify(res.data.role[0]))
                    this.setState({rows: res.data.role});
                });
            });
            
            res = rows;
            res.push(row);
        }
        console.log(res);
        
    }

    handleRemove = (row) => {
        var rows = this.state.rows;
        var res = [];

        api.delete('http://127.0.0.1:8000/core/role/'+row.id);

        rows.forEach(function(cur, err) {
            if (cur.id !== row.id)
                res.push(cur);
        });
        this.setState({rows: res});
    }
    handleClose = () => {
        this.setState({ open: false });
    }

    render()
    {
        const { classes } = this.props;
        const {order, orderBy} = this.state;
        const {vertical, horizontal, open} = this.state;
        var data = stableSort(this.state.rows, getSorting(order, orderBy));
        console.log(localStorage.getItem('username'))
        return (
            <FusePageSimple
                classes={{
                    // header : classes.layoutHeader,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-center">
                        <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                            <div className="flex items-center">
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography variant="h6" className="hidden sm:flex">Tax Setup</Typography>
                                </FuseAnimate>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            
                        </div>
                    </div>
                }
                content={
                    <div className="p-16 sm:p-24">
                        <taxDialog type='add' onSave={this.handleSave} onChangeLogo={this.handleLogoChange} onRemove={this.handleRemove} row={{
                                taxname: '',
                                status: '',                             
                            }}/>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={this.handleRequestSort}
                                    />
                                <TableBody>
                                {data.map(row => (
                                    <TableRow key={row.id}>                                        
                                        <TableCell align="center">{row.RoleName}</TableCell>
                                        <TableCell align="center">{row.RoleName}</TableCell>                                                                                                         
                                                                                                         
                                        <TableCell align="center">{row.Status === true ? "Is Active" : "Deactive"}</TableCell>                              
                        
                                        {/* <img src ={"http://localhost:8000"+row.Logo.replace('media','static')} /> */}
                                        <TableCell align="center">
                                            <taxDialog type='edit' onSave={this.handleSave} onRemove={this.handleRemove} row={row}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {
                                    data.length === 0 && 
                                    <TableRow>
                                    <TableCell align="center">
                                    'No Setup found.'
                                    </TableCell>
                                    </TableRow>
                                }
                                </TableBody>
                            </Table>
                        </Paper>
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            key={`${vertical},${horizontal}`}
                            open={open}
                            onClose={this.handleClose}
                            ContentProps={{
                            'aria-describedby': 'message-id',
                            }}
                            disableWindowBlurListener = "true"
                            message={<span id="message-id">Successfully Update!</span>}
                        />
                    </div>
                }
            />
        );
    };
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
export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(taxPage));
