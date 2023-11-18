
import NavBar from '../nav/NavBar';
import SideNav from '../nav/SideNav'
import Box from '@mui/material/Box';
import BarChart2 from '../charts/BarChart2'

export default function Informe() {

    return (
        <>
            <NavBar />
            <Box height={70} />
            <Box sx={{ display: 'flex' }}>
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                </Box>
            </Box>

        </>
    )
}
