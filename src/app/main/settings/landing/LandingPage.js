import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, Typography} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import CategoryTab from './tabs/CategoryTab';
import ExploreEventTab from './tabs/ExploreEventTab';
import GetProjectTab from './tabs/GetProjectTab';

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

class LandingPage extends Component {

    state = {
        value: 0,
    };

    componentDidMount()
    {
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    render()
    {
        const {value} = this.state;

        return (
            <FusePageSimple
                classes={{
                    // header : classes.layoutHeader,
                    toolbar: "px-16 sm:px-24"
                }}
                header={
                    <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-center">
                        <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="md:ml-24" variant="h4" color="inherit">Get Your Report Here</Typography>
                            </FuseAnimate>
                        </div>

                        <div className="flex items-center justify-end">
                            <Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow">Follow</Button>
                            <Button className="normal-case" variant="contained" color="primary" aria-label="Send Message">Send Message</Button>
                        </div>
                    </div>
                }
                contentToolbar={
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="off"
                        classes={{
                            root: "h-64 w-full border-b-1"
                        }}
                    >
                        <Tab
                            classes={{
                                root: "h-64"
                            }} label="Favourite"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }}
                            label="Account & Inventory"/>
                        <Tab
                            classes={{
                                root: "h-64"
                            }}
                            label="Management Report"/>
                    </Tabs>
                }
                content={
                    <div className="p-16 sm:p-24">
                        {value === 0 && (
                            <CategoryTab />
                        )}
                        {value === 1 && (
                            <ExploreEventTab />
                        )}
                        {value === 2 && (
                            <GetProjectTab />
                        )}
                    </div>
                }
            />
        )
    };
}

export default withStyles(styles, {withTheme: true})(LandingPage);
