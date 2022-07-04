import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios'

export default class Register extends Component {
    constructor(){
        super()
        this.state=({
            First_name:'',
            Last_name:'',
            Email:'',
            Password:'',
            confirmpassword:''
        })
    }
    register=(e)=>{
        e.preventDefault()
        const { Email, Password, confirmpassword } = this.state;
        let emailexp = ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if (!Email.match(emailexp)) {
            alert("Please enter valid email id")
        }
        else if (Password.length < 4) {
            alert("password  4 charecters")
        }
        else if (Password !== confirmpassword) {
            alert("password  not match")
        }
        
        else {
            Axios.post(`http://localhost:8001/user_login`,{
                
            First_name:this.state.First_name,
            Last_name:this.state.Last_name,
            email:this.state.Email,
                password:this.state.Password,
                
            }).then((response)=>{
                console.log('success',response)
                this.setState({First_name:'',Last_name:"",Email:"",Password:"",confirmpassword:"",})
            }).catch(err=>{
                console.log(err)
          
            })
        }
    
    }
    
  render() {
    const theme = createTheme();
    console.log(this.state.First_name)
    return (
      <div>


<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            {/* <LockOutlinedIcon/> */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e)=>this.setState({First_name:e.target.value})}
                  
          
                  
          
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>this.setState({Last_name:e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>this.setState({Email:e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>this.setState({Password:e.target.value})}
                />
                
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  name="confrom password"
                  label="confrom Password"
                  type="password"
                  id="confrom password"
                  autoComplete="new-password"
                  onChange={(e)=>this.setState({confirmpassword:e.target.value})}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={this.register}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/Login' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
      </div>
    )
  }
}
