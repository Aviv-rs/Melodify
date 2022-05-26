import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#fff',
        },
    },
})

export const PlayBackBar = ({ disabled, handleChange }) => {
    return (
        <Box sx={{ width: 200 }}>
            <ThemeProvider theme={theme}>
                <Slider disabled={disabled} color="neutral" aria-label="playback-bar" onChange={handleChange} />
            </ThemeProvider>
        </Box>
    )
}
