import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

const ChooseClass = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: teacherId } = useParams();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    const navigateHandler = (classID) => {
        navigate(`/Admin/teachers/choosesubject/${classID}/${teacherId}`);
    };

    const sclassColumns = [{ id: 'name', label: 'Class Name', minWidth: 170 }];

    const sclassRows = sclassesList?.map(sclass => ({
        name: sclass.sclassName,
        id: sclass._id,
    }));

    const SclassButtonHaver = ({ row }) => (
        <PurpleButton variant="contained" onClick={() => navigateHandler(row.id)}>
            Choose
        </PurpleButton>
    );

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : getresponse ? (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button variant="contained" onClick={() => navigate("/Admin/addclass")}>
                        Add Class
                    </Button>
                </Box>
            ) : (
                <>
                    <Typography variant="h6" gutterBottom>
                        Choose a Class for the Teacher
                    </Typography>
                    {sclassesList.length > 0 && (
                        <TableTemplate
                            buttonHaver={SclassButtonHaver}
                            columns={sclassColumns}
                            rows={sclassRows}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default ChooseClass;
