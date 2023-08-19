import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Teacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [background, setBackground] = useState("");
    const [yearsOfExperience, setYearsOfExperience] = useState("");
    const [id, setId] = useState("");
    const [open, setOpen] = useState(false);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
    }));
      

    // make a get request to api to get all teachers
    const getTeachers = () => {
        axios.get("https://w6vtnk-5000.csb.app/teacher").then((response) => {
            console.log(response.data.teachers);
            setTeachers(response.data.teachers);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getTeachers();
    }, []);

    const handleSubmit = () => {
        const teacher = {
            firstName: firstName,
            lastName: lastName,
            background: background,
            yearsOfExperience: yearsOfExperience
        };
        axios.post("https://w6vtnk-5000.csb.app/teacher", teacher).then((response) => {
            console.log(response.data);
            getTeachers();
            setFirstName("");
            setLastName("");
            setBackground("");
            setYearsOfExperience("");
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleClose = () => {
        setOpen(false);
        setFirstName("");
        setLastName("");
        setBackground("");
        setYearsOfExperience("");
    };

    const getSingleTeacher = (id) => {
        axios.get(`https://w6vtnk-5000.csb.app/teacher/${id}`).then((response) => {
            console.log(response.data);
            setId(response.data.teacher._id);
            setFirstName(response.data.teacher.firstName);
            setLastName(response.data.teacher.lastName);
            setBackground(response.data.teacher.background);
            setYearsOfExperience(response.data.teacher.yearsOfExperience);
        }).catch((error) => {
            console.log(error);
        });
        setOpen(true);
    };

    const handleUpdate = () => {
        const teacher = {
            firstName: firstName,
            lastName: lastName,
            background: background,
            yearsOfExperience: yearsOfExperience
        };
        axios.put(`https://w6vtnk-5000.csb.app/teacher/${id}`, teacher).then((response) => {
            console.log(response.data);
            getTeachers();
            setFirstName("");
            setLastName("");
            setBackground("");
            setYearsOfExperience("");
            setOpen(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleDelete = () => {
        axios.delete(`https://w6vtnk-5000.csb.app/teacher/${id}`).then((response) => {
            console.log(response.data);
            getTeachers();
            setFirstName("");
            setLastName("");
            setBackground("");
            setYearsOfExperience("");
            setOpen(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update teacher</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Tap the information you want to update about the teacher
                </DialogContentText>
                    <Stack mt={3} spacing={5} direction="column">
                        <TextField sx={{ backgroundColor: "white" }} id="btnFirstName" label="First Name" variant="filled" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        <TextField sx={{ backgroundColor: "white" }} id="btnLastName" label="Last Name" variant="filled" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        <TextField id="btnBackground" label="Background" variant="filled" sx={{ backgroundColor: "white" }} onChange={(e) => setBackground(e.target.value)} value={background} />
                        <TextField sx={{ backgroundColor: "white" }} id="btnYearsOfExperience" label="Years of experience" variant="filled" type="number" onChange={(e) => setYearsOfExperience(e.target.value)} value={yearsOfExperience}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>        
                <Button onClick={handleUpdate}>Update</Button>
                <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Grid container justifyContent="space-evenly">
                <Grid item md={5}>
                    <Stack mt={7} spacing={5} direction="column">
                        <TextField sx={{ backgroundColor: "white" }} id="btnFirstName" label="First Name" variant="filled" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        <TextField sx={{ backgroundColor: "white" }} id="btnLastName" label="Last Name" variant="filled" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        <TextField id="btnBackground" label="Background" variant="filled" sx={{ backgroundColor: "white" }} onChange={(e) => setBackground(e.target.value)} value={background} />
                        <TextField sx={{ backgroundColor: "white" }} id="btnYearsOfExperience" label="Years of experience" variant="filled" type="number" onChange={(e) => setYearsOfExperience(e.target.value)} value={yearsOfExperience}/>
                        <Button variant="contained" onClick={() => handleSubmit()}>Create</Button>
                    </Stack>
                </Grid>
                <Grid item md={5}>
                    <Stack mt={7}>
                    <TableContainer component={Paper}>
                        <Table sx={{ maxWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Background</StyledTableCell>
                                <StyledTableCell align="right">Years of experience</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {teachers.map((teacher) => (
                                <StyledTableRow sx={{ cursor: "pointer" }} onClick={() => getSingleTeacher(teacher._id)} key={teacher._id}>
                                <StyledTableCell component="th" scope="row">
                                    {teacher.firstName} {teacher.lastName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{teacher.background}</StyledTableCell>
                                <StyledTableCell align="right">{teacher.yearsOfExperience}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default Teacher;