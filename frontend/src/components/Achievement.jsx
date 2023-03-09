import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAchievement } from '../features/achievement/achievementSlice'
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
import { FaAward, FaPlus } from 'react-icons/fa'

function Achievement() {
    const [formData, setFormData] = useState({
        years: '',
        name: '',
        awardType: '',
        organization: '',
    })
    const { years, name, awardType, organization } = formData

    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = () => setModal(!modal)
    const [msg, setMsg] = useState(null)

    const resetFields = () => {
        setFormData({
            years: '',
            name: '',
            awardType: '',
            organization: '',
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

        dispatch(createAchievement({ years, name, awardType, organization }))
        handleToggle()
        resetFields()
    }

    return (
        <div>
            <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
                <FaAward /> Achievement
            </NavLink>
            <Modal fade isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}><FaAward /> Achievement</ModalHeader>
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
                            <Label for='name'>Achievement Details</Label>
                            <Input
                                type='text'
                                name='name'
                                id='name'
                                value={name}
                                placeholder='Enter Achievement Details'
                                onChange={onChange}
                            />
                            <Label for='name'>Type Of Achievement</Label>
                            <Input
                                type='text'
                                name='awardType'
                                id='awardType'
                                value={awardType}
                                placeholder='Enter Achievement Type'
                                onChange={onChange}
                            />
                            <Label for='qualification'>Organization</Label>
                            <Input
                                type='text'
                                name='organization'
                                id='organization'
                                value={organization}
                                placeholder='Enter Organization Name'
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

export default Achievement