import { Grid, styled } from '@mui/material';
import { Fragment } from 'react';

import StatCards from './shared/StatCards';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Analytics = () => {
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <StatCards />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
