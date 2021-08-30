import React, {useEffect} from 'react'
import api from 'api'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddModal from 'components/Contacts/AddModal'
import EditModal from 'components/Contacts/EditModal'
import {TextField} from '@material-ui/core'

const useStyles = makeStyles(() => ({
        root: {
            height: '200px',
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: '20px'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        phone: {
            marginBottom: 12,
        },
        search: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '15px',
        },
        contacts: {
            display: 'flex',
            flexWrap: 'wrap',
        }
    })
)

const Contacts = ({user, contacts, loading, setContacts, setLoading}) => {
    const classes = useStyles()
    const [addModal, setAddModal] = React.useState(false)
    const [editModal, setEditModal] = React.useState(null)
    const [term, setTerm] = React.useState('')

    const deleteContact = async id => {
        setLoading(true)
        api.delete(`contacts/${id}`)
            .then(() => {
                setLoading(false)
                setContacts(contacts.filter(item => item.id !== id))
            })
            .catch(error => {
                setLoading(false)
                console.error(error)
            })
    }

    useEffect(() => {
            setLoading(true)
            api.get(`contacts?userId=${user.id}${term ? `&name=${term}` : ''}`)
                .then(res => {
                    setLoading(false)
                    setContacts(res.data)
                })
                .catch(error => {
                    setLoading(false)
                    console.error(error)
                })
        }, [term]
    )
    return (
        <div>
            <div className={classes.search}>
                <Typography variant="h5">Contacts</Typography>
                <TextField
                    label="enter name"
                    required
                    type="text"
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                    style={{width: 450}}
                />
                <Button size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => setAddModal(true)}
                        style={{height: 30}}
                >
                    Add Contact
                </Button>
            </div>
            <div className={classes.contacts}>
                {
                    contacts && contacts.length
                        ? contacts.map(contact => <Card className={classes.root} variant="outlined" key={contact.id}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {contact.name}
                                </Typography>
                                {contact.company && <Typography className={classes.phone} color="textSecondary">
                                    company: {contact.company}
                                </Typography>}
                                {contact.phone && <Typography variant="body2" component="p">
                                    phone: {contact.phone}
                                </Typography>}
                                {contact.email && <Typography variant="body2" component="p">
                                    mail: {contact.email}
                                </Typography>}
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="outlined" color="primary"
                                        onClick={() => setEditModal(contact.id)}>Edit</Button>
                                <Button size="small" variant="outlined" color="primary"
                                        onClick={() => deleteContact(contact.id)}>Delete</Button>
                            </CardActions>
                        </Card>
                        )
                        : loading ? null : <Typography variant="h5">Not Found</Typography>
                }
            </div>
            <AddModal
                open={addModal}
                setOpen={setAddModal}
                userId={user.id}
                contacts={contacts}
                setContacts={setContacts}
                setLoading={setLoading}
            />
            <EditModal
                contactId={editModal}
                setOpen={setEditModal}
                contacts={contacts}
                setContacts={setContacts}
                setLoading={setLoading}
            />
        </div>
    )
}

export default Contacts
