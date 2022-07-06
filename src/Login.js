import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  Axios  from 'axios';
import { Link ,Navigate } from 'react-router-dom';
import Terllo from './Terllo';
import { toast, ToastContainer } from "react-toastify";

export default class Login extends Component {
    constructor(){
        super()
        this.state={
            Email:'',
            Password:"",
            data_get:[],
            id_get:"",
            navigate:"",
            send_id:[]
        }
    }

id_getting =()=>{
  const datass = this.state.data_get
    // const id_get = datass.map(d=>d.id)
    console.log('gettingg',datass)
    // this.setState({send_id:this.id_get})
}

// shouldComponentUpdate=()=>{
//   this.id_getting()
// }

    sigin=(e)=>{
        e.preventDefault()
        // console.log("--->>>>",id_get)
      Axios.post(`http://localhost:8001/user`,{
        Email:this.state.Email,
        Password:this.state.Password
      }).then((response)=>{
        console.log('ss',response.data.results)
      
        if( response.data.results.length > 0 && response.data.message === "sucess"){
            console.log("ok");
            console.log('email',response.data.results)

            this.setState({
                navigate:<Navigate to='/Terllo'></Navigate>  ,  
                data_get:response.data.results  
               
            })
            toast.success("Login Scuessfull",{autoClose:1000});    


            localStorage.setItem("user","keyyy");  

            const datass = response.data.results
            console.log("dsdsd",datass)
            const id_get = datass.map(d=>d.id)
     
            localStorage.setItem("user_email", JSON.stringify(id_get));
                       

           }else{
     alert("Plz check email or password incorrect")

           }
      })
    }
    // componentDidMount=()=>{
    //   this.sigin()
    // }
  render() {
    
    
    if(localStorage.getItem("user")=="keyyy"){
        return <Navigate to="/Terllo"/>
    }
    const getting_id = this.state.send_id
    console.log("send id", getting_id)
    const theme = createTheme();
    // console.log("jj",this.state.data)
    
    // const id_get = datass.map(d=>d.id)
    

    // let new_id = id_get
    // console.log('datass',new_id)
   
    // console.log('>>>>>>',this.state.data_get)


    return (
      <div>
{/* <Terllo  key={"value"}/> */}
<ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <p>{this.state.navigate}</p>
            <p>{this.state.data}</p>
            <Box component="form"  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e)=>this.setState({Email:e.target.value})}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>this.setState({Password:e.target.value})}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={this.sigin}
              >
                Sign In
              </Button>
              {/* <Button onClick={this.id_getting}>dhfd</Button> */}
              <Grid container>
                
                <Grid item>
                  <Link to="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
              
              {/* {"dd"?<Terllo dats={this.state.data_get}/>:""} */}

              {/* <Terllo data={getting_id}/> */}

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    {/* <Terllo datass="sndsnsjnd"/> */}
      </div>
    )
  }
}
