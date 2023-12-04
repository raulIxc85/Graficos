
import NavBar from '../../nav/NavBar';
import SideNav from '../../nav/SideNav'
import Box from '@mui/material/Box';
import ClientList from './ClientList';

export default function Clients() {

  return (
    <>
      <NavBar />
      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ClientList />
        </Box>
      </Box>

    </>
  )
}
