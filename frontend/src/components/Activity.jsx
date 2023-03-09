import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { createActivity } from '../features/activity/activitySlice'
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
import { FaPlus, FaHiking } from 'react-icons/fa'

function Activity(companyId) {
    const [formData, setFormData] = useState({
            years: '',
            activityType: '',
            details: '',
            location: ''
    })
    const { years, activityType, details, location } = formData

    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => setModal(!modal)
    const [msg, setMsg] = useState(null)

    const resetFields = () => {
        setFormData({
            years: '',
            activityType: '',
            details: '',
            location: ''
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

        dispatch(createActivity({ years, activityType, details, location }))
        handleToggle()
        resetFields()
    }

    return (
        <div>
            <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
                <FaHiking /> Activity
            </NavLink>
            <Modal fade isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}><FaHiking /> Activity</ModalHeader>
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
                                placeholder='Enter the year'
                                onChange={onChange}
                            />
                            <Label for='activityType'>Activity Type</Label>
                            <Input
                                type='text'
                                name='activityType'
                                id='activityType'
                                value={activityType}
                                placeholder='Enter Activity Type'
                                onChange={onChange}
                            />
                            <Label for='details'>Activity Details</Label>
                            <Input
                                type='text'
                                name='details'
                                id='details'
                                value={details}
                                placeholder='Enter Activity Details'
                                onChange={onChange}
                            />
                            <Label for='location'>Activity Location</Label>
                            <Input
                                type='text'
                                name='location'
                                id='location'
                                value={location}
                                placeholder='Enter Activity Location'
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

export default Activity