import React from 'react'
import api from 'api'
import {nanoid} from 'nanoid'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import {TextField} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: '45%',
            margin: '0 auto',
            left: '0',
            right: '0',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
        },
        input: {
            paddingBottom: '10px'
        }
    })
)

const AddModal = ({userId, open, contacts, setOpen, setContacts, setLoading}) => {
    const reg = /^[0-9\b]+$/
    const classes = useStyles()

    const [contactData, setContactData] = React.useState({
        userId,
        id: '',
        company: '',
        name: '',
        phone: '',
        email: '',
    })

    const handleChange = e => {
        const {value} = e.target
        if (!value) return setContactData({...contactData, phone: ''})
        if (!reg.test(value)) return
        setContactData({...contactData, phone: value})
    }

    const addContact = async e => {
        e.preventDefault()
        setOpen(false)
        setLoading(true)
        setContactData({...contactData, id: nanoid()})
        api.post('contacts', contactData).then(res => {
            setLoading(false)
            setContacts([...contacts, res.data])
            setContactData({...contactData, email: '', phone: '', name: '', company: ''})
        })
            .catch(error => {
                setLoading(false)
                console.error(error)
            })
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className={classes.paper}>
                <Typography variant="h5">Add contact</Typography>
                <form
                    autoComplete="off"
                    onSubmit={addContact}
                    className={classes.form}
                >
                    <TextField
                        label="Name"
                        required
                        type="text"
                        value={contactData.name}
                        className={classes.input}
                        onChange={e => setContactData({...contactData, name: e.target.value})}
                    />
                    <TextField
                        label="Company"
                        type="text"
                        value={contactData.company}
                        className={classes.input}
                        onChange={e => setContactData({...contactData, company: e.target.value})}
                    />
                    <TextField
                        label="Phone"
                        required
                        type="text"
                        value={contactData.phone}
                        className={classes.input}
                        onChange={handleChange}
                    />
                    <TextField
                        label="E-mail"
                        type="email"
                        value={contactData.email}
                        className={classes.input}
                        onChange={e => setContactData({...contactData, email: e.target.value})}
                    />
                    <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                    >
                        Add
                    </Button>
                </form>
            </div>
        </Modal>
    )
}

export default AddModal
