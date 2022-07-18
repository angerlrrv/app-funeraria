import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Select, FormControl, MenuItem, InputLabel, FormHelperText } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelectField.propTypes = {
  name: PropTypes.string,
};

export default function RHFSelectField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">Rol</InputLabel>
          <Select
            {...field}
            fullWidth
            label="Rol"
            value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            error={!!error}
            {...other}
          >
            <MenuItem value={1}>Administrador</MenuItem>
            <MenuItem value={2}>Ejecutivo</MenuItem>
            <MenuItem value={3}>Usuario</MenuItem>
            <MenuItem value={4}>Jefe Area</MenuItem>
            <MenuItem value={5}>Gerencia</MenuItem>
          </Select>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
