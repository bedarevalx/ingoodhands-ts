import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Alert, Snackbar as MUISnackbar } from '@mui/material';
import { setIsSnackbarOpen } from '../../store/app.slice';

const Snackbar = () => {
  const app = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  return (
    <MUISnackbar
      open={app.isSnackbarOpen}
      onClose={() => dispatch(setIsSnackbarOpen(false))}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity={app.snackbarSeverity} sx={{ width: '100%' }}>
        {app.snackbarText}
      </Alert>
    </MUISnackbar>
  );
};

export default Snackbar;
