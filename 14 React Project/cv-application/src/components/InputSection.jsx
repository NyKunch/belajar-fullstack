import React, { useState } from "react"
import { TextField, Button, Container, Typography, Box, Stack } from '@mui/material'

const InputSection = ({ onSubmit, setVisibility }) => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        school:'',
        title:'',
        year:'',
        company:'',
        position:'',
        desc:''
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
            <Typography 
                variant='h3' 
                gutterBottom
                sx={{
                    mt: 5,
                    mb: 3
                }}
            >
                CV Maker Form
            </Typography>
            <Typography 
                variant='h5'
                sx={{
                    mt: 1,
                    mb: 1
                }}
            >
                Personal Identity
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
                <TextField 
                    label='Nama' 
                    name='name' 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
                <TextField 
                    label='Email' 
                    name='email' 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    type='email' 
                />
                <TextField 
                    label='No Telp' 
                    name='phone' 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    type='tel' 
                />
                <Typography 
                    variant='h5'
                    sx={{
                        mt: 1
                }}
                >
                    Add Educational Experience:
                </Typography>
                <TextField 
                    label='School Name' 
                    name='school' 
                    value={formData.school} 
                    onChange={handleChange} 
                    required
                />
                <Stack spacing={2} direction='row'>
                    <TextField 
                        label='Title of Study' 
                        name='title' 
                        value={formData.title} 
                        onChange={handleChange} 
                        required
                        sx={{
                            width: 1
                        }}
                    />
                    <TextField 
                        label='Year of Study' 
                        name='year' 
                        value={formData.year} 
                        onChange={handleChange} 
                        required
                        type='number'
                        sx={{
                            minWidth: 1.5/5
                        }}
                    />
                </Stack>
                <Typography 
                    variant='h5'
                    sx={{
                        mt: 1
                }}
                >
                    Add Practical Experience:
                </Typography>
                <TextField 
                    label='Company Name' 
                    name='company' 
                    value={formData.company} 
                    onChange={handleChange} 
                    required 
                />
                <TextField 
                    label='Position Title' 
                    name='position' 
                    value={formData.position} 
                    onChange={handleChange} 
                    required 
                />
                <TextField 
                    label='Describe your work' 
                    name='desc' 
                    value={formData.desc} 
                    onChange={handleChange} 
                    required 
                    minRows={3}
                />
                <Button type='submit' variant='contained' color='primary'>
                    Make CV
                </Button>
            </Box>
        </Container>
    )
}

export default InputSection