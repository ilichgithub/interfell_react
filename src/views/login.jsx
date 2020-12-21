import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ApiUrl } from '../services/apirest';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  let errorLogin = false;
  let errorMsg = "Error";

  let history = useHistory();

  const manejadorSubmit = e => {
    e.preventDefault();
  }

  const changeEmail = async (value) => {
    setEmail(value);
  };
  const changePassword = async (value) => {
    setPassword(value);
  };

  const manejadorBoton = () => {
      let url = `${ApiUrl}${email}`;
      //axios.put(url,{'password':password,'app':'APP_BCK'})
      axios({method:'PUT',params:null,url,data:{'password':password,'app':'APP_BCK'},headers:{ 'Content-Type': 'application/json', Accept: 'application/json', 'password':password,'app':'APP_BCK' }})
      .then( response => {
          if (response.statusText === "OK"){
            sessionStorage.setItem("token", response.data.sessionTokenBck);
            history.push("/home")
          }else{
            errorLogin = true;
              console.log(response.statusText);
          }
      })
      .catch(error => {
        errorLogin = true;
          console.log(error);
      })

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={manejadorSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email" 
            onChange={(e) => changeEmail(e.target.value)} 
            //onChange={manejadorChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => changePassword(e.target.value)} 
            //onChange={manejadorChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={manejadorBoton}
          >
            Sign In
          </Button>

          { errorLogin === true && 
            <div class="alert alert-danger" role="alert">
                { errorMsg }
            </div>
          }
        </form>
      </div>
    </Container>
  );
}