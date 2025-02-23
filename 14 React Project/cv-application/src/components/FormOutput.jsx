import React from "react"
import { Card, CardContent, Typography, Container } from '@mui/material'

const FormOutput = ({ data }) => {
    if (!data) return null

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
                        Nama: {data.name}
                    </Typography>
                    <Typography>
                        Email: {data.email}
                    </Typography>
                    <Typography>
                        No. Telp: {data.phone}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    )
}

export default FormOutput