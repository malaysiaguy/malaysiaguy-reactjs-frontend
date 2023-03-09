import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createKnowledge } from '../features/knowledge/knowledgeSlice'
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
import { FaReadme, FaPlus } from 'react-icons/fa'

function Knowledge() {
    const [formData, setFormData] = useState({
        knowledge: '',
        knowledgeType: '',
        level: ''
    })
    const { knowledge, knowledgeType, level } = formData

    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => setModal(!modal)
    const [msg, setMsg] = useState(null)

    const resetFields = () => {
        setFormData({
            knowledge: '',
            knowledgeType: '',
            level: ''
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

        dispatch(createKnowledge({ knowledge, knowledgeType, level }))
        handleToggle()
        resetFields()
    }

    return (
        <div>
            <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
                <FaReadme /> Knowledge
            </NavLink>
            <Modal fade isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}><FaReadme /> Knowledge</ModalHeader>
                <ModalBody>
                    { msg ? <Alert color='danger'>{msg}</Alert> : null }
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for='knowledge'>Knowledge</Label>
                            <Input
                                type='text'
                                name='knowledge'
                                id='knowledge'
                                value={knowledge}
                                placeholder='Enter Name of Knowledge'
                                onChange={onChange}
                            />
                            <Label for='knowledgeType'>Type Of Knowledge</Label>
                            <Input
                                type='text'
                                name='knowledgeType'
                                id='knowledgeType'
                                value={knowledgeType}
                                placeholder='Enter Knowledge Type'
                                onChange={onChange}
                            />
                            <Label for='level'>Level Of Proficiency</Label>
                            <Input
                                type='text'
                                name='level'
                                id='level'
                                value={level}
                                placeholder='Enter Level Of Proficiency'
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

export default Knowledge