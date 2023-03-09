import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Register from '../pages/Register'
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
    Alert,
    Container
} from 'reactstrap'

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { email, password } = formData
    const [modal, setModal] = useState(false)
    const [msg, setMsg] = useState(null)
    const handleToggle = () => setModal(!modal)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.users)
//    console.log('login isSuccess - ' + isSuccess)
//    console.log('login - ' + user)
    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
//            console.log('login isSuccess')
            navigate('/')
            handleToggle()
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

        const userData = {
            email,
            password,
        }

//        console.log('login userData.email = ' + userData.email)
        dispatch(login(userData))
    }

{/*    if(isLoading) {
        return <Spinner />
    }
*/}

    return (
    <div>
        <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
            <FaSignInAlt /> Login
        </NavLink>
        <Modal fade isOpen={modal} toggle={handleToggle}>
            <ModalHeader toggle={handleToggle}><FaSignInAlt /> Login</ModalHeader>
            <ModalBody>
                { msg ? <Alert color='danger'>{msg}</Alert> : <Alert color='dark'>Login and start setting goals</Alert> }
                <Form onSubmit={onSubmit}>
                    <FormGroup>
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
                        <Button color='dark' style={{ marginTop: '2rem' }} block>
                            Login
                        </Button>
                    </FormGroup>
                </Form>
                <Container>Do not have account yet? Please
                    <Register />
                </Container>
            </ModalBody>
        </Modal>
    </div>
    )
}

export default Login