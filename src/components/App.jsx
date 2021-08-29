import React, {useState} from 'react'
import Header from "./Header";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from './theme'
import LogIn from "./Login";
import Contacts from "./Contacts";
import AuthCheck from "./AuthCheck";
import "./style.css"

const App = () => {
    const [user, setUser] = useState(null)
    const [contacts, setContacts] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header user={user} setUser={setUser}/>
                {loading && <img className='loading' src="https://pear-advert.ru/images/uploads/blog/273/30.gif" alt=""/>}
                <Switch>
                    <Route path='/contacts'>
                        <AuthCheck user={user}>
                            <Contacts user={user} contacts={contacts} loading={loading}
                                      setContacts={setContacts} setLoading={setLoading}/>
                        </AuthCheck>
                    </Route>
                    <Route path='/login'>
                        <LogIn user={user} setUser={setUser} setLoading={setLoading}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
