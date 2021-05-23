import React from 'react';
import {
  Grid,
  TextField,
  MenuItem,
} from '@material-ui/core';

function KPTextfield(props) {
  const {
    pKey,
    label,
    width,
    value,
    options,
    handleChangeForm,
  } = props;

  const handleChange = (event) => handleChangeForm(pKey, event.target.value);

  return (
    options ? (
      <Grid item xs={width}>
        <TextField
          key={pKey}
          select
          fullWidth
          size='small'
          variant='outlined'
          label={label}
          value={value || ''}
          SelectProps={{
            MenuProps: {
              anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
              transformOrigin: { vertical: 'top', horizontal: 'center' },
              getContentAnchorEl: null,
            } 
          }}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem
              key={`${pKey}-${option.label}`}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    ) : (
      <Grid item xs={width}>
        <TextField
          key={pKey}
          fullWidth
          size='small'
          variant='outlined'
          label={label}
          value={value || ''}
          onChange={handleChange}
        />
      </Grid>
    )
  );
}

export default KPTextfield;
