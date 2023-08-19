import { FilledInput, Grid } from "@mui/material";
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
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { OutlinedInput } from "@mui/material";

const Class = () => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [allStudents, setAllStudents] = useState([]);
    const [openSeeStudents, setOpenSeeStudents] = useState(false);
    const [name, setName] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [studentsToRegister, setStudentsToRegister] = useState([]);
    const [teacherToRegister, setTeacherToRegister] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
    const getClasses = () => {
        axios.get("https://w6vtnk-5000.csb.app/class").then((response) => {
            console.log(response.data.subjects);
            setClasses(response.data.subjects);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getClasses();
    }, []);

    const handleSubmit = () => {
        const subject = {
            name: name,
            teacher: teacherToRegister,
            students: studentsToRegister,
            startDate: startDate,
            endDate: endDate,
        };
        axios.post("https://w6vtnk-5000.csb.app/class", subject).then((response) => {
            console.log(response.data);
            getClasses();
        }).catch((error) => {
            console.log(error);
        });
        setName("");
        setTeacherToRegister("");
        setStudentsToRegister("");
        setStartDate("");
        setEndDate("");
    };

    const handleClose = () => {
        setOpen(false);
        setName("");
        setTeacherToRegister("");
        setStudentsToRegister("");
        setStartDate("");
        setEndDate("");
    };
    const handleSeeStudents = (id) => {
        axios.get(`https://w6vtnk-5000.csb.app/class/${id}`).then((response) => {
            console.log(response.data);
            setStudents(response.data.subject.students);
            console.log(students);
        }).catch((error) => {
            console.log(error);
        });
        setOpenSeeStudents(true);  
    };

    const handleCloseStudents = () => {
        setOpenSeeStudents(false);
    };

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

    const getStudents = () => {
        axios.get("https://w6vtnk-5000.csb.app/student").then((response) => {
            console.log(response.data.students);
            setAllStudents(response.data.students);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <>
            <Dialog open={openSeeStudents} onClose={handleCloseStudents}>
                <DialogTitle>Students enrolled in this class</DialogTitle>
                <DialogContent>
                {students.map((student) => (
                    <DialogContentText>
                        {student.firstName} {student.lastName}
                    </DialogContentText>
                ))}
                </DialogContent>
            </Dialog>
            <Grid container justifyContent="space-evenly">
                <Grid item md={5}>
                    <Stack mt={7} spacing={3} direction="column">
                        <TextField sx={{ backgroundColor: "white" }} id="btnName" label="Class Name" variant="filled" onChange={(e) => setName(e.target.value)} value={name} />
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-filled-label">Teacher</InputLabel>
                        <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={teacherToRegister}
                        onChange={(e) =>(setTeacherToRegister(e.target.value))}
                        >
                        {teachers.map((teacher) => (
                            <MenuItem key={teacher._id} value={teacher._id}>{teacher.firstName} {teacher.lastName}</MenuItem>
                        ))}
                        </Select>
                        </FormControl>
                        <FormControl variant="filled" sx={{ m: 1 }}>
                            <InputLabel id="demo-multiple-name-label">Students</InputLabel>
                            <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={studentsToRegister || []}
                            onChange={(e) => 
                                setStudentsToRegister(e.target.value)
                            }
                            onClick={() => console.log(studentsToRegister)}
                            >
                            {allStudents.map((currentStudent) => (
                                <MenuItem
                                key={currentStudent._id}
                                value={currentStudent._id}
                                >
                                {currentStudent.firstName} {currentStudent.lastName}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <TextField sx={{ backgroundColor: "white" }} id="btnStartDate" label="Start Date" type="date" variant="filled" onChange={(e) => setStartDate(e.target.value)} value={startDate}/>
                        <TextField sx={{ backgroundColor: "white" }} id="btnEndDate" type="date" label="End Date"  variant="filled" onChange={(e) => setEndDate(e.target.value)} value={endDate}/>
                        <Button variant="contained" onClick={() => handleSubmit()}>Create</Button>
                    </Stack>
                </Grid>
                <Grid item md={5}>
                    <Stack mt={7}>
                    <TableContainer sx={{ minWidth: 550, maxHeight: 450 }} component={Paper}>
                        <Table stickyHeader aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Teacher</StyledTableCell>
                                <StyledTableCell align="right">Students</StyledTableCell>
                                <StyledTableCell align="right">Start Date</StyledTableCell>
                                <StyledTableCell align="right">End Date</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {classes.map((subject) => (
                                <StyledTableRow sx={{ cursor: "pointer" }} key={subject._id}>
                                <StyledTableCell component="th" scope="row">
                                    {subject.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{subject.teacher.firstName} {subject.teacher.lastName}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <button onClick={() => handleSeeStudents(subject._id)}>See students</button>
                                </StyledTableCell>
                                <StyledTableCell align="right">{subject.startDate}</StyledTableCell>
                                <StyledTableCell align="right">{subject.endDate}</StyledTableCell>
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

export default Class;