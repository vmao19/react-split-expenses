import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TripCard from './TripCard'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export default function TripLayout({ trips }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(trips).map((trip, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>
              <TripCard tripData={trip} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}