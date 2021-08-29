import React from 'react'
import api from 'api'
import {nanoid} from 'nanoid'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import {TextField} from '@material-ui/core'

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
    })
);

const AddModal = ({userId, open, setOpen, contacts, setContacts, setLoading}) => {
    const reg = /^[0-9\b]+$/
    const classes = useStyles()

    const [contactData, setContactData] = React.useState({
        userId,
        id: nanoid(),
        company: '',
        name: '',
        phone: '',
        email: '',
    })

    const handleChange = (e) => {
        const {value} = e.target
        if (!value) return setContactData({...contactData, phone: ''})
        if (!reg.test(value)) return
        setContactData({...contactData, phone: value})
    }

    const addContact = async (e) => {
        e.preventDefault()
        setOpen(false)
        setLoading(true)
        api.post("contacts", contactData).then(res => {
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
                <h2>Add contact</h2>
                <form
                    autoComplete="off"
                    onSubmit={addContact}
                >
                    <TextField
                        label="Name"
                        required
                        type="text"
                        value={contactData.name}
                        onChange={(e) => setContactData({...contactData, name: e.target.value})}
                    />
                    <TextField
                        label="Company"
                        type="text"
                        value={contactData.company}
                        onChange={(e) => setContactData({...contactData, company: e.target.value})}
                    />
                    <TextField
                        label="Phone"
                        required
                        type="text"
                        value={contactData.phone}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={contactData.email}
                        onChange={(e) => setContactData({...contactData, email: e.target.value})}
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
