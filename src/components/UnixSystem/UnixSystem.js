import React from 'react';
import {
  Grid,
  Button,
  Divider,
} from '@material-ui/core';

import KPTextfield from '../KPTextfield';

function UnixSystem() {
  const [values, setValues] = React.useState({
    directPoints: 12,
    single: 1, double: 1, triple: 1,
    blockSize: 2, blockSizeUnit: 1024,
    pointerSize: 4, pointerSizeUnit: 1,
    position: 8388612, positionUnit: 1,
  });

  const handleChangeForm = (name, newValue) => setValues({...values, [name]: newValue});

  const handleSubmit = (event) => {
    event.preventDefault();

    setValues({
      ...values,
      blockSize: parseFloat(values.blockSize), blockSizeUnit: parseInt(values.blockSizeUnit),
      pointerSize: parseFloat(values.pointerSize), pointerSizeUnit: parseInt(values.pointerSizeUnit),
      localAddress: parseFloat(values.position)
    });

    const blockSize = values.blockSize * values.blockSizeUnit;
    const pointerSize = values.pointerSize * values.pointerSizeUnit;
    const position = parseInt(values.position * values.positionUnit);

    const totalPointerPerBlock = parseInt(blockSize / pointerSize);

    const indectPointer = totalPointerPerBlock;
    const doublePointer = indectPointer * totalPointerPerBlock;
    const triplePointer = doublePointer * totalPointerPerBlock;
    const directPointer = values.directPoints;

    const directPointerBlockId = parseInt(position / blockSize);
    const directPointerBlockOffset = position % blockSize;

    const indectPointerBlockId = parseInt(position / blockSize);
    const indectPointerBlockNumber = indectPointerBlockId - directPointer;
    const indectPointerBlockOffset = position % blockSize;


    const doublePointerBlockId = parseInt(position / blockSize);
    const doublePointerBlockNumber = Math.round(doublePointerBlockId / totalPointerPerBlock + 0.49) - 2;
    const doublePointerDataBlock = (doublePointerBlockId + totalPointerPerBlock - directPointer) % totalPointerPerBlock;
    const doublePointerBlockOffset = position % blockSize;


    const triplePointerBlockId = parseInt(position / blockSize);
    const triplePointerBlockInLevel3 = triplePointerBlockId - indectPointer - directPointer - doublePointer;
    const triplePointerIndex2 = parseInt(triplePointerBlockInLevel3 / (totalPointerPerBlock * totalPointerPerBlock));
    const triplePointerIndex3 = parseInt(triplePointerBlockInLevel3 % (totalPointerPerBlock * totalPointerPerBlock) / totalPointerPerBlock);
    const triplePointerDataBlock = triplePointerBlockInLevel3 % indectPointer;
    const triplePointerBlockOffset = position % blockSize;

    setValues({
      ...values,
      indectPointer: indectPointer.toString(),
      doublePointer: doublePointer.toString(),
      triplePointer: triplePointer.toString(),
      directPointer: directPointer.toString(),

      singleBlockNumber: indectPointerBlockNumber.toString(),
      singleBlockOffset: indectPointerBlockOffset.toString(),

      doubleBlockIndex: doublePointerBlockNumber.toString(),
      doubleBlockNumber: doublePointerDataBlock.toString(),
      doubleBlockOffset: doublePointerBlockOffset.toString(),

      triplePointerLevel2: triplePointerIndex2.toString(),
      triplePointerLevel3: triplePointerIndex3.toString(),
      tripleBlockNumber: triplePointerDataBlock.toString(),
      tripleBlockOffset: triplePointerBlockOffset.toString(),
    });
  }

  const options = [
    {value: 1, label: 'bytes'},
    {value: 1024, label: 'KB'},
    {value: 1024 * 1024, label: 'MB'},
  ]

  const fields = [
    { width: 12, key: 'directPoints', label: 'Direct Points', value: values?.directPoints },
    { width: 4, key: 'single', label: 'Single Indirect', value: values?.single },
    { width: 4, key: 'double', label: 'Double Indirect', value: values?.double },
    { width: 4, key: 'triple', label: 'Triple Indirect', value: values?.triple },
    { width: 9, key: 'blockSize', label: 'Block Size', value: values?.blockSize },
    { width: 3, key: 'blockSizeUnit', label: 'Unit', value: values?.blockSizeUnit, options: options },
    { width: 9, key: 'pointerSize', label: 'Pointer Size', value: values?.pointerSize },
    { width: 3, key: 'pointerSizeUnit', label: 'Unit', value: values?.pointerSizeUnit, options: options },
    { width: 9, key: 'position', label: 'Position', value: values?.position },
    { width: 3, key: 'positionUnit', label: 'Unit', value: values?.positionUnit, options: options },
  ];

  const res = [
    { width: 3, key: 'directPointer', label: 'Direct Size', value: values?.directPointer },
    { width: 3, key: 'indectPointer', label: 'Indect Size', value: values?.indectPointer },
    { width: 3, key: 'doublePointer', label: 'Double Size', value: values?.doublePointer },
    { width: 3, key: 'triplePointer', label: 'Triple Size', value: values?.triplePointer },
  ];

  const single = [
    { width: 6, key: 'singleBlockNumber', label: 'Block Number', value: values?.singleBlockNumber },
    { width: 6, key: 'singleBlockOffset', label: 'Block Offset', value: values?.singleBlockOffset },
  ];

  const double = [
    { width: 4, key: 'doubleBlockIndex', label: 'Block Index', value: values?.doubleBlockIndex },
    { width: 4, key: 'doubleBlockNumber', label: 'Block Number', value: values?.doubleBlockNumber },
    { width: 4, key: 'doubleBlockOffset', label: 'Block Offset', value: values?.doubleBlockOffset },
  ];

  const triple = [
    { width: 3, key: 'triplePointerLevel2', label: 'Index Lv.2', value: values?.triplePointerLevel2 },
    { width: 3, key: 'triplePointerLevel3', label: 'Index Lv.3', value: values?.triplePointerLevel3 },
    { width: 3, key: 'tripleBlockNumber', label: 'Block Number', value: values?.tripleBlockNumber },
    { width: 3, key: 'tripleBlockOffset', label: 'Block Offset', value: values?.tripleBlockOffset },
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

        <Grid item xs={3}><Divider style={{ margin: '12px 0' }} /></Grid>
        <Grid item xs={6}><div style={{ textAlign: 'center', color: '#C4C4C4' }}>SINGLE INDIRECT POINTER</div></Grid>
        <Grid item xs={3}><Divider style={{ margin: '12px 0' }} /></Grid>

        {single.map((e) => (
          <KPTextfield
            key={e?.key}
            width={e?.width}
            label={e?.label}
            value={e?.value}
            handleChangeForm={() => {}}
          />
        ))}

        <Grid item xs={3}><Divider style={{ margin: '12px 0' }} /></Grid>
        <Grid item xs={6}><div style={{ textAlign: 'center', color: '#C4C4C4' }}>DOUPLE INDIRECT POINTER</div></Grid>
        <Grid item xs={3}><Divider style={{ margin: '12px 0' }} /></Grid>

        {double.map((e) => (
          <KPTextfield
            key={e?.key}
            width={e?.width}
            label={e?.label}
            value={e?.value}
            handleChangeForm={() => {}}
          />
        ))}

        <Grid item xs={3}><Divider style={{ margin: '12px 0' }} /></Grid>
        <Grid item xs={6}><div style={{ textAlign: 'center', color: '#C4C4C4' }}>TRIPLE INDIRECT POINTER</div></Grid>
        <Grid item xs={3}><Divider style={{ margin: '12px 0' }} /></Grid>

        {triple.map((e) => (
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

export default UnixSystem;
