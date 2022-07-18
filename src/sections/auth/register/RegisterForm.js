import * as Yup from 'yup';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment , Button} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelectField, RHFTextField } from '../../../components/hook-form';


import moment from "moment";
import useApi from './../../../hooks/useApi';
import MsgInfo from './MsgInfo';

// ----------------------------------------------------------------------

export default function RegisterForm() {
   const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const form = useRef(null);
  const { loading, data, fetchApi, error } = useApi();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre Requerido'),
    apellido: Yup.string().required('Apellido Requerido'),
    email: Yup.string().email('Email invalido').required('Email es Requerido'),
    clave: Yup.string().required('Clave es Requerido'),
    rol_idrol: Yup.string().required('Rol es Requerido'),
  });

  const defaultValues = {
    nombre: '',
    apellido: '',
    email: '',
    clave: '',
    rol_idrol: '',
  };

 const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const hashPassword = async (data) => {
    const password = data;
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return hashedPassword;
  };
  const onSubmit = async (data) => {
     const now = moment().format("YYYY-MM-DD HH:mm:ss"); 
    const bcrypt = require('bcryptjs');
    const saltRounds = 10;
    const { clave } = data;
    const hashedPassword = bcrypt.hashSync(clave, saltRounds);
  

   

     const infoAdd = {
       activo: 1,
       creado: now,
       clave: hashedPassword,
     };
  
    const addData = { ...data, ...infoAdd }
    
   await fetchApi(addData, `v1/usuario`);
    !error && reset()
    setOpen(true)
  }; 

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="nombre" label="Nombre" />
          <RHFTextField name="apellido" label="Apellido" />
        </Stack>
        <RHFSelectField name="rol_idrol" label="Rol" />
        <RHFTextField name="email" label="Email" />
        <RHFTextField
          name="clave"
          label="Clave"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> <LoadingButton
          
          fullWidth size="large" type="submit" variant="contained" loading={loading}>
          Guardar
        </LoadingButton>
<Button color='error' variant='contained' onClick={()=>reset()} size="large">Cancelar </Button>
       
        <MsgInfo 
        color={error!==null ? "error" : "success"}
        setOpen={setOpen} 
        open={open} 
        msg={error!==null ? error : data}/>
      
      </Stack>
    </FormProvider>
  );
}