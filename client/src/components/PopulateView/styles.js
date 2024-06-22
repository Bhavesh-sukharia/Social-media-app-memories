import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '3rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  formHeader: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: theme.spacing(1),
    border: "2px solid grey",
    borderRadius: theme.shape.borderRadius,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  headerIcon: {
    padding: '8px',
    borderRadius: '50%',
  },
  headerTitle: {
      paddingLeft: theme.spacing(1),
  },
}));