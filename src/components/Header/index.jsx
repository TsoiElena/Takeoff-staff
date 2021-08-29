import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import {NavLink} from "react-router-dom"

const Header = ({user, setUser}) => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleLogout = () => {
        setAnchorEl(null)
        setUser(null)
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('surname')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Takeoff staff
                </Typography>
                {user
                    ? <div>
                        <Typography variant="h6">
                            {user.name}
                        </Typography>
                        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} color="inherit">
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <NavLink to='/contacts'>
                                <MenuItem onClick={() => setAnchorEl(null)}> Contacts </MenuItem>
                            </NavLink>
                            <MenuItem onClick={handleLogout}>Выход</MenuItem>
                        </Menu>
                    </div>
                    : <Typography variant="h6">
                        <NavLink to='/login'>
                            Войти
                        </NavLink>
                    </Typography>
                }
            </Toolbar>
        </AppBar>
    )
}
export default Header