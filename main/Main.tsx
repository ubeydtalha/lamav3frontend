"use client";

import React from 'react'
import { Container, Typography} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import { createTheme, ThemeProvider } from '@mui/material';


type Props = {}

function Main({ }: Props) {
    return (
        <div>

            <Grid  spacing={2} rowSpacing={2}>
                <Grid 
                    xs={12}
                    sx={{
                        width: "100vh",
                        height: "30vh",
                    }}
                >
                    <Container disableGutters={true} maxWidth={"xl"}>
                        <Typography variant="h1" component="div" gutterBottom sx={{
                            fontFamily: ""
                        }}>
                            Welcome to LamaV3
                        </Typography>
                    </Container>
                    
                </Grid>

            </Grid>


        </div>
    )
}

export default Main