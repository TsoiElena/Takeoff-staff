import React from 'react';
import api from 'api'
import {TextField} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";

const Login = ({user, setUser, setLoading}) => {
    const [loginData, setLoginData] = React.useState({
        email: '1@1.ru',
        password: '1'
    })
    const [error, setError] = React.useState(false)

    const handleLogin = async (e) => {
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
        <div>
            <div>
                <h3>Авторизация</h3>
            </div>
            <form
                autoComplete="off"
                onSubmit={handleLogin}
            >
                <TextField
                    label="Эл. почта"
                    required
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    error={error}
                />
                <TextField
                    label="Пароль"
                    required
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    error={error}
                />
                <Button
                    variant="outlined"
                    color="primary"
                    type="submit"
                >
                    Войти
                </Button>
            </form>
        </div>
    );
}

export default Login;