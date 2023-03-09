import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createExperienceSummary } from '../features/experienceSummary/experienceSummarySlice'
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
import { FaRegFileAlt, FaPlus } from 'react-icons/fa'

function ExperienceSummary() {
    const [formData, setFormData] = useState({
        experience: '',
        years: ''
    })
    const { experience, years } = formData

    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => setModal(!modal)
    const [msg, setMsg] = useState(null)

    const resetFields = () => {
        setFormData({
            experience: '',
            years: ''
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

        dispatch(createExperienceSummary({ experience, years }))
        handleToggle()
        resetFields()
    }

    return (
        <div>
            <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
                <FaRegFileAlt /> Working Experience Summary
            </NavLink>
            <Modal fade isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}><FaRegFileAlt /> Working Experience Summary</ModalHeader>
                <ModalBody>
                    { msg ? <Alert color='danger'>{msg}</Alert> : null }
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for='experience'>Working Experience Description</Label>
                            <Input
                                type='text'
                                name='experience'
                                id='experience'
                                value={experience}
                                placeholder='Enter Experience Description'
                                onChange={onChange}
                            />
                            <Label for='years'>Total Experience</Label>
                            <Input
                                type='text'
                                name='years'
                                id='years'
                                value={years}
                                placeholder='Enter Total Years'
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

export default ExperienceSummary