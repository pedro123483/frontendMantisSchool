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

const Student = () => {
    const [students, setStudents] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
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
    const getStudents = () => {
        axios.get("https://w6vtnk-5000.csb.app/student").then((response) => {
            console.log(response.data.students);
            setStudents(response.data.students);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getStudents();
    }, []);

    const handleSubmit = () => {
        const teacher = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            gender: gender,
            course: course,
        };
        axios.post("https://w6vtnk-5000.csb.app/student", teacher).then((response) => {
            console.log(response.data);
            getStudents();
        }).catch((error) => {
            console.log(error);
        });
        setFirstName("");
        setLastName("");
        setAge("");
        setGender("");
        setCourse("");
    };

    const handleClose = () => {
        setOpen(false);
        setFirstName("");
        setLastName("");
        setAge("");
        setGender("");
        setCourse("");
    };

    const getSingleStudent = (id) => {
        axios.get(`https://w6vtnk-5000.csb.app/student/${id}`).then((response) => {
            console.log(response.data);
            setId(response.data.student._id);
            setFirstName(response.data.student.firstName);
            setLastName(response.data.student.lastName);
            setAge(response.data.student.age);
            setGender(response.data.student.gender);
            setCourse(response.data.student.course);
        }).catch((error) => {
            console.log(error);
        });
        setOpen(true);
    };

    const handleUpdate = () => {
        const student = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            gender: gender,
            course: course,
        };
        axios.put(`https://w6vtnk-5000.csb.app/student/${id}`, student).then((response) => {
            console.log(response.data);
            getStudents();
            setFirstName("");
            setLastName("");
            setAge("");
            setGender("");
            setCourse("");
            setOpen(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    const handleDelete = () => {
        axios.delete(`https://w6vtnk-5000.csb.app/student/${id}`).then((response) => {
            console.log(response.data);
            getStudents();
            setFirstName("");
            setLastName("");
            setAge("");
            setGender("");
            setCourse("");
            setOpen(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update student</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Tap the information you want to update about the student
                </DialogContentText>
                    <Stack mt={3} spacing={5} direction="column">
                    <TextField sx={{ backgroundColor: "white" }} id="btnFirstName" label="First Name" variant="filled" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        <TextField sx={{ backgroundColor: "white" }} id="btnLastName" label="Last Name" variant="filled" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        <TextField id="btnAge" label="Age" type="number" variant="filled" sx={{ backgroundColor: "white" }} onChange={(e) => setAge(e.target.value)} value={age} />
                        <TextField sx={{ backgroundColor: "white" }} id="btnGender" label="Gender" variant="filled" onChange={(e) => setGender(e.target.value)} value={gender}/>
                        <TextField sx={{ backgroundColor: "white" }} id="btnCourse" label="Course" variant="filled" onChange={(e) => setCourse(e.target.value)} value={course}/>
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
                    <Stack mt={7} spacing={3} direction="column">
                        <TextField sx={{ backgroundColor: "white" }} id="btnFirstName" label="First Name" variant="filled" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        <TextField sx={{ backgroundColor: "white" }} id="btnLastName" label="Last Name" variant="filled" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        <TextField id="btnAge" label="Age" type="number" variant="filled" sx={{ backgroundColor: "white" }} onChange={(e) => setAge(e.target.value)} value={age} />
                        <TextField sx={{ backgroundColor: "white" }} id="btnGender" label="Gender" variant="filled" onChange={(e) => setGender(e.target.value)} value={gender}/>
                        <TextField sx={{ backgroundColor: "white" }} id="btnCourse" label="Course" variant="filled" onChange={(e) => setCourse(e.target.value)} value={course}/>
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
                                <StyledTableCell align="right">Age</StyledTableCell>
                                <StyledTableCell align="right">Gender</StyledTableCell>
                                <StyledTableCell align="right">Course</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {students.map((student) => (
                                <StyledTableRow sx={{ cursor: "pointer" }} onClick={() => getSingleStudent(student._id)} key={student._id}>
                                <StyledTableCell component="th" scope="row">
                                    {student.firstName} {student.lastName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{student.age}</StyledTableCell>
                                <StyledTableCell align="right">{student.gender}</StyledTableCell>
                                <StyledTableCell align="right">{student.course}</StyledTableCell>
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

export default Student;