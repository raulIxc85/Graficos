import SideNav from '../nav/SideNav'
import Box from '@mui/material/Box';
import NavBar from '../nav/NavBar';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import '../../assets/css/Dash.css';

import PieVentas from '../charts/PieChartVentas';
import PopulationChart from '../charts/PopulationChart';
import BarChartProductos from '../charts/BarChartProductos';
import BarChartComboProductos from '../charts/BarChartComboProductos';

export default function Store() {


  return (
    < div className='bgColor'>
      <NavBar />
      <Box height={70} />
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Stack spacing={2} >
                <Card >
                  <Stack sx={{ height: 40 + "vh" }}>
                    <PieVentas />
                  </Stack>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={7}>
              <Stack spacing={2} >
                <Card >
                  <Stack sx={{ height: 40 + "vh" }}>
                    <PopulationChart />
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Box height={15} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Stack spacing={2} >
                <Card >
                  <Stack sx={{ height: 40 + "vh" }}>
                    <BarChartProductos />
                  </Stack>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={2} >
                <Card >
                  <Stack sx={{ height: 40 + "vh" }}>
                    <BarChartComboProductos />
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}
