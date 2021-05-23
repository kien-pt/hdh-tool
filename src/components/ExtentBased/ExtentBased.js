import React from 'react';
import {
  Grid,
  Button,
} from '@material-ui/core';

import KPTextfield from '../KPTextfield';

function ExtentBased() {
  const [values, setValues] = React.useState({
    blockNumber: 100,
    blockSize: 2, blockSizeUnit: 1024,
    fileSize: 12.3, fileSizeUnit: 1024 * 1024,
    position: 50.5, positionUnit: 1024,
  });

  const handleChangeForm = (name, newValue) => setValues({...values, [name]: newValue});

  const handleSubmit = (event) => {
    event.preventDefault();

    setValues({
      ...values,
      blockNumber: parseInt(values.blockNumber),
      blockSize: parseFloat(values.blockSize), blockSizeUnit: parseInt(values.blockSizeUnit),
      fileSize: parseFloat(values.fileSize), fileSizeUnit: parseInt(values.fileSizeUnit),
      position: parseFloat(values.position), positionUnit: parseInt(values.positionUnit),
    });

    const blockSize = values.blockSize * values.blockSizeUnit;
    const postion = values.position * values.positionUnit;

    const extentId = parseInt(postion / (blockSize * values.blockNumber));
    const blockOffsetId = parseInt(postion / blockSize) % values.blockNumber;
    const blockOffset = postion % blockSize;

    setValues({
      ...values,
      extentId: extentId.toString(),
      blockOffsetId: blockOffsetId.toString(),
      blockOffset: blockOffset.toString(),
    });
  }

  const options = [
    {value: 1, label: 'bytes'},
    {value: 1024, label: 'KB'},
    {value: 1024 * 1024, label: 'MB'},
  ]

  const fields = [
    { width: 12, key: 'blockNumber', label: 'Block Number', value: values?.blockNumber },
    { width: 9, key: 'blockSize', label: 'Block Size', value: values?.blockSize },
    { width: 3, key: 'blockSizeUnit', label: 'Unit', value: values?.blockSizeUnit, options: options },
    { width: 9, key: 'fileSize', label: 'File Size', value: values?.fileSize },
    { width: 3, key: 'fileSizeUnit', label: 'Unit', value: values?.fileSizeUnit, options: options },
    { width: 9, key: 'position', label: 'Position', value: values?.position },
    { width: 3, key: 'positionUnit', label: 'Unit', value: values?.positionUnit, options: options },
  ];

  const res = [
    { width: 4, key: 'extentId', label: 'Extent Number', value: values?.extentId },
    { width: 4, key: 'blockOffsetId', label: 'Block Number', value: values?.blockOffsetId },
    { width: 4, key: 'blockOffset', label: 'Offset', value: values?.blockOffset },
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

        {res.map((e) => (
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

export default ExtentBased;
