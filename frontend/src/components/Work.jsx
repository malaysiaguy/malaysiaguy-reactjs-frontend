import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createWork } from '../features/work/workSlice'
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
import { FaPlus, FaPeopleCarry } from 'react-icons/fa'

function Work() {
    const [formData, setFormData] = useState({
            industryType: '',
            workType: '',
            company: '',
            location: '',
            fromDate: '',
            toDate: '',
            position: '',
            reasonLeaving: ''
    })
    const { industryType, workType, company, location, fromDate, toDate, position, reasonLeaving } = formData

    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => setModal(!modal)
    const [msg, setMsg] = useState(null)

    const resetFields = () => {
        setFormData({
            industryType: '',
            workType: '',
            company: '',
            location: '',
            fromDate: '',
            toDate: '',
            position: '',
            reasonLeaving: ''
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

        dispatch(createWork({ industryType, workType, company, location, fromDate, toDate, position, reasonLeaving }))
        handleToggle()
        resetFields()
    }

    return (
        <div>
            <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
                <FaPeopleCarry /> Working Experience
            </NavLink>
            <Modal fade isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}><FaPeopleCarry /> Working Experience</ModalHeader>
                <ModalBody>
                    { msg ? <Alert color='danger'>{msg}</Alert> : null }
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for='industryType'>Industry Type</Label>
                            <Input
                                type='text'
                                name='industryType'
                                id='industryType'
                                value={industryType}
                                placeholder='Enter Industry Type'
                                onChange={onChange}
                            />
                            <Label for='workType'>Work Type</Label>
                            <Input
                                type='text'
                                name='workType'
                                id='workType'
                                value={workType}
                                placeholder='Enter Work Type'
                                onChange={onChange}
                            />
                            <Label for='company'>Company Name</Label>
                            <Input
                                type='text'
                                name='company'
                                id='company'
                                value={company}
                                placeholder='Enter Company Name'
                                onChange={onChange}
                            />
                            <Label for='location'>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                id='location'
                                value={location}
                                placeholder='Enter Company Location'
                                onChange={onChange}
                            />
                            <Label for='fromDate'>Date Start</Label>
                            <Input
                                type='Date'
                                name='fromDate'
                                id='fromDate'
                                value={fromDate}
                                placeholder='Enter Date Start'
                                onChange={onChange}
                            />
                            <Label for='toDate'>Date End</Label>
                            <Input
                                type='Date'
                                name='toDate'
                                id='toDate'
                                value={toDate}
                                placeholder='Enter Date End'
                                onChange={onChange}
                            />
                            <Label for='position'>Job Position</Label>
                            <Input
                                type='text'
                                name='position'
                                id='position'
                                value={position}
                                placeholder='Enter Job Position'
                                onChange={onChange}
                            />
                            <Label for='reasonLeaving'>Reason of Leaving</Label>
                            <Input
                                type='text'
                                name='reasonLeaving'
                                id='reasonLeaving'
                                value={reasonLeaving}
                                placeholder='Enter Reason of Leaving'
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

export default Work