import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Alert } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { setUserMsg } from '../store/actions/user.action'

export const LoginSignup = props => {
  const [isSignup, setIsSignup] = React.useState(false)
  const [isWrongLogin, setIsWrongLogin] = React.useState(false)
  const history = useHistory()

  const handleSubmit = async ev => {
    ev.preventDefault()
    const data = new FormData(ev.currentTarget)
    const credentials = {
      username: data.get('username'),
      password: data.get('password'),

      fullname: data.get('fullname'),
    }
    if (isSignup) {
      try {
        await props.onSignup(credentials)
        history.push('/toy')
      } catch {
        setUserMsg({ txt: 'Cannot login', type: 'danger' })
      }
    } else {
      try {
        await props.onLogin(credentials)
        history.push('/toy')
      } catch {
        setIsWrongLogin(true)
      }
    }
  }

  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            style={{
              margin: 1,
              backgroundColor: '#1976d2',
            }}
          ></Avatar>
          <Typography component="h1" variant="h5">
            Sign {isSignup ? 'up' : 'in'}
          </Typography>
          <Box
            component="form"
            validate
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
            }}
          >
            <Grid container spacing={2}>
              {isSignup && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    autoComplete="no"
                    name="fullname"
                    id="fullname"
                    label="Full Name"
                    autoFocus
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Sign {isSignup ? 'up' : 'in'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Link
                onClick={() => {
                  setIsSignup(!isSignup)
                  setIsWrongLogin(false)
                }}
              >
                <Grid item style={{ cursor: 'pointer' }}>
                  {isSignup
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"}
                </Grid>
              </Link>
            </Grid>
            {isWrongLogin && (
              <Alert
                sx={{
                  mt: 3,
                  mb: 2,
                }}
                severity="error"
              >
                Wrong username or password, please check and try again
              </Alert>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
