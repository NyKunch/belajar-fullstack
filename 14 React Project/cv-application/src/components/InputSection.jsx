import React, { useState } from "react"
import { TextField, Button, Container, Typography, Box } from '@mui/material'

const InputSection = ({ onSubmit, setVisibility }) => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone:''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
        setVisibility(true)
    }

    return (
        <Container maxWidth='sm'>
            <Typography variant='h4' gutterBottom>
                CV Maker Form
            </Typography>
            <Box 
                component='form' 
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <TextField label='Nama' name='name' value={formData.name} onChange={handleChange} required />
                <TextField label='Email' name='email' value={formData.email} onChange={handleChange} required type='email' />
                <TextField label='No Telp' name='phone' value={formData.phone} onChange={handleChange} required type='tel' />
                <Button type='submit' variant='contained' color='primary'>
                    Make CV
                </Button>
            </Box>
        </Container>
    )
}

export default InputSection