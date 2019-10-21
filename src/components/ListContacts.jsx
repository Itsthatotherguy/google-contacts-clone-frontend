//react
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//components
import Contact from '../components/Contact';
import CreateContactDialog from '../components/CreateContactDialog';
import EditContactDialog from '../components/EditContactDialog';
import ChangeColumnOrderDialog from '../components/ChangeColumnOrderDialog';
import Avatar from './Avatar';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, filterContacts } from '../redux/modules/contacts';
import { fetchColumnOrder } from '../redux/modules/ui';
import { openChangeColumnOrderDialog } from '../redux/modules/ui';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

//labs
import Skeleton from '@material-ui/lab/Skeleton';

//icon
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

//utils
import clsx from 'clsx';
import { routes } from '../utils/constants';

//styles
const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: theme.spacing(3),
        boxSizing: 'border-box',
    },
    index: {
        marginBottom: theme.spacing(3),
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        // width: 320,
        // padding: theme.spacing(1),
    },
    indexButton: {
        flexGrow: 1,
        boxSizing: 'border-box',
        borderTop: '3px solid transparent',
        borderBottom: '3px solid transparent',
        '&:hover': {
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
        },
    },
    activeIndexButton: {
        color: theme.palette.primary.main,
        // backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        pointerEvents: 'none',
    },
    contactList: {
        flex: '1 1 100%',
        width: '100%',
        backgroundColor: theme.palette.common.white,
        overflow: 'hidden',
    },
    wrapper: {
        width: '100%',
        textAlign: 'center',
        marginTop: theme.spacing(3),
    },
    paper: {},
    tableWrapper: {
        overflow: 'auto',
        maxHeight: '100%',
        // maxHeight: `calc(100vh - 64px - 48px - ${theme.spacing(3)}px - ${theme.spacing(
        //     3
        // )}px - ${theme.spacing(3)}px)`,
    },
    changeColumnOrderIcon: {
        marginRight: theme.spacing(2),
    },
    text: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    listItemSkeleton: {
        height: 32,
        margin: theme.spacing(1, 2),
    },
}));

export default function() {
    //redux
    const dispatch = useDispatch();
    const {
        ui: { columns, isLoading: columnOrderIsLoading },
        contacts: { filterLetter, isLoading: contactsIsLoading },
    } = useSelector(state => state);

    const filteredContacts = useSelector(state => {
        const { filterLetter, contacts } = state.contacts;

        if (filterLetter === 'All') {
            return contacts;
        } else {
            return contacts.filter(contact => {
                if (contact) {
                    return contact.firstName.startsWith(filterLetter);
                }
            });
        }
    });

    //react
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        dispatch(fetchContacts());
        dispatch(fetchColumnOrder());
    }, []);

    const handleOtherMenuOpen = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleOtherMenuClose = e => {
        setAnchorEl(null);
    };

    const handleChangeColumnOrderOpen = () => {
        dispatch(openChangeColumnOrderDialog());
        handleOtherMenuClose();
    };

    const handleChangeFilter = e => {
        dispatch(filterContacts(e.currentTarget.name));
    };

    //mui
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Hidden smDown>
                <Paper className={classes.index}>
                    {[
                        'All',
                        'A',
                        'B',
                        'C',
                        'D',
                        'E',
                        'F',
                        'G',
                        'H',
                        'I',
                        'J',
                        'K',
                        'L',
                        'M',
                        'N',
                        'O',
                        'P',
                        'Q',
                        'R',
                        'S',
                        'T',
                        'U',
                        'V',
                        'W',
                        'X',
                        'Y',
                        'Z',
                    ].map((letter, index) => (
                        <IconButton
                            className={clsx(classes.indexButton, {
                                [classes.activeIndexButton]: filterLetter === letter,
                            })}
                            key={index}
                            onClick={handleChangeFilter}
                            name={letter}>
                            <Typography variant='button'>{letter}</Typography>
                        </IconButton>
                    ))}
                </Paper>
            </Hidden>

            <Paper className={classes.contactList}>
                <Hidden mdUp>
                    <List>
                        {(contactsIsLoading ? Array.from(new Array(20)) : filteredContacts).map(
                            (contact, index) => {
                                if (contact) {
                                    const name = `${contact.firstName} ${contact.lastName}`;

                                    return (
                                        <ListItem
                                            button
                                            key={index}
                                            component={Link}
                                            to={`contact/${contact.contactId}`}>
                                            <ListItemAvatar>
                                                <Avatar name={name} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        variant='body1'
                                                        className={classes.text}>
                                                        {name}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    );
                                } else {
                                    return (
                                        <Skeleton
                                            key={index}
                                            className={classes.listItemSkeleton}
                                            variant='rect'
                                        />
                                    );
                                }
                            }
                        )}
                    </List>
                </Hidden>
                <Hidden smDown>
                    <div className={classes.tableWrapper}>
                        <Table stickyHeader>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell>
                                        {columnOrderIsLoading ? (
                                            <Skeleton height={40} variant='rect' />
                                        ) : (
                                            'Name'
                                        )}
                                    </TableCell>
                                    {(columnOrderIsLoading
                                        ? Array.from(new Array(3))
                                        : columns
                                    ).map((column, index) => (
                                        <TableCell key={index}>
                                            {column ? (
                                                column.label
                                            ) : (
                                                <Skeleton height={40} variant='rect' />
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell align='right'>
                                        <IconButton onClick={handleOtherMenuOpen}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleOtherMenuClose}>
                                            <MenuItem onClick={handleChangeColumnOrderOpen}>
                                                <TableChartOutlinedIcon
                                                    className={classes.changeColumnOrderIcon}
                                                />
                                                Change column order
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(contactsIsLoading || columnOrderIsLoading
                                    ? Array.from(new Array(5))
                                    : filteredContacts
                                ).map((contact, index) => {
                                    return contact ? (
                                        <Contact
                                            key={contact.contactId}
                                            contact={contact}
                                            columns={columns}
                                        />
                                    ) : (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Skeleton height={40} variant='rect' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton height={40} variant='rect' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton height={40} variant='rect' />
                                            </TableCell>
                                            <TableCell>
                                                <Skeleton height={40} variant='rect' />
                                            </TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    {/* {isLoading && (
					<div className={classes.wrapper}>
						<CircularProgress />
					</div>
				)} */}
                    {!contactsIsLoading && filteredContacts.length === 0 && (
                        <div className={classes.wrapper}>
                            <Typography variant='h6'>
                                {filterLetter === 'All'
                                    ? 'You currently have no contacts saved.'
                                    : 'You currently have no contacts that match that filter.'}
                            </Typography>
                        </div>
                    )}
                </Hidden>
            </Paper>
            <CreateContactDialog />
            <EditContactDialog />
            <ChangeColumnOrderDialog />
        </div>
    );
}
