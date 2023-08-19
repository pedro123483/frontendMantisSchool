import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState } from 'react';
import Face2Icon from '@mui/icons-material/Face2';
import Face6Icon from '@mui/icons-material/Face6';
import ClassIcon from '@mui/icons-material/Class';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';

const Menu = () => {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    return (
        <Box sx={{ width: 1250 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
            }}>
            <BottomNavigationAction onClick={() => navigate("/")} label="Teacher" icon={<Face2Icon />} />
            <BottomNavigationAction onClick={() => navigate("/student")} label="Student" icon={<Face6Icon />} />
            <BottomNavigationAction onClick={() => navigate("/class")} label="Class" icon={<ClassIcon />} />
            </BottomNavigation>
        </Box>
    );
};

export default Menu;