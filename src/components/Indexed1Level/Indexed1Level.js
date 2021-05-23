import React from 'react';
import {
  Grid,
  Button,
} from '@material-ui/core';

import KPTextfield from '../KPTextfield';

function Indexed1Level(props) {
  const [values, setValues] = React.useState({
    blockSize: 4, blockSizeUnit: 1024,
    pointerSize: 4, pointerSizeUnit: 1,
    fileSize: 3, fileSizeUnit: 1024 * 1024,
    position: 128, positionUnit: 1024,
  });

  const handleChangeForm = (name, newValue) => setValues({...values, [name]: newValue});

  const handleSubmit = (event) => {
    event.preventDefault();

    const blockSize = values.blockSize * values.blockSizeUnit;
    const pointerSize = values.pointerSize * values.pointerSizeUnit;
    const postion = parseInt(values.position * values.positionUnit);

    const blockIndex = parseInt(postion / blockSize);
    const blockOffset = postion % blockSize;

    setValues({
      ...values,
      blockIndex: blockIndex.toString(),
      blockOffset: blockOffset.toString(),
    });
  }

  const options = [
    {value: 1, label: 'bytes'},
    {value: 1024, label: 'KB'},
    {value: 1024 * 1024, label: 'MB'},
  ]

  const fields = [
    { width: 9, key: 'blockSize', label: 'Block Size', value: values?.blockSize },
    { width: 3, key: 'blockSizeUnit', label: 'Unit', value: values?.blockSizeUnit, options: options },
    { width: 9, key: 'pointerSize', label: 'Pointer Size', value: values?.pointerSize },
    { width: 3, key: 'pointerSizeUnit', label: 'Unit', value: values?.pointerSizeUnit, options: options },
    { width: 9, key: 'fileSize', label: 'File Size', value: values?.fileSize },
    { width: 3, key: 'fileSizeUnit', label: 'Unit', value: values?.fileSizeUnit, options: options },
    { width: 9, key: 'position', label: 'Position', value: values?.position },
    { width: 3, key: 'positionUnit', label: 'Unit', value: values?.positionUnit, options: options },
  ];

  const res = [
    { width: 6, key: 'blockIndex', label: 'Block Index', value: values?.blockIndex },
    { width: 6, key: 'blockOffset', label: 'Offset', value: values?.blockOffset },
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

export default Indexed1Level;
