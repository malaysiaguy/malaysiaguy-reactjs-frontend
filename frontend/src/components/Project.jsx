import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { createProject } from '../features/project/projectSlice'
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
import { FaPlus, FaRegFileAlt } from 'react-icons/fa'

function Project({work}) {
//    console.log('companyId - ' + work._id)
    const [formData, setFormData] = useState({
            companyId: '',
            projectItem: '',
            projectName: '',
            projectDuration: '',
            projectRole: '',
            projectDetails: ''
    })
    const { projectItem, projectName, projectDuration, projectRole, projectDetails } = formData
    let companyId = work._id
    let isVisible = false

    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => setModal(!modal)
    const [msg, setMsg] = useState(null)

    const resetFields = () => {
        setFormData({
            companyId: '',
            projectItem: '',
            projectName: '',
            projectDuration: '',
            projectRole: '',
            projectDetails: ''
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
//        console.log('companyId submit - ' + companyId)
//        console.log('projectDetails - ' + projectDetails)

        dispatch(createProject({ companyId, projectItem, projectName, projectDuration, projectRole, projectDetails }))
        handleToggle()
        resetFields()
    }

    return (
        <div>
            <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
                <FaRegFileAlt /> Add Task
            </NavLink>
            <Modal fade isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}><FaRegFileAlt /> Project</ModalHeader>
                <ModalBody>
                    { msg ? <Alert color='danger'>{msg}</Alert> : null }
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            {
                                isVisible ? <Input type='id' name='companyId' id='companyId' value={companyId} /> : null
                            }
                            <Label for='projectItem'>Project Item</Label>
                            <Input
                                type='text'
                                name='projectItem'
                                id='projectItem'
                                value={projectItem}
                                placeholder='Enter Project Item'
                                onChange={onChange}
                            />
                            <Label for='projectName'>Project Name</Label>
                            <Input
                                type='text'
                                name='projectName'
                                id='projectName'
                                value={projectName}
                                placeholder='Enter Project Name'
                                onChange={onChange}
                            />
                            <Label for='projectDuration'>Project Duration</Label>
                            <Input
                                type='text'
                                name='projectDuration'
                                id='projectDuration'
                                value={projectDuration}
                                placeholder='Enter Project Duration'
                                onChange={onChange}
                            />
                            <Label for='projectRole'>Project Role</Label>
                            <Input
                                type='text'
                                name='projectRole'
                                id='projectRole'
                                value={projectRole}
                                placeholder='Enter Project Role'
                                onChange={onChange}
                            />
                            <Label for='projectDetails'>Project Details</Label>
                            <Input
                                type='textarea'
                                name='projectDetails'
                                id='projectDetails'
                                value={projectDetails}
                                defaultValue=''
                                placeholder='Enter Project Details'
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

export default Project