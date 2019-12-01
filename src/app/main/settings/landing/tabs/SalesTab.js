import React, { Component } from "react";
import {
  withStyles,
  Typography,
  Icon,
  Input,
  CardActions,
  Divider,
  Paper
} from "@material-ui/core";
import { FuseAnimate } from "@fuse";

import CustomizedCard from "./CustomizedCard";
import CustomizedButton from "./CustomizedButton";
import FavouriteIcon from "./FavouriteIcon";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

class SalesTab extends Component {
  state = {
    searchText: "",
    favourites: {
      salesBYCustomer: false,
      salesBYProduct: false,
      productStatement: false,
      inventoryValuation: false,
      stockValues: false
    }
  };

  setSearchText = event => {
    this.setState({ searchText: event.target.value });
  };

  handleFavourite = data => {
    this.setState({ favourites: { ...this.state.favourites, ...data } });
  };

  render() {
    const { classes } = this.props;
    const { favourites, searchText } = this.state;
    const favouriteKeys = Object.keys(favourites);
    const displayData = {
      salesBYCustomer: "Sales By Customer",
      salesBYProduct: "Sales By Product",
      productStatement: "Product Statement",
      inventoryValuation: "Inventory Valuation",
      stockValues: "Stock Values/Cost/Sales"
    };
    return (
      <React.Fragment>
        <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-center">
          <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="md:ml-24" variant="h4" color="inherit">
                Sales Report
              </Typography>
            </FuseAnimate>
          </div>
          <div className="flex flex-1 items-center justify-center pr-8 sm:px-12">
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Paper
                className="flex p-4 items-center w-full max-w-512 px-8 py-4"
                elevation={1}
              >
                <Icon className="mr-8" color="action">
                  search
                </Icon>
                <Input
                  placeholder="Search for anything"
                  className="flex flex-1"
                  disableUnderline
                  fullWidth
                  value={searchText}
                  inputProps={{
                    "aria-label": "Search"
                  }}
                  onChange={this.setSearchText}
                />
              </Paper>
            </FuseAnimate>
          </div>
        </div>
        <CustomizedCard className={classes.card}>
          {favouriteKeys.map(favouriteKey => {
            return (
              <React.Fragment>
                <CardActions>
                  <FavouriteIcon
                    passingProps={{
                      handleFavourite: this.handleFavourite,
                      favourites: favourites,
                      favouriteKey: favouriteKey
                    }}
                  />
                  <CustomizedButton size="small">
                    {displayData[favouriteKey]}
                  </CustomizedButton>
                </CardActions>
                <Divider />
              </React.Fragment>
            );
          })}
        </CustomizedCard>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SalesTab);
