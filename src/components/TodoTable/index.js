import { useState, forwardRef } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axiosInstance from 'utils/axios';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TodoTable = () => {
    const todoList = useSelector(state => state.todo)
    const columns = todoList[0] ? Object.keys(todoList[0]) : [];
    const [selectedTodo, setSelectedTodo] = useState(null)

    const [open, setOpen] = useState(false);

    const handleClickOpen = (data) => {
        setOpen(data);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = (row) => {
        setSelectedTodo(row)
        axiosInstance
            .get(`/public/v1/users/${row.user_id}`)
            .then((res) => {
                handleClickOpen(res.data.data);
            })
    }

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className='dialogTitle'>
                    {"To Do - " + selectedTodo?.id}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div><b>Task</b>: {selectedTodo?.title}</div>
                        <hr />
                        <div><b>Assigned Person Name</b> : {open?.name}</div>
                        <div><b>Assigned Person Gender</b> : {open?.gender}</div>
                        <div><b>Assigned Person Status</b> : {open?.status}</div>
                        <div><b>Assigned Person Email</b> : {open?.email}</div>
                        <hr />
                        <div><b>Due date</b> : {selectedTodo?.due_on}</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table className='tableBody'>
                    <TableHead>
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column}
                                    style={{ minWidth: '100px' }}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todoList
                            .map((row) => {
                                return (
                                    <TableRow onClick={() => handleClick(row)} key={row.id} hover role="checkbox" tabIndex={-1}>
                                        {columns.map((column) => {
                                            const value = row[column];
                                            return (
                                                <TableCell key={row[column]} >
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TodoTable
