import React from 'react';

//components
import CreateContactButton from './CreateContactButton';

//redux
import { useSelector } from 'react-redux';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//icons
import AddIcon from '@material-ui/icons/Add';

//utils
import { styleConstants } from '../utils/constants';

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    drawer: {
        width: styleConstants.drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: styleConstants.drawerWidth,
        backgroundColor: theme.palette.grey[200],
        borderRightColor: theme.palette.grey[400],
    },
    createContactButton: {},
}));

export default function Sidebar() {
    const {
        ui: { sidebarOpen },
    } = useSelector(state => state);
    const classes = useStyles();
    return (
        <Drawer
            variant='persistent'
            anchor='left'
            open={sidebarOpen}
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}>
            <div className={classes.toolbar} />
            <List>
                <ListItem>
                    <CreateContactButton />
                </ListItem>
                {Array(1, 1, 1, 1, 1, 1).map((_, index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemText primary='Bla bla bla' />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
}
