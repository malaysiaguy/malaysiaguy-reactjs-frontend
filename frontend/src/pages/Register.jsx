import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
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

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData
    const [modal, setModal] = useState(false)
    const [msg, setMsg] = useState(null)
    const handleToggle = () => setModal(!modal)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.users)

//    console.log('register isSuccess - ' + isSuccess)
//    console.log('register - ' + user)
    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== password2) {
            toast.error('Password do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }

{/*    if(isLoading) {
        return <Spinner />
    }
*/}
    return (
    <div>
        <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
            <FaUser /> Register
        </NavLink>
        <Modal fade isOpen={modal} toggle={handleToggle}>
            <ModalHeader toggle={handleToggle}><FaUser /> Register</ModalHeader>
            <ModalBody>
                { msg ? <Alert color='danger'>{msg}</Alert> : null }
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for='name'>Name</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            onChange={onChange}
                        />
                        <Label for='email'>Email</Label>
                        <Input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                        />
                        <Label for='password'>Password</Label>
                        <Input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter your password'
                            onChange={onChange}
                        />
                        <Label for='password2'>Confirm Password</Label>
                        <Input
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            placeholder='Confirm password'
                            onChange={onChange}
                        />
                        <Button color='dark' style={{ marginTop: '2rem' }} block>
                            Register
                        </Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    </div>
    )
}

export default Register