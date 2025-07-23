import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton, Typography, Tooltip, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress, Collapse
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';

const ShowNotices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user);

    const [openDialog, setOpenDialog] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    const [openRow, setOpenRow] = useState(null);

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    const handleDeleteClick = (id) => {
        setDeleteID(id);
        setOpenDialog(true);
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteUser(deleteID, "Notice"))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
                setOpenDialog(false);
                setDeleteID(null);
            });
    };

    const handleDeleteAll = () => {
        setDeleteID(currentUser._id);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setDeleteID(null);
    };

    const handleRowClick = (rowId) => {
        setOpenRow(openRow === rowId ? null : rowId);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #ece9f7 0%, #f5f7fa 100%)',
                py: 4,
                px: { xs: 0, md: 0 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: { xs: '98vw', md: '90vw', lg: '80vw' },
                    maxWidth: '1400px',
                    borderRadius: 4,
                    p: { xs: 1, md: 3 },
                    boxShadow: 5,
                    bgcolor: 'white',
                    minHeight: 400,
                    position: 'relative'
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" fontWeight={700} color="#270843">
                        Notices
                    </Typography>
                    <Box>
                        <Tooltip title="Add New Notice">
                            <Fab color="primary" size="small" onClick={() => navigate("/Admin/addnotice")} sx={{ mr: 2, bgcolor: "#270843", "&:hover": { bgcolor: "#3f1068" } }}>
                                <NoteAddIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                </Box>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer sx={{ maxHeight: 700 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, fontSize: 16, py: 1, width: { xs: 120, md: 180 } }}>Title</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: 16, py: 1, width: { xs: 80, md: 120 } }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: 16, py: 1, width: { xs: 200, md: 600 } }}>Details</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: 16, py: 1, width: 70 }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(noticesList) && noticesList.length > 0 ? (
                                    noticesList.map((notice) => {
                                        const date = new Date(notice.date);
                                        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                        const isOpen = openRow === notice._id;
                                        return (
                                            <React.Fragment key={notice._id}>
                                                <TableRow
                                                    hover
                                                    sx={{
                                                        '& td, & th': { py: 1, px: 1.5 },
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <TableCell onClick={() => handleRowClick(notice._id)}>
                                                        <Box display="flex" alignItems="center">
                                                            <IconButton size="small" sx={{ mr: 1 }}>
                                                                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                            </IconButton>
                                                            <Typography fontWeight={600} color="#270843" sx={{ fontSize: { xs: 14, md: 16 } }}>
                                                                {notice.title}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell onClick={() => handleRowClick(notice._id)}>
                                                        {dateString}
                                                    </TableCell>
                                                    <TableCell onClick={() => handleRowClick(notice._id)}>
                                                        <Tooltip title="Click to expand" arrow>
                                                            <Typography
                                                                sx={{
                                                                    maxWidth: { xs: 120, md: 500 },
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    fontSize: { xs: 13, md: 15 }
                                                                }}
                                                            >
                                                                {notice.details}
                                                            </Typography>
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Delete">
                                                            <IconButton onClick={() => handleDeleteClick(notice._id)}>
                                                                <DeleteIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                                            <Box sx={{ margin: 1, bgcolor: "#f5f7fa", borderRadius: 2, p: 2 }}>
                                                                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                                                    Notice Details
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {notice.details}
                                                                </Typography>
                                                            </Box>
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <Typography variant="h6" color="text.secondary">
                                                No notices found.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete {deleteID === currentUser._id ? "all notices" : "this notice"}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ShowNotices;
