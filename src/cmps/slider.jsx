import * as React from 'react';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#fff',
        },
    },
})

export const SliderBar = ({ disabled, handleChange, value, maxValue }) => {
    return (
        <ThemeProvider theme={theme}>
            <Slider disabled={disabled} color="neutral" aria-label="playback-bar" value={value} max={maxValue} onChange={handleChange} />
        </ThemeProvider>
    )
}
