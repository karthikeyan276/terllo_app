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
      done_data:[]
    })
  }
  handleOpen = () =>{
    this.setState({open:true})
    
    

  }
  handleOpen_1=(input,id)=>{
    this.setState({model_new:true,datafrom:input,id_get:id})
    console.log('input',input)
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
  console.log('da',id,input)
}

 input = ()=>{
  console.log("ok")
 }

 submit_details=()=>{
  
    // let datas=[]
    // datas.push({input:this.state.input,inprogress:this.state.inprogress})
    // localStorage.setItem("inprogress", JSON.stringify(datas));
    // console.log('llll',datas)
    Axios.post(`http://localhost:8001/adddtetails`,{
      input:this.state.input,
      inprogress:this.state.inprogress
    }).then((response)=>{
      console.log('sucess')
    })
    if(this.state.reload==true){
      this.componentDidUpdate()
  }

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


 componentWillUnmount=()=>{
  this.completedstatus()
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
      input:this.state.datafrom
    })
    console.log(this.state.id_get)
}
update_completed=()=>{
  Axios.post(`http://localhost:8001/changetodone`,{
    id:this.state.id_get_completed
  })

}


 componentDidMount=()=>{
  this.data_get()
  this.data_get_completed()
  this.data_get_done()
 }
  render() {
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
      // console.log('db',this.state.completed_db)
      console.log('gass',this.state.datafrom)

      const data = this.state.data_from_db
      const changetocompleted = this.state.completed_db
      const done = this.state.done_data

      // console.log("data",data)

      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    return (
      <div>

<div>
   <Button variant='contained' sx={{mt:2}} onClick={this.handleOpen}>add task </Button>

</div>
 {/* <Button variant='contained' onClick={this.data_get}>data</Button> */}
      <Modal
        keepMounted
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        
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
            <Button sx={{mt:5}} onClick={this.submit_details} variant='contained'>Submit</Button>
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
          
        >
            <MenuItem value={'inprogress'} >Inprogress</MenuItem>
          <MenuItem value={'completed'}>Completed</MenuItem>
          <MenuItem value={'Open'}>Open</MenuItem>
        
            </Select><br/>
            <Button sx={{mt:5}} onClick={this.update_db}  variant='contained'>Submit</Button>
        </Box>
        </Modal>
           <Box sx={{ flexGrow: 1 ,mt:2}}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{mt:2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((d,index) => (
          <Grid  item xs={2} sm={4} md={4} key={index}>
            <Item sx={{background:'lightgray'}}>  <h1>id: {d.id}</h1>
                    <h1>Desc: {d.input}</h1>
                    <h1>catagrary: {d.catagrary}</h1>
                    <Button onClick={()=>this.handleOpen_1(d.input,d.id)} variant='contained'>Change</Button>
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
          // onChange={(e)=>this.setState({inprogress:e.target.value})}
          label="Select task "
          
        >
            <MenuItem value={'inprogress'} >Inprogress</MenuItem>
          {/* <MenuItem value={'completed'}>Completed</MenuItem> */}
          <MenuItem value={'Open'}>Open</MenuItem>
        
            </Select><br/>
            <Button sx={{mt:5}} onClick={this.update_completed}  variant='contained'>Submit</Button>
        </Box>
        </Modal>
    <div >
      <h1>completed</h1>
    <Box sx={{ flexGrow: 1,mt:10 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{mt:2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {changetocompleted.map((d,index) => (
          <Grid  item xs={2} sm={4} md={4} key={index}>
            <Item sx={{background:'lightgreen',ml:1,mr:1}}>  <h1>id: {d.id}</h1>
                    <h1>Desc: {d.input}</h1>
            
                    <Button onClick={()=>this.handleOpen_2open(d.id,d.input)}  variant='contained'>Change</Button>
                    </Item>
          </Grid>
        ))}
      </Grid>
    </Box>


    </div>
    <div>
    <h1>open</h1>
    <Box sx={{ flexGrow: 1,mt:10 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{mt:2}} columns={{ xs: 4, sm: 8, md: 12 }}>
        {done.map((d,index) => (
          <Grid  item xs={2} sm={4} md={4} key={index}>
            <Item sx={{background:'lightpink',ml:1,mr:1}}>  <h1>id: {d.id}</h1>
                    <h1>Desc: {d.input}</h1>
            
                    {/* <Button onClick={()=>this.handleOpen_2open(d.id,d.input)}  variant='contained'>Change</Button> */}
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
