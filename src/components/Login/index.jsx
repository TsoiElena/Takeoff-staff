import React from 'react';
import api from 'api'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {Redirect} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(() => ({
        wrapper: {
            paddingTop: '30px',
            paddingLeft: '40%'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px'
        },
        input: {
            paddingBottom: '10px'
        }
    })
)

const Login = ({user, setUser, setLoading}) => {
    const classes = useStyles()
    const [loginData, setLoginData] = React.useState({
        email: '',
        password: ''
    })
    const [error, setError] = React.useState(false)

    const handleLogin = async e => {
        e.preventDefault()
        setLoading(true)
        api.get(`/users?mail=${loginData.email}&password=${loginData.password}`)
            .then(res => {
                setLoading(false)
                if (!res.data.length) {
                    setError(true)
                    return alert('Incorrect e-mail or password')
                }
                setUser(res.data.shift())
            })
            .catch(error => {
                setLoading(false)
                console.error(error)
            })
    }

    if (user) return <Redirect to='/contacts'/>

    return (
        <div className={classes.wrapper}>
            <div>
                <Typography variant="h4">Authorization</Typography>
            </div>
            <form
                autoComplete="off"
                onSubmit={handleLogin}
                className={classes.form}
            >
                <TextField
                    label="E-mail"
                    required
                    type="email"
                    value={loginData.email}
                    onChange={e => setLoginData({...loginData, email: e.target.value})}
                    error={error}
                    className={classes.input}
                />
                <TextField
                    label="Password"
                    required
                    type="password"
                    value={loginData.password}
                    onChange={e => setLoginData({...loginData, password: e.target.value})}
                    error={error}
                    className={classes.input}
                />
                <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                >
                    log in
                </Button>
            </form>
        </div>
    );
}

export default Login;