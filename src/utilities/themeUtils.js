import { createTheme} from '@material-ui/core/styles';

// Define your theme
export const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#4CAF50',
      },
      delete: {
        main: '#cc0000',
      },
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 8,
        },
        containedPrimary: {
          color: '#ffffff',
          backgroundColor: '#2196f3',
          '&:hover': {
            backgroundColor: '#1976d2',
          },
        },
        containedSecondary: {
          color: '#ffffff',
          backgroundColor: '#4CAF50',
          '&:hover': {
            backgroundColor: '#45a049',
          },
        },
        containeddelete: {
          color: '#ffffff',
          backgroundColor: '#cc0000',
          '&:hover': {
            backgroundColor: '#d32f2f',
          },
        },
      },
    },
  });