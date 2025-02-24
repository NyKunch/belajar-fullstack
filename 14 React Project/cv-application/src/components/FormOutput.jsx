import React from "react"
import { Card, CardContent, Typography, Container, Button } from '@mui/material'

const FormOutput = ({ data, setVisibility }) => {
    if (!data) return null

    const handleEdit = (e) => {
        e.preventDefault()
        setVisibility(false)
    }

    return (
        <Container maxWidth='sm'>
            <Card 
                sx={{
                    marginTop: 4,
                    padding: 2
                }}
            >
                <CardContent>
                    <Typography variant='h5' gutterBottom>
                        Your CV
                    </Typography>
                    <Typography variant='h6'>
                        {data.name}
                    </Typography>
                    <Typography>
                        {data.email}
                    </Typography>
                    <Typography gutterBottom>
                        {data.phone}
                    </Typography>
                    <Typography variant='h6'>
                        Educational Experience
                    </Typography>
                    <Typography gutterBottom>
                        {data.title} {data.school} ({data.year})
                    </Typography>
                    <Typography variant='h6'>
                        Practical Experience
                    </Typography>
                    <Typography gutterBottom>
                        Worked at {data.company} as {data.position} {data.desc}
                    </Typography>
                    <Button sx={{mt: 2}} onClick={handleEdit} variant='outlined' color='primary'>
                        Edit 
                    </Button>
                </CardContent>
            </Card>
        </Container>
    )
}

export default FormOutput