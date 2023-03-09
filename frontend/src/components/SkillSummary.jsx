import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createSkillSummary } from '../features/skillSummary/skillSummarySlice'
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
import { FaPlus, FaClipboard } from 'react-icons/fa'

function SkillSummary() {
    const [modal, setModal] = useState(false)
    const [skill, setSkill] = useState('')
    const [years, setYears] = useState('')
    const dispatch = useDispatch()
    const handleToggle = () => setModal(!modal)
    const [msg, setMsg] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createSkillSummary({ skill, years }))
        setSkill('')
        setYears('')
        handleToggle()
    }

    return (
        <div>
            <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
                <FaClipboard /> Skill Summary
            </NavLink>
            <Modal fade isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}><FaClipboard /> Skill Summary</ModalHeader>
                <ModalBody>
                    { msg ? <Alert color='danger'>{msg}</Alert> : null }
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for='skill'>Skill Description</Label>
                            <Input
                                type='text'
                                name='skill'
                                id='skill'
                                value={skill}
                                placeholder='Enter Skill Description'
                                onChange={(e) => setSkill(e.target.value)}
                            />
                            <Label for='years'>Total Years</Label>
                            <Input
                                type='text'
                                name='years'
                                id='years'
                                value={years}
                                placeholder='Enter Total Years'
                                onChange={(e) => setYears(e.target.value)}
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

export default SkillSummary