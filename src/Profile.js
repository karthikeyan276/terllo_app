import React, { Component } from 'react'
import Axios from 'axios'
import { Button } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link,Navigate } from 'react-router-dom';

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            profile_data:[],
            local_id:[]
        }
    }

    // idget=()=>{
        
    //         Axios.post(`http://localhost:8001/profile`,{
    //             local_ids:this.state.local_id
         
    //     }).then((response)=>{
    //       console.log('sucess',response.data.results)
         
      
          
    //     })
            
    //    }
    view=()=>{
        Axios.post(`http://localhost:8001/profile`,{
                        local_id:this.state.local_id
                 
                }).then((response)=>{
                  console.log('sucess',response.data.results) 

                  
                  const uuuu = response.data.results.find(d=>d.First_name)
                  let arr =[]
                  arr.push(uuuu)
                  this.setState({profile_data:arr}) 
                  console.log("121212",uuuu)
                })
    }
       idget=()=>{
        let user_email = JSON.parse(localStorage.getItem("user_email"))||[]
            console.log("user_email",user_email)
            this.setState({local_id:user_email})

            
       }
    componentDidMount=()=>{

     this.idget()
     
    
    }
    logout_1=()=>{
      let new_1 = localStorage.getItem('user')
      alert("are you sure")
      if(new_1!==null){
        localStorage.removeItem('user');
       this.setState({navigate:<Navigate to='/Login'></Navigate>})
        
      }
      else{
        alert("plz wait ")
      }
    }

  
  render() {
    if(localStorage.getItem("user")==null){
      return <Navigate to="/Login"/>
  }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      const MyButton = styled(Button)({
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      });

      const MyButton_1 = styled(Button)({
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
      });

      const profile_data = this.state.profile_data

      const uuuu = profile_data.find(d=>d.First_name)
      let arr =[]
      arr.push(uuuu)
      console.log("uuuu",arr)
      console.log("profile_data",profile_data)
 console.log(this.state.profile_data)
    return (
      <div style={{backgroundColor:"rgb(34,193,195)"}}>
        <div style={{backgroundColor:"black"}}>
<MyButton sx={{mt:2}} variant='contained' color='success' onClick={this.view}>View Details</MyButton>
   <Link to="/Terllo">
   <MyButton_1 sx={{mt:2,ml:2}} variant='contained' color='success'>Back</MyButton_1>
   </Link>
   <MyButton sx={{mt:2,ml:2}} onClick={this.logout_1}>Logout</MyButton>

        </div>
   
   
   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {profile_data&&profile_data.map((val, index) => (
          <Grid item xs={2} sm={12} md={12} key={index}>
            <Item sx={{backgroundColor:"lightyellow"}}> <h1>Name: {val.First_name} </h1> 
            
            </Item>
            <Item sx={{backgroundColor:"lightyellow"}}><h3>  Id:  {val.id} </h3></Item>
          </Grid>
        ))}
      </Grid>
    </Box>
      </div>
    )
  }
}
