import React from 'react';
import {
  Grid,
  Button,
  Divider,
} from '@material-ui/core';

import KPTextfield from '../KPTextfield';

function DiskScheduling() {
  const [values, setValues] = React.useState({
    diskSize: 200,
    initHeadPos: 109,
    requestSeq: '98, 183, 37, 122, 14'
  });

  const handleChangeForm = (name, newValue) => setValues({...values, [name]: newValue});

  const handleSubmit = (event) => {
    event.preventDefault();

    const valCscan = C_SCAN();
    const valFcfs = FCFS();

    const valLookLeft = LOOK('left');
    const valLookRight = LOOK('right');

    const valScanLeft = SCAN('left');
    const valScanRight = SCAN('right');

    setValues({
      ...values,
      cScan: valCscan.seekCount,
      cScanSeq: valCscan.seekSequence.toString().replaceAll(',', ' '),
      fcfs: valFcfs,
      lookLeft: valLookLeft.seekCount,
      lookRight: valLookRight.seekCount,
      lookLeftSeq: valLookLeft.seekSequence.toString().replaceAll(',', ' '),
      lookRightSeq: valLookRight.seekSequence.toString().replaceAll(',', ' '),
      scanLeft: valScanLeft.seekCount,
      scanRight: valScanRight.seekCount,
      scanLeftSeq: valScanLeft.seekSequence.toString().replaceAll(',', ' '),
      scanRightSeq: valScanRight.seekSequence.toString().replaceAll(',', ' '),
    });
  }

  const C_SCAN = () => {
    let disk_size = values.diskSize;
    let arr = values.requestSeq.split(', ').map((e) => parseInt(e));
    let head = values.initHeadPos;
    let size = arr.length;

    let seek_count = 0;
    let distance, cur_track;
    let left = [], right = [];
    let seek_sequence = [];

    left.push(0);
    right.push(disk_size - 1);

    for (let i = 0; i < size; i++) {
      if (arr[i] < head) left.push(arr[i]);
      if (arr[i] > head) right.push(arr[i]);
    }

    left.sort(function(a, b) { return a - b });
    right.sort(function(a, b)  {return a - b });

    for (let i = 0; i < right.length; i++) {
      cur_track = right[i];
      if (cur_track !== 0 && cur_track !== disk_size - 1) seek_sequence.push(cur_track);
      distance = Math.abs(cur_track - head);
      seek_count += distance;
      head = cur_track;
    }

    head = 0;
    seek_count += (disk_size - 1);

    for (let i = 0; i < left.length; i++) {
      cur_track = left[i];
      if (cur_track !== 0 && cur_track !== disk_size - 1) seek_sequence.push(cur_track);
      distance = Math.abs(cur_track - head);
      seek_count += distance;
      head = cur_track;
    }

    return ({
      seekSequence: seek_sequence,
      seekCount: seek_count,
    });
  }

  const FCFS = () => {
    let arr = values.requestSeq.split(', ').map((e) => parseInt(e));
    let head = values.initHeadPos;
    let size = arr.length;

    let seek_count = 0;
    let distance = 0;
    let cur_track = 0;
  
    for (let i = 0; i < size; i++) {
      cur_track = arr[i];
      distance = Math.abs(cur_track - head);
      seek_count += distance;
      head = cur_track;
    }

    return seek_count;
  }

  const LOOK = (direction) => {
    let arr = values.requestSeq.split(', ').map((e) => parseInt(e));
    let head = values.initHeadPos;
    let size = arr.length;

    let seek_count = 0;
    let distance, cur_track;

    let left = [];
    let right = [];
    let seek_sequence = [];

    for(let i = 0; i < size; i++) {
      if (arr[i] < head) left.push(arr[i]);
      if (arr[i] > head) right.push(arr[i]);
    }

    left.sort(function(a, b){return a - b});
    right.sort(function(a, b){return a - b});

    let run = 2;
    while (run-- > 0) {
      if (direction === "left") {
        for(let i = left.length - 1; i >= 0; i--) {
          cur_track = left[i];
          seek_sequence.push(cur_track);
          distance = Math.abs(cur_track - head);
          seek_count += distance;
          head = cur_track;
        }
        direction = "right";
      }
      else if (direction === "right") {
        for(let i = 0; i < right.length; i++) {
          cur_track = right[i];
          seek_sequence.push(cur_track);
          distance = Math.abs(cur_track - head);
          seek_count += distance;
          head = cur_track;
        }
        direction = "left";
      }
    }

    return ({
      seekSequence: seek_sequence,
      seekCount: seek_count,
    });
  }

  function SCAN(direction) {
    let disk_size = values.diskSize;
    let arr = values.requestSeq.split(', ').map((e) => parseInt(e));
    let head = values.initHeadPos;
    let size = arr.length;

    let seek_count = 0;
    let distance, cur_track;
    let left = [], right = [];
    let seek_sequence = [];
 
    if (direction === 'left') left.push(0);
    else if (direction === 'right') right.push(disk_size - 1);
 
    for (let i = 0; i < size; i++) {
      if (arr[i] < head) left.push(arr[i]);
      if (arr[i] > head) right.push(arr[i]);
    }

    left.sort(function(a, b) {return a - b});
    right.sort(function(a, b) {return a - b});

    let run = 2;
    while (run-- > 0) {
      if (direction === 'left') {
        for (let i = left.length - 1; i >= 0; i--) {
          cur_track = left[i];
          if (cur_track !== 0 && cur_track !== disk_size - 1) seek_sequence.push(cur_track);
          distance = Math.abs(cur_track - head);
          seek_count += distance;
          head = cur_track;
        }
        direction = 'right';
      } else if (direction === 'right') {
        for (let i = 0; i < right.length; i++) {
          cur_track = right[i];
          if (cur_track !== 0 && cur_track !== disk_size - 1) seek_sequence.push(cur_track);
          distance = Math.abs(cur_track - head);
          seek_count += distance;
          head = cur_track;
        }
        direction = 'left';
      }
    }

    return ({
      seekSequence: seek_sequence,
      seekCount: seek_count,
    });
  }

  const fields = [
    { width: 6, key: 'diskSize', label: 'Disk Size', value: values?.diskSize },
    { width: 6, key: 'initHeadPos', label: 'Initial head position', value: values?.initHeadPos },
    { width: 12, key: 'requestSeq', label: 'Request sequence', value: values?.requestSeq },
  ];

  const totalNumber = [
    { width: 6, key: 'cScan', label: 'C-SCAN', value: values?.cScan },
    { width: 6, key: 'fcfs', label: 'FCFS', value: values?.fcfs },
    { width: 6, key: 'lookRight', label: `LOOK (from 0 to ${values?.diskSize - 1})`, value: values?.lookRight },
    { width: 6, key: 'lookLeft', label: `LOOK (from ${values?.diskSize - 1} down to 0)`, value: values?.lookLeft },
    { width: 6, key: 'scanRight', label: `SCAN (from 0 to ${values?.diskSize - 1})`, value: values?.scanRight },
    { width: 6, key: 'scanLeft', label: `SCAN (from ${values?.diskSize - 1} down to 0)`, value: values?.scanLeft },
  ];

  const requestOrder = [
    { width: 12, key: 'cScanSeq', label: 'C-SCAN', value: values?.cScanSeq },
    { width: 6, key: 'lookRightSeq', label: `LOOK (from 0 to ${values?.diskSize - 1})`, value: values?.lookRightSeq },
    { width: 6, key: 'lookLeftSeq', label: `LOOK (from ${values?.diskSize - 1} down to 0)`, value: values?.lookLeftSeq },
    { width: 6, key: 'scanRightSeq', label: `SCAN (from 0 to ${values?.diskSize - 1})`, value: values?.scanRightSeq },
    { width: 6, key: 'scanLeftSeq', label: `SCAN (from ${values?.diskSize - 1} down to 0)`, value: values?.scanLeftSeq },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {fields.map((e) => (
          <KPTextfield
            key={e?.key}
            pKey={e?.key}
            width={e?.width}
            label={e?.label}
            value={e?.value}
            options={e?.options}
            handleChangeForm={handleChangeForm}
          />
        ))}

        <Grid item xs={12}>
          <Button fullWidth variant='contained' color='primary' type='submit'>Accept</Button>
        </Grid>

        <Grid item xs={4}><Divider style={{ margin: '12px 0' }} /></Grid>
        <Grid item xs={4}><div style={{ textAlign: 'center', color: '#C4C4C4' }}>Total number</div></Grid>
        <Grid item xs={4}><Divider style={{ margin: '12px 0' }} /></Grid>

        {totalNumber.map((e) => (
          <KPTextfield
            key={e?.key}
            width={e?.width}
            label={e?.label}
            value={e?.value}
            handleChangeForm={() => {}}
          />
        ))}

        <Grid item xs={4}><Divider style={{ margin: '12px 0' }} /></Grid>
        <Grid item xs={4}><div style={{ textAlign: 'center', color: '#C4C4C4' }}>Request Order</div></Grid>
        <Grid item xs={4}><Divider style={{ margin: '12px 0' }} /></Grid>

        {requestOrder.map((e) => (
          <KPTextfield
            key={e?.key}
            width={e?.width}
            label={e?.label}
            value={e?.value}
            handleChangeForm={() => {}}
          />
        ))}
      </Grid>
    </form>
  );
}

export default DiskScheduling;
