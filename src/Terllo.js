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


export default class Terllo extends Component {
  constructor(){
    super()
    this.state=({
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
      navigate:""
    })
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
  // console.log('da',id,input)
}

handleclose_model=()=>{
  this.setState({open_model:false})
}

handleopen_model=(id,catagrary,input)=>{
this.setState({open_model:true,open_id:id,open_catagary:catagrary,open_input:input})
// console.log('da',id,catagrary)
}

 submit_details=()=>{
  
    // let datas=[]
    // datas.push({input:this.state.input,inprogress:this.state.inprogress})
    // localStorage.setItem("inprogress", JSON.stringify(datas));
    // console.log('llll',datas)
    Axios.post(`http://localhost:8001/adddtetails`,{
      input:this.state.input,
      inprogress:this.state.inprogress,
     
    }).then((response)=>{
      console.log('sucess')
      this.setState({
        data_from_db: [
          ...this.state.data_from_db,
          {
            id : response.data.results.insertId,
            input:this.state.input,
            inprogress:this.state.inprogress
          }
        ]
  
      })
    })
    

 }

 data_get=()=>{
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
        completed_db: [
          ...this.state.completed_db,
          {
            
            id:this.state.id_get,
            input:this.state.datafrom,
            updatecatgory:this.state.updatecatgory
          }
        ]
  
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
    this.setState({
      done_data: [
        ...this.state.done_data,
        {
          
          id:this.state.id_get_completed,
          input:this.state.input_completed
        }
      ]

    })
  })

}

update_done=()=>{
  Axios.post(`http://localhost:8001/update_done`,{
    id:this.state.open_id,
    input:this.state.open_catagary,
    select_open:this.state.select_open

  // }).then((response)=>{
  //   this.setState({
  //     completed_db: [
  //       ...this.state.done_data,
  //       {
          
  //         id:this.state.open_id,
  //         input:this.state.open_catagary,
  //         select_open:this.state.select_open
  //       }
  //     ]

  //   })
  })

}

delete_task = (id,index)=>{
  Axios.delete(`http://localhost:8001/delete/${id}`,{

  }).then((response)=>{
    console.log(response.status);
    console.log(response.data)
  })
  // console.log("delete",id,index)
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

 componentDidMount=()=>{
  this.data_get()
  this.data_get_completed()
  this.data_get_done()
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
      // console.log('db',this.state.completed_db)
      console.log('gass',this.state.select_open)


      //response data
      const data = this.state.data_from_db
      const changetocompleted = this.state.completed_db
      const done = this.state.done_data
      console.log("daasss",done)

      // console.log("data",data)

      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      
    return (
      <div style={{backgroundColor:"rgb(34,193,195)"}}>
          
<div style={{backgroundColor:'black',color:"white",width:"100%",height:'80px'}}>

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
 {/* <Button variant='contained' onClick={this.data_get}>data</Button> */}
      <Modal
        keepMounted
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        sx={{backgroundColor:'beige'}}
        
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
            {/* <StyledButton sx={{mt:5}} onClick={this.submit_details} variant="contained" color="primary">Submit</StyledButton> */}
        </Box>
        </Modal>
       
        {/* {
          data.map((d,index)=>{
              return(
                <div key={index}>
                    <h1>{d.id}</h1>
                    <h1>{d.input}</h1>
                    <h1>{d.catagrary}</h1>
      
                  </div>
              )
          })
        } */}
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
          // onChange={(e) => this.setState({ input: e.target.value })}
        />
          </Typography>
          {/* <InputLabel id="demo-simple-select-label">Select Task</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // onChange={(e)=>this.setState({inprogress:e.target.value})}
          label="Select task "
          onChange={((e)=>this.setState({updatecatgory:e.target.value}))}
        >
            <MenuItem value={'inprogress'} >Inprogress</MenuItem>
          <MenuItem value={'completed'}>Completed</MenuItem>
          <MenuItem value={'Open'}>Open</MenuItem>
        
            </Select><br/>
            <Button sx={{mt:5}} onClick={this.update_db}  variant='contained'>Submit</Button>
        </Box>
        </Modal>
           <Box sx={{ flexGrow: 1 ,mt:2,ml:1,mr:1}}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{mt:2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((d,index) => (
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
          // onChange={(e) => this.setState({ input: e.target.value })}
        />
          </Typography>
          {/* <InputLabel id="demo-simple-select-label">Select Task</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e)=>this.setState({comleted_click:e.target.value})}
          label="Select task "
          
        >
            <MenuItem value={'inprogress'} >Inprogress</MenuItem>
          {/* <MenuItem value={'completed'}>Completed</MenuItem> */}
          <MenuItem value={'Open'}>Open</MenuItem>
        
            </Select><br/>

            <Button sx={{mt:5}} onClick={this.update_completed}  variant='contained'>Submit_completed</Button>
        </Box>
        </Modal>
    <div >
      <h1>completed</h1>

    <Box sx={{ flexGrow: 1,mt:10 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{mt:2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {changetocompleted.map((d,index) => (
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
          // onChange={(e) => this.setState({ input: e.target.value })}
        />
          </Typography>
          {/* <InputLabel id="demo-simple-select-label">Select Task</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(e)=>this.setState({select_open:e.target.value})}
          label="Select task "
          
        >
            <MenuItem value={'inprogress'} >Inprogress</MenuItem>
          <MenuItem value={'completed'}>Completed</MenuItem>
          {/* <MenuItem value={'Open'}>Open</MenuItem> */}
        
            </Select><br/>
            <Button sx={{mt:5}} onClick={this.update_done}  variant='contained'>Submit_Done</Button>
        </Box>
        </Modal>
    <h1>Open</h1>
    <Box sx={{ flexGrow: 1,mt:10 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{mt:2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {done.map((d,index) => (
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
