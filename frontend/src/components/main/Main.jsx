import React, { useState } from 'react'
import './main.scss'
import { Stack, TextField,FormControl,InputLabel,MenuItem,Select,Button,Snackbar,Alert } from '@mui/material'
import axios from 'axios'
const sizes={
    small:"256x256",
    medium:"512x512",
    large:"1024x1024"
}
const Main = () => {

    const [prompt,setprompt]=useState("")
    const [size,setsize]=useState(sizes.small)
    const [open,setopen]=useState(false)
    const [img,setimg]=useState("")
    const clickHandler=async ()=>{
        try {
            if(prompt===""){
                setopen(true)
                return
            }
            console.log({prompt,size})
            const url="http://localhost:8200/generate"
            const data={prompt,size};
            const response=await axios.post(url,data)
            const imgsrc=response.data.src;
            console.log(imgsrc)
            setimg(imgsrc)
        } catch (error) {
            setopen(true);
            return
        }


    }

    return (
        <div className='main'>
            <Stack spacing={1} className='main-stack'>
                <TextField label="Prompt" variant="outlined" value={prompt} onChange={(e)=>{setprompt(e.target.value)}} />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        value={size}
                        label="Size"
                        onChange={(e)=>{setsize(e.target.value)}}
                    >
                        <MenuItem value={sizes.small}>Small</MenuItem>
                        <MenuItem value={sizes.medium}>Medium</MenuItem>
                        <MenuItem value={sizes.large}>Large</MenuItem>
                    </Select>
                    <Button variant="contained" onClick={clickHandler}>Generate Image</Button>
                </FormControl>
            </Stack>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={()=>{
                    setopen(false)
                }}
                message="Note archived"
            >
                <Alert severity="error">This is an error - Check it out</Alert>
            </Snackbar>
            <img src={img} alt="" />
        </div>
    )
}

export default Main