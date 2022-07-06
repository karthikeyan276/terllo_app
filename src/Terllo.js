import React, { Component } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { InputLabel, Select, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Axios from 'axios'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link ,Navigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import Login from './Login';
import Profile from './Profile';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
// import MenuItem from '@mui/material/MenuItem'


export default class Terllo extends Component {
  constructor(props){
    super(props)
    this.state={
      open:false,
      input:"",
      inprogress:[],
      data_from_db:[],reload:false,
      completed_db:[],
      datafrom:[],
      model_new:false,
      model_completed:false,
      id_get:[],
      id_get_completed:[],
      input_completed:[],
      done_data:[],
      updatecatgory:[],
      comleted_click:[],
      open_model:false,
      open_id:[],
      open_catagary:[],
      open_input:[],
      select_open:[],
      navigate:"",
      anchorEl:null,
      local_ids:[]
    }
  }
  
  anchorEl_click=(event)=>{
      this.setState({anchorEl:event.currentTarget})
  }
  anchorEl_close=()=>{
    this.setState({anchorEl:null})
  }




  handleOpen = () =>{
    this.setState({open:true})
  }
  handleOpen_1=(input,id,catagrary)=>{
    this.setState({model_new:true,datafrom:input,id_get:id})
    // console.log('input',catagrary)
  }

  handleClose_1=()=>{
    this.setState({model_new:false})
  }
 handleClose = () => {
  this.setState({open:false})
 }

 handleClose_2open=()=>{
    this.setState({model_completed:false})
 }

 handleOpen_2open=(id,input)=>{
  this.setState({model_completed:true,id_get_completed:id,input_completed:input})
 
}

handleclose_model=()=>{
  this.setState({open_model:false})
}

handleopen_model=(id,catagrary,input)=>{
this.setState({open_model:true,open_id:id,open_catagary:catagrary,open_input:input})

}

 submit_details=()=>{
  
   
    Axios.post(`http://localhost:8001/adddtetails`,{
      input:this.state.input,
      inprogress:this.state.inprogress,
      local_ids:this.state.local_ids
     
    }).then((response)=>{
      toast("Task added", {
       
        icon: "🚀",
        autoClose:1000
      })
      console.log('sucess',response.data.results)
      this.setState({
        open:false,
      data_from_db: [
          ...this.state.data_from_db,
          {
            id : response.data.results.insertId,
            input:this.state.input,
            inprogress:this.state.inprogress,
            local_ids:this.state.local_ids
          }
        ]
      
      })
    })

    

 }

 data_get=()=>{
  let local_ids=this.state.local_ids
  Axios.get(`http://localhost:8001/dataall`,{

  }).then((response)=>{
    console.log('sucess',response.data.results)
   

    this.setState({
      data_from_db:response.data.results

    })
  })
 
 }

 data_get_completed=()=>{
  Axios.get(`http://localhost:8001/completedstatus`,{

  }).then((response)=>{
    console.log('sucess',response.data.results)
    
    this.setState({
      completed_db:response.data.results,
      
      
    })
   
   
  })
 
 }
 data_get_done=()=>{
  Axios.get(`http://localhost:8001/done`,{

  }).then((response)=>{
    console.log('sucessed',response.data.results)
    
    this.setState({
      done_data:response.data.results,
      
      
    })
   
   
  })
 
 }



 completedstatus=(id)=>{
  Axios.put(`http://localhost:8001/completedstatuschane/${id}`,{
 
  }).then((response)=>{
    console.log("sucessedimportent", response.data.results)

    this.setState({reload:true})
    if(this.state.reload==true){
        this.componentDidUpdate()
    }
})
.catch((e) => console.log('something went wrong :(', e));
console.log('id',id)

}
update_db=()=>{
    Axios.post(`http://localhost:8001/changescatagroy`,{
      id:this.state.id_get,
      input:this.state.datafrom,
      updatecatgory:this.state.updatecatgory
    }).then((response)=>{
    
      this.setState({
        // data_from_db: [
        //   ...this.state.data_from_db,
        //   {
            
        //     id:this.state.id_get,
        //     input:this.state.datafrom,
        //     updatecatgory:this.state.updatecatgory
        //   }
        // ]
       
  
      })
      this.setState({
        model_new:false
      })
      toast("Task changed", {
       
        icon: "🚀",
        autoClose:1000,
        draggablePercent: 60
      })
    
      
    })
    console.log(this.state.id_get)
}



update_completed=()=>{
  Axios.post(`http://localhost:8001/changetodone`,{
    id:this.state.id_get_completed,
    input:this.state.input_completed,
    comleted_click:this.state.comleted_click

  }).then((response)=>{
    // this.setState({
    //   // data_from_db: [
    //   //   ...this.state.data_from_db,
    //   //   {
          
    //   //     id:this.state.id_get_completed,
    //   //     input:this.state.input_completed
    //   //   }
    //   // ]

    // })
    this.setState({
      model_completed:false
    })
    toast("Task changed", {
       
      icon: "🚀",
      autoClose:1000
    })
  })

}


update_done=()=>{
  Axios.post(`http://localhost:8001/update_done`,{
    id:this.state.open_id,
    input:this.state.open_catagary,
    select_open:this.state.select_open

  
  }).then((r)=>{
    this.setState({open_model:false})
    toast("Task changed", {
       
      icon: "🚀",
      autoClose:1000,
      
    })
  })

}

delete_task = (id,index)=>{
  Axios.delete(`http://localhost:8001/delete/${id}`,{

  }).then((response)=>{
    console.log(response.status);
    console.log(response.data)

  })
 
}

logout_1=()=>{
  let new_1 = localStorage.getItem('user')
  if(new_1!==null){
    localStorage.removeItem('user');
   this.setState({navigate:<Navigate to='/Login'></Navigate>})
    
  }
  else{
    alert("plz wait ")
  }
}
idget=()=>{
  let user_email = JSON.parse(localStorage.getItem("user_email"))||[]
      console.log("user_email",user_email)
      this.setState({local_ids:user_email})
      
 }

 componentDidMount=()=>{
  this.data_get()
 this.idget()
 
 }

 
  render() {
    if(localStorage.getItem("user")==null){
      return <Navigate to="/Login"/>
  }
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
      ':hover': {
        color: theme.palette[color].main,
        backgroundColor: 'lightgray',
       
      },
    }));
      
      


      //response data
      const data = this.state.data_from_db
      console.log("data",data)
      const idd = this.state.local_ids
      // const changetocompleted = this.state.completed_db
      // const done = this.state.done_data
    

      const inprogress = data.filter(e=>e.catagrary=="inprogress")
      const inporo = inprogress.filter(e=>e.user_id==idd)
      console.log('idd',inporo)
      const completed_1=data.filter(e=>e.catagrary=="completed")
      const completed_datas = completed_1.filter(e=>e.user_id==idd)
      console.log("completed_datas",completed_datas)
      const open_1=data.filter(d=>d.catagrary=="Open")
    const open_data=open_1.filter(d=>d.user_id==idd)
    console.log("open_data",open_data)

    
   
      const open = Boolean(this.state.anchorEl);

      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));



      let user_email = JSON.parse(localStorage.getItem("user_email"))||[]
      console.log("user_email",user_email)

    let id_id=  user_email.map(d=>d.id)
    return (
      <div className='linked'>
         
          
<div className='nav' style={{backgroundColor:'black',color:"white",width:"100%",height:'80px'}}>
<Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={this.anchorEl_click}
        variant="contained" color="success"
        sx={{mt:3,mr:2}}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={this.state.anchorEl}
        open={open}
        onClose={this.anchorEl_close}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }} 
      >
        <Link to="/Profile">
          <MenuItem sx={{textDecoration:"none"}} >Profile</MenuItem>
        </Link>
      
        
        <MenuItem onClick={this.logout_1}>Logout</MenuItem>
      </Menu>
 <Button variant='contained' sx={{
    ':hover': {
      bgcolor: 'pink.main', // theme.palette.primary.main
      color: 'pink',
    }, mt:3 
  }} onClick={this.handleOpen}>add task </Button>
  <Button   sx={{ml:2,mt:3 ,':hover': {
      bgcolor: 'pink.main', // theme.palette.primary.main
      color: 'black',
    }}} variant='contained' onClick={this.logout_1} color="error">Logout</Button>  

</div>
<p>{this.state.navigate}</p>
      <Modal
        keepMounted
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        // sx={{backgroundColor:'beige'}}
        
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          <TextField
          id="outlined-textarea"
          label="Add"
          placeholder="completed"
          multiline
      
          onChange={(e) => this.setState({ input: e.target.value })}
        />
          </Typography>
          <InputLabel id="demo-simple-select-label">Select Task</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e)=>this.setState({inprogress:e.target.value})}
          label="Select task "
          
        >
            <MenuItem value={'inprogress'} >Inprogress</MenuItem>
          <MenuItem value={'completed'}>Completed</MenuItem>
          <MenuItem value={'pending'}>Pending</MenuItem>
        
            </Select><br/>
            <StyledButton variant="contained" color="primary" sx={{mt:5}} onClick={this.submit_details} >
            Submit
      </StyledButton>
           
        </Box>
        </Modal>
    
       
        <Modal
        keepMounted
        open={this.state.model_new}
        onClose={this.handleClose_1}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          <TextField
          id="outlined-textarea"
          label="completed"
          placeholder="completed"
          multiline
          value={this.state.datafrom}
          
        />
          </Typography>
       
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
     
          label="Select task "
          onChange={((e)=>this.setState({updatecatgory:e.target.value}))}
        >
            {/* <MenuItem value={'inprogress'} >Inprogress</MenuItem> */}
          <MenuItem value={'completed'}>Completed</MenuItem>
          <MenuItem value={'Open'}>Open</MenuItem>
        
            </Select><br/>
            <Button sx={{mt:5}} onClick={this.update_db}  variant='contained'>Submit</Button>
        </Box>
        </Modal>
           <Box sx={{ flexGrow: 1 ,mt:2,ml:1,mr:1}}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{mt:2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {inporo.map((d,index) => (
          <Grid  item xs={2} sm={4} md={4} key={index}>
            <Item sx={{background:'#FFFFFF'}}>  <h1>id: {d.id}</h1>
                    <h1>Desc: {d.input}</h1>
                    <h1>catagrary: {d.catagrary}</h1>
                    {console.log('index',index)}
                    <Button onClick={()=>this.handleOpen_1(d.input,d.id,d.catagrary)} color= "success" variant='contained'>Change</Button>
                    <StyledButton variant='contained' onClick={()=>{this.delete_task(d.id,index)}} color= "error" sx={{ml:2}}>Delete </StyledButton>
                    </Item>
                    
          </Grid>
        ))}
      </Grid>
    </Box>
    <Modal
        keepMounted
        open={this.state.model_completed}
        onClose={this.handleClose_2open}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          <TextField
          id="outlined-textarea"
          label="Add_1"
          placeholder="completed"
          multiline
          value={this.state.input_completed}
        
        />
          </Typography>
     
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e)=>this.setState({comleted_click:e.target.value})}
          label="Select task "
          
        >
            <MenuItem value={'inprogress'} >Inprogress</MenuItem>
        
          <MenuItem value={'Open'}>Open</MenuItem>
        
            </Select><br/>

            <Button sx={{mt:5}} onClick={this.update_completed}  variant='contained'>Submit_completed</Button>
        </Box>
        </Modal>
    <div >
      <h1>completed</h1>

    <Box sx={{ flexGrow: 1,mt:10 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{mt:2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {completed_datas.map((d,index) => (
          <Grid  item xs={2} sm={4} md={4} key={index}>
            <Item sx={{background:'#FFFFFF',ml:1,mr:1}}>  <h1>id: {d.id}</h1>
                    <h1>Desc: {d.input}</h1>
            
                    <Button onClick={()=>this.handleOpen_2open(d.id,d.input)}  variant='contained'>Change</Button>
                    <StyledButton variant='contained' onClick={()=>{this.delete_task(d.id,index)}} color= "error" sx={{ml:2}}>Delete </StyledButton>

                    </Item>
          </Grid>
        ))}
      </Grid>
    </Box>


    </div>
    <div>
    <Modal
        keepMounted
        open={this.state.open_model}
        onClose={this.handleclose_model}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          <TextField
          id="outlined-textarea"
          label="Add_1"
          placeholder="completed"
          multiline
          value={this.state.open_input}
 
        />
          </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e)=>this.setState({select_open:e.target.value})}
          label="Select task "
          
        >
            <MenuItem value={'inprogress'} >Inprogress</MenuItem>
          <MenuItem value={'completed'}>Completed</MenuItem>
        
            </Select><br/>
            <Button sx={{mt:5}} onClick={this.update_done}  variant='contained'>Submit_Done</Button>
        </Box>
        </Modal>
    <h1>Open</h1>
    <Box sx={{ flexGrow: 1,mt:10 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{mt:2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {open_data.map((d,index) => (
          <Grid  item xs={2} sm={4} md={4} key={index}>
            <Item sx={{background:' #FFFFFF',ml:1,mr:1,mb:2}}>  <h1>id: {d.id}</h1>
                    <h1>Desc: {d.input}</h1>
            
                    <Button onClick={()=>this.handleopen_model(d.id,d.catagrary,d.input)}  variant='contained'>Change</Button>
                    <StyledButton variant='contained' onClick={()=>{this.delete_task(d.id,index)}} color= "error" sx={{ml:2}}>Delete </StyledButton>

                    </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
   
      </div>
    )
  }
}
