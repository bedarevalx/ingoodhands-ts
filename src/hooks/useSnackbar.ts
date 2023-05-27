import {
  setIsSnackbarOpen,
  setSnackbarSeverity,
  setSnackbarText,
} from '../store/app.slice';
import { useAppDispatch } from './useRedux';

export const useSnackbar = () => {
  const dispatch = useAppDispatch();

  const showSuccess = (text: string) => {
    dispatch(setSnackbarSeverity('success'));
    dispatch(setSnackbarText(text));
    dispatch(setIsSnackbarOpen(true));
  };
  const showError = (text: string) => {
    dispatch(setSnackbarSeverity('error'));
    dispatch(setSnackbarText(text));
    dispatch(setIsSnackbarOpen(true));
  };

  return { showSuccess, showError };
};
