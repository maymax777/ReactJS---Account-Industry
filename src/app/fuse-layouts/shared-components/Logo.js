import React from 'react';
import { withStyles} from '@material-ui/core';
import classNames from 'classnames';
import connect from 'react-redux/es/connect/connect';
import {withRouter} from 'react-router-dom';

const styles = theme => ({
    root      : {
        '& .logo-icon': {
            width     : 50,
            height    : 50,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        }
    },
    reactBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color          : '#61dafb'
    }
});

function Logo({classes, user})
{
    return (
        <div className={classNames(classes.root, "flex items-center")}>
            <img className="logo-icon" src="assets/images/logos/bird-logo.png" alt="logo"/>
            {/* <Typography className="text-24 ml-8 logo-text">{user.role} panel</Typography> */}
        </div>
    );
}

function mapStateToProps({auth})
{
    return {
        user: auth.user
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(Logo)));
// export default withStyles(styles, {withTheme: true})(Logo);
