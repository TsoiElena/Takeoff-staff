import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {NavLink} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
        header: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        info: {
            display: 'flex',
        },
        button: {
            display: 'inline-block',
            color: 'white',
            textDecoration: 'none',
            paddingLeft: '10px'
        }
    })
)


const Header = ({user, setUser}) => {
    const classes = useStyles()

    return (
        <AppBar position="static">
            <Toolbar className={classes.header}>
                <Typography variant="h6">
                    Takeoff staff
                </Typography>
                {user
                    ? <div className={classes.info}>
                        <Typography variant="h6">
                            {user.name}
                        </Typography>
                        <Typography variant="h6" onClick={() => setUser(null)}>
                            <NavLink to='/login' className={classes.button}>
                                <Typography variant="h6">
                                    Log out
                                </Typography>
                            </NavLink>
                        </Typography>
                    </div>
                    : <Typography variant="h6">
                        <NavLink to='/login' className={classes.button}>
                            <Typography variant="h6">
                                Log in
                            </Typography>
                        </NavLink>
                    </Typography>
                }
            </Toolbar>
        </AppBar>
    )
}
export default Header