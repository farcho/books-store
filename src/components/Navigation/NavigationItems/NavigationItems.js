import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        {/* <NavigationItem link="/" exact>Burger Builder</NavigationItem> */}
        <NavigationItem link="/books">Books</NavigationItem>
        <NavigationItem link="/auth">Authenticate</NavigationItem>
        <NavigationItem link="/signup">Sign Up</NavigationItem>
    </ul>
);

export default navigationItems;