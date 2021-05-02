import React from 'react'
import { InputBase, Badge, Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
// import classes from '*.module.css';
import logo from '../../assets/commerce.png';
import useStyles from './styles';

import { Link, useLocation } from 'react-router-dom';




const NavBar = ({ totalItems, fetchProductsQuery }) => {
    const classes = useStyles();
    const location = useLocation();



    return (
        <>
            <AppBar position='fixed' className={classes.appBar} >
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color='inherit'>
                        <img src={logo} alt='E-commerce' height='50px' className={classes.image} />
                       My Shop
                    </Typography>







                    <div className={classes.grow} />
                    {location.pathname === '/' &&
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => fetchProductsQuery(e.target.value)}
                            />
                        </div>}
                    {location.pathname === '/' &&



                        <div className={classes.button} >



                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color='inherit' >
                                <Badge badgeContent={totalItems} color='secondary'>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar
