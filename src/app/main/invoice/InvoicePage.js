import React, {Component} from 'react';
import api from 'app/ApiConfig'
import PropTypes from 'prop-types';
import {FusePageSimple, FuseAnimate} from '@fuse';
import { withStyles, Typography, Icon, Tooltip,} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InvoiceDialog from './InvoiceDialog'
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
    
    { id: 'invoiceno', numeric: false, disablePadding: false, label: 'Invoice No' },
    { id: 'orderref', numeric: false, disablePadding: false, label: 'Ref' },
    { id: 'netamt', numeric: true, disablePadding: false, label: 'Net Amount' },
    { id: 'tax', numeric: false, disablePadding: false, label: 'Tax' },
    { id: 'totalamt', numeric: false, disablePadding: false, label: 'Total' },
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

class InvoicePage extends Component {

    state = {
        searchText: '',
        rows : [],
        order: 'asc',
        orderBy: 'total',
    };

    componentDidMount() {
        api.get('http://127.0.0.1:8000/api/invoice/'+localStorage.getItem('userid'), {})
        .then(res => {
            console.log("--------------------------"+JSON.stringify(this.props.match.params))
            console.log(JSON.stringify(res.data.createinvoice[0]))
            this.setState({rows: res.data.invoice});
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

    handleSave = (row, type) => {
        var rows = this.state.rows;
        var form_data = new FormData();
        var res = [];
        console.log(row);
        form_data.append('invoiceno', row.invoiceno);
        form_data.append('orderref', row.orderref);
        form_data.append('netamt', row.netamt);
        form_data.append('tax', row.tax);
        form_data.append('total', row.total);
        
        var auditlogcreateData = {
            "Username"  : localStorage.getItem('userid'),
            "Event"     : "Created",
            "Activity"  : row.invoiceno,
            "Type"      : "Tran"
        }
        var auditlogupdateData = {
            "Username"  : localStorage.getItem('userid'),
            "Event"     : "Updated",
            "Activity"  : row.invoiceno,
            "Type"      : "Tran"
        }
        
        if (type === 'edit') {
            api.put('http://127.0.0.1:8000/api/invoice/'+row.id, form_data)
            .then(res=>{
                api.get('http://127.0.0.1:8000/api/invoice/'+localStorage.getItem('userid'), {})
                .then(res => {
                    api.post('http://localhost:8000/api/auditlog/', JSON.stringify(auditlogupdateData))
                    .then(res=>{
                        console.log(JSON.stringify(res))
                    })
                    .catch(err=>{
                        console.log(err)
                    });
                    this.setState({rows: res.data.invoice, open:true});
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
            axios.post('http://127.0.0.1:8000/api/invoice/', form_data, {
                headers: {
                  'content-type': 'multipart/form-data'
                }
              })            
            .then(res=>{
                api.get('http://127.0.0.1:8000/api/invoice/'+localStorage.getItem('userid'), {})
                .then(res => {
                    api.post('http://localhost:8000/api/auditlog/', JSON.stringify(auditlogcreateData))
                    .then(res=>{console.log(JSON.stringify(res))})
                    .catch(err=>{
                        console.log(err)
                    });
                    this.setState({rows: res.data.company});
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
        var auditlogdeleteData = {
            "Username"  : localStorage.getItem('userid'),
            "Event"     : "Deleted",
            "Activity"  : row.invoiceno,
            "Type"      : "Tran"
        }
        api.post('http://localhost:8000/api/auditlog/', JSON.stringify(auditlogdeleteData))
        .then(res=>{api.delete('http://127.0.0.1:8000/api/createinvoice'+row.id)})
        .catch(err=>{
            console.log(err)
        });

        rows.forEach(function(cur, err) {
            if (cur.id !== row.id)
                res.push(cur);
        });
        this.setState({rows: res});
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
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Icon className="text-32 mr-12">account_balance</Icon>
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography variant="h6" className="hidden sm:flex">Invoice</Typography>
                                </FuseAnimate>
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            
                            {/* <Button className="normal-case" variant="contained" color="primary" aria-label="Send Message">Create Company</Button> */}
                        </div>
                    </div>
                }
                content={
                    
                    <div className="p-16 sm:p-24">
                        <InvoiceDialog type='add' onSave={this.handleSave} onChangeLogo={this.handleLogoChange} onRemove={this.handleRemove} row={{
                                invoiceno: '',
                                orderref: '',
                                netamt: '',
                                tax: '',
                                total: '',

                                Created_by:localStorage.getItem('userid'),
                               
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
                                        <TableCell component="th" scope="row">{row.invoiceno}</TableCell>
                                        <TableCell align="center">{row.orderref}</TableCell>
                                        <TableCell align="center">{row.netamt}</TableCell>
                                        <TableCell align="center">{row.tax}</TableCell>
                                        <TableCell align="center">{row.total}</TableCell>
                                        {/* <TableCell align="center">{row.Mobile}</TableCell>
                                        <TableCell align="center">{row.Email}</TableCell> */}
                                        {/* <TableCell align="center">{row.Web}</TableCell>
                                        <TableCell align="center">{row.State}</TableCell> */}
                                        {/* <TableCell align="center">{row.Country}</TableCell>
                                        <img src ={"http://localhost:8000"+row.Logo.replace('media','static')} style={{width:100,height:100}}/> */}
                                        <TableCell align="center">
                                            <InvoiceDialog type='edit' onSave={this.handleSave} onRemove={this.handleRemove} row={row}/>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {
                                    data.length === 0 && 
                                    <TableRow>
                                    <TableCell align="center">
                                    'No Invoice found.'
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
export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(InvoicePage));
