import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAcademic } from '../features/academic/academicSlice'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap'
import { FaBookReader, FaPlus } from 'react-icons/fa'

function Academic() {
    const [formData, setFormData] = useState({
        years: '',
        name: '',
        qualification: ''
    })
    const { years, name, qualification } = formData

    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => setModal(!modal)
    const [msg, setMsg] = useState(null)

    const resetFields = () => {
        setFormData({
            years: '',
            name: '',
            qualification: ''
        })
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createAcademic({ years, name, qualification }))
        handleToggle()
        resetFields()
    }

    return (
        <div>
            <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
                <FaBookReader /> Academic
            </NavLink>
            <Modal fade isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}><FaBookReader /> Academic</ModalHeader>
                <ModalBody>
                    { msg ? <Alert color='danger'>{msg}</Alert> : null }
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for='years'>Year</Label>
                            <Input
                                type='text'
                                name='years'
                                id='years'
                                value={years}
                                placeholder='Enter The Year'
                                onChange={onChange}
                            />
                            <Label for='name'>Name of Institution</Label>
                            <Input
                                type='text'
                                name='name'
                                id='name'
                                value={name}
                                placeholder='Enter Institution Name'
                                onChange={onChange}
                            />
                            <Label for='qualification'>Qualification</Label>
                            <Input
                                type='text'
                                name='qualification'
                                id='qualification'
                                value={qualification}
                                placeholder='Enter Qualification'
                                onChange={onChange}
                            />
                            <Button color='dark' style={{ marginTop: '2rem' }} block>
                                <FaPlus /> Add
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Academic