import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCoursework } from '../features/coursework/courseworkSlice'
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
import { FaPlus, FaSchool } from 'react-icons/fa'

function Coursework() {
    const [formData, setFormData] = useState({
        years: '',
        name: '',
        details: ''
    })
    const { years, name, details } = formData

    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => setModal(!modal)
    const [msg, setMsg] = useState(null)

    const resetFields = () => {
        setFormData({
            years: '',
            name: '',
            details: ''
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

        dispatch(createCoursework({ years, name, details }))
        handleToggle()
        resetFields()
    }

    return (
        <div>
            <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
                <FaSchool /> Coursework
            </NavLink>
            <Modal fade isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}><FaSchool /> Coursework</ModalHeader>
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
                            <Label for='name'>Coursework</Label>
                            <Input
                                type='text'
                                name='name'
                                id='name'
                                value={name}
                                placeholder='Enter Coursework'
                                onChange={onChange}
                            />
                            <Label for='description'>Description</Label>
                            <Input
                                type='text'
                                name='details'
                                id='details'
                                value={details}
                                placeholder='Enter Description'
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

export default Coursework