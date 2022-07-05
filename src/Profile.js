import React, { Component } from 'react'
import Axios from 'axios'
import { Button } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

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
                  this.setState({profile_data:response.data.results})            
                  
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

  
  render() {
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

      const profile_data = this.state.profile_data
      console.log("profile_data",profile_data)
 console.log(this.state.profile_data)
    return (
      <div>
   <MyButton sx={{mt:4}} variant='contained' color='success' onClick={this.view}>View Details</MyButton>
   <Link to="/Terllo">
   <Button sx={{mt:4,ml:2}} variant='contained' color='success'>Back</Button>
   </Link>
   
   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {profile_data.map((val, index) => (
          <Grid item xs={2} sm={12} md={12} key={index}>
            <Item>Name:  {val.First_name}
            
            </Item>
            <Item>Id:  {val.id}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
      </div>
    )
  }
}
