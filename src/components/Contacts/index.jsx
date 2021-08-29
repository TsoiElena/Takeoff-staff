import React, {useEffect} from 'react'
import api from 'api'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddModal from "components/Contacts/AddModal";
import EditModal from "components/Contacts/EditModal";
import {TextField} from "@material-ui/core";

const useStyles = makeStyles(() => ({
        root: {
            minWidth: 275,
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
    })
);

const Contacts = ({user, contacts, loading, setContacts, setLoading}) => {
    const [addModal, setAddModal] = React.useState(false)
    const [editModal, setEditModal] = React.useState(null)
    const [term, setTerm] = React.useState('')


    const classes = useStyles()

    const deleteContact = async (id) => {
        setLoading(true)
        api.delete(`contacts/${id}`).then(() => {
            setLoading(false)
            setContacts(contacts.filter(item => item.id !== id))
        }).catch(error => {
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
    console.log(contacts);
    return (
        <div>
            <div>
                <h1>Contacts</h1>
                <TextField
                    label="enter name"
                    required
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <Button size="small" onClick={() => setAddModal(true)}>Add Contact</Button>
            </div>
            <div>
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
                                <Button size="small" onClick={() => setEditModal(contact.id)}>Edit</Button>
                                <Button size="small" onClick={() => deleteContact(contact.id)}>Delete</Button>
                            </CardActions>
                        </Card>
                        )
                        : loading ? null : <h3>Not found</h3>
                }
            </div>
            <AddModal open={addModal} setOpen={setAddModal} userId={user.id} contacts={contacts}
                      setContacts={setContacts} setLoading={setLoading}/>
            <EditModal contactId={editModal} setOpen={setEditModal} contacts={contacts} setContacts={setContacts}
                       setLoading={setLoading}/>
        </div>
    )
}

export default Contacts
