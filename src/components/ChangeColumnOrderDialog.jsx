import React, { useState, useEffect } from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { closeChangeColumnOrderDialog, changeColumnOrder } from '../redux/modules/ui';

//dnd
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//mui
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//icons
import ReorderIcon from '@material-ui/icons/Reorder';

//utils
import { reorder } from '../utils/helpers';

//styles
const useStyles = makeStyles(theme => ({
    dialogFooter: {
        justifyContent: 'space-between',
    },
}));

export default function() {
    //redux
    const dispatch = useDispatch();
    const {
        ui: { changeColumnOrderDialogOpen, columns },
    } = useSelector(state => state);

    //react
    const [columnOrder, setColumnOrder] = useState([]);

    useEffect(() => {
        setColumnOrder(columns);
    }, [columns]);

    const onDragEnd = result => {
        if (!result.destination) {
            return;
        }
        console.log(columnOrder);

        const reorderedColumns = reorder(
            columnOrder,
            result.source.index,
            result.destination.index
        );

        setColumnOrder(reorderedColumns);
    };

    const handleClose = () => {
        dispatch(closeChangeColumnOrderDialog());
    };

    const handleReset = () => {
        setColumnOrder(columns);
    };

    const handleCancel = () => {
        handleReset();
        handleClose();
    };

    const handleSave = () => {
        dispatch(changeColumnOrder(columnOrder));
        handleClose();
    };

    const classes = useStyles();
    return (
        <Dialog open={changeColumnOrderDialogOpen} onClose={handleClose}>
            <DialogTitle>Change column order</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Choose columns to show and drag to change order. Small screens may not display
                    all columns.
                </DialogContentText>
            </DialogContent>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='droppable'>
                    {(provided, snapshot) => (
                        <List {...provided.droppableProps} innerRef={provided.innerRef}>
                            <ListItem>
                                <ListItemText primary='1. Name' />
                            </ListItem>
                            {columnOrder.map((column, index) => (
                                <Draggable
                                    key={index}
                                    draggableId={`draggable-${index + 1}`}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <ListItem
                                            button
                                            innerRef={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <ListItemText
                                                primary={`${index + 2}. ${column.label}`}
                                            />
                                            <ListItemIcon>
                                                <ReorderIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
            <DialogActions className={classes.dialogFooter}>
                <section>
                    <Button color='primary' onClick={handleReset}>
                        Reset
                    </Button>
                </section>
                <section>
                    <Button color='primary' onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button color='primary' onClick={handleSave}>
                        Done
                    </Button>
                </section>
            </DialogActions>
        </Dialog>
    );
}
