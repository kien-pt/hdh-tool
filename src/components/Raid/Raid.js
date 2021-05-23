import React from 'react';
import {
  Grid,
  Button,
  Divider,
} from '@material-ui/core';

import KPTextfield from '../KPTextfield';

import raid_0 from '../../assets/raid_0.jpg';
import raid_1 from '../../assets/raid_1.jpg';
import raid_01 from '../../assets/raid_01.jpg';
import raid_10_a from '../../assets/raid_10_a.jpg';
import raid_10_b from '../../assets/raid_10_b.jpg';
import raid_5 from '../../assets/raid_5.jpg';
import raid_6 from '../../assets/raid_6.jpg';
import raid_50 from '../../assets/raid_50.jpg';
import raid_60 from '../../assets/raid_60.jpg';
import raid_100 from '../../assets/raid_100.jpg';

function Raid() {
  const [value, setValue] = React.useState(0);

  const list = [
    {
      name: 'RAID 0',
      src: raid_0,
      speed: 'x2',
      volumn: 'x2',
      failure: '0',
    },
    {
      name: 'RAID 1',
      src: raid_1,
      speed: 'x1',
      volumn: '/2',
      failure: '1',
    },
    {
      name: 'RAID 0 + 1',
      src: raid_01,
      speed: 'x3',
      volumn: '/2',
      failure: '2',
    },
    {
      name: 'RAID 1 + 0 (a)',
      src: raid_10_a,
      speed: 'x3',
      volumn: '/2',
      failure: '3',
    },
    {
      name: 'RAID 1 + 0 (b)',
      src: raid_10_b,
      speed: 'x2',
      volumn: '/2',
      failure: '2',
    },
    {
      name: 'RAID 5',
      src: raid_5,
      speed: 'x3',
      volumn: '3/4',
      failure: '1',
    },
    {
      name: 'RAID 6',
      src: raid_6,
      speed: 'x3',
      volumn: '3/5',
      failure: '2',
    },
    {
      name: 'RAID 50',
      src: raid_50,
      speed: 'x6',
      volumn: '6/9',
      failure: '3',
    },
    {
      name: 'RAID 60',
      src: raid_60,
      speed: 'x4',
      volumn: '4/8',
      failure: '4',
    },
    {
      name: 'RAID 100',
      src: raid_100,
      speed: 'x4',
      volumn: '4/8',
      failure: '4',
    }
  ]

  return (
    <>
      <img src={list[value].src} style={{ width: '100%' }} />
      <Grid container spacing={2}>
        <Grid item xs={4}>{`Speed: ${list[value].speed}`}</Grid>
        <Grid item xs={4} style={{ textAlign: 'center' }}>{`Volumn: ${list[value].volumn}`}</Grid>
        <Grid item xs={4} style={{ textAlign: 'end' }}>{`Failure: ${list[value].failure}`}</Grid>
        {list.map((e, id) => (
          <Grid item xs={4}>
            <Button
              fullWidth
              color={value === id ? 'primary' : 'default'}
              variant={value === id ? 'contained' : 'outlined'}
              onClick={() => setValue(id)}
            >
              {e.name}
          </Button>
          </Grid>
          
        ))}
      </Grid>
      
    </>
  );
}

export default Raid;
