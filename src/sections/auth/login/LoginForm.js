import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import useApi from './../../../hooks/useApi';
// ----------------------------------------------------------------------
import MsgInfo from '../register/MsgInfo';
export default function LoginForm() {
  const navigate = useNavigate();
 const { loading, data, fetchApi, error } = useApi();
  const [showPassword, setShowPassword] = useState(false);
 const [open, setOpen] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Usuario Requerido').required('El usuario es su Email'),
    clave: Yup.string().required('Clave Requerida'),
  });

  const defaultValues = {
    email: '',
    clave: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    //navigate('/dashboard/app', { replace: true });
    await fetchApi(data, `v1/login`);
    console.log(error);
     !error && navigate('/dashboard/app', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Usuario" />

        <RHFTextField
          name="clave"
          label="Clave"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/*   <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ mt: 2 }}>
        Entrar
      </LoadingButton>
      <MsgInfo
        color={error !== null ? 'error' : 'success'}
        setOpen={setOpen}
        open={open}
        msg={error !== null ? error : data}
      />
    </FormProvider>
  );
}
