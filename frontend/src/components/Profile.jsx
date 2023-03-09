import { useState, useEffect } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, update, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { format } from 'date-fns'
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
import CountryStateCity from '../components/CountryStateCity'

function Profile() {
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.users)
    const [state, setState] = useState(user)
    const [modal, setModal] = useState(false)
    const [genre, setGenre] = useState(false)
    const [msg, setMsg] = useState(null)

    const [formData, setFormData] = useState({
        id: '',
        token: '',
        name: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        password2: '',
        nric: '',
        dob: '',
        gender: '',
        nationality: '',
        marital: '',
        placeofbirth: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        contact: '',
        photo: ''
    })

    const userId = user ? user._id : ''
    const userToken = user ? user.token : ''
    const {
        id,
        token,
        name,
        email,
        password,
        password2,
        firstname,
        lastname,
        nric,
        dob,
        gender,
        nationality,
        marital,
        placeofbirth,
        address,
        city,
        states,
        country,
        zipcode,
        contact,
        photo
    } = formData

    const handleToggle = () => {
        setModal(!modal)
    }
    let isVisible = false

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const userData = {
            email: 'malaysiaguy@aliyun.com',
            password: '123456'
        }
        setState(userData)

        dispatch(login(userData))
    }, [dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = formData

        dispatch(update(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
    <div>
        <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
            <FaRegUser /> Profile
        </NavLink>
        <Modal fade={true} isOpen={modal} toggle={handleToggle}>
            <ModalHeader toggle={handleToggle}><FaRegUser /> Profile</ModalHeader>
            <ModalBody>
                { msg ? <Alert color='danger'>{msg}</Alert> : null }
                <Form onSubmit={onSubmit}>
                    <FormGroup>
//                        { user ? setFormData({id: user._id}) : null }
                        <Input type='id' style={{display: 'none'}} name='id' id='id'
                            value={user? user._id : null} />
                        <Label for='name'>User Name</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
//                            value={user.name ? setFormData({name:user.name}) : name}
                            value={user.name ? user.name : name}
                            onChange={onChange}
                        />
                        <Label for='email'>Email</Label>
                        <Input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
//                            value={user.email ? setFormData({email:user.email}) : email}
                            value={user.email ? user.email : email}
                            onChange={onChange}
                            readOnly={true}
                        />
                        <Label for='password'>Change New Password</Label>
                        <Input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter your new password'
                            onChange={onChange}
                        />
                        <Label for='password2'>Confirm New Password</Label>
                        <Input
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            placeholder='Confirm new password'
                            onChange={onChange}
                        />
                        <Label for='firstname'>First Name</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='firstname'
                            name='firstname'
//                            value={user.firstname ? setFormData({firstname:user.firstname}) : firstname}
                            value={user.firstname ? user.firstname : firstname}
                            placeholder='Enter your first name'
                            onChange={onChange}
                        />
                        <Label for='lastname'>Last Name</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='lastname'
                            name='lastname'
//                            value={user.lastname ? setFormData({lastname:user.lastname}) : lastname}
                            value={user.lastname ? user.lastname : lastname}
                            placeholder='Enter your last name'
                            onChange={onChange}
                        />
                        <Label for='nric'>NRIC</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='nric'
                            name='nric'
//                            value={user.nric ? setFormData({nric:user.nric}) : nric}
                            value={user.nric ? user.nric : nric}
                            placeholder='Enter your ic no'
                            onChange={onChange}
                        />
                        <Label for='dob'>Date of Birth</Label>
                        <Input
                            type='date'
                            className='form-control'
                            id='dob'
                            name='dob'
//                            value={(user.dob) ? setFormData(format(new Date(user.dob), 'yyyy-MM-dd')) : user.dob}
                            value={(user.dob) ? format(new Date(user.dob), 'yyyy-MM-dd') : user.dob}
                            placeholder='Enter your date of birth'
                            onChange={onChange}
                        />
                        <Label for='gender'>Gender</Label>
                        <Input
                            type='select'
                            className='form-control'
                            id='gender'
                            name='gender'
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            <option>--Choose Gender--</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </Input>
                        <Label for='nationality'>Nationality</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='nationality'
                            name='nationality'
//                            value={user.nationality ? setFormData({nationality:user.nationality}) : nationality}
                            value={user.nationality ? user.nationality : nationality}
                            placeholder='Enter your nationality'
                            onChange={onChange}
                        />
                        <Label for='name'>Marital Status</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='marital'
                            name='marital'
//                            value={user.marital ? setFormData({marital:user.marital}) : marital}
                            value={user.marital ? user.marital : marital}
                            placeholder='Enter your marital status'
                            onChange={onChange}
                        />
                        <Label for='placeofbirth'>Place of Birth</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='placeofbirth'
                            name='placeofbirth'
//                            value={user.placeofbirth ? setFormData({placeofbirth:user.placeofbirth}) : placeofbirth}
                            value={user.placeofbirth ? user.placeofbirth : placeofbirth}
                            placeholder='Enter your place of birth'
                            onChange={onChange}
                        />
                        <Label for='address'>Address</Label>
                        <Input
                            type='textarea'
                            className='form-control'
                            id='address'
                            name='address'
//                            value={user.address ? setFormData({address:user.address}) : address}
                            value={user.address ? user.address : address}
                            placeholder='Enter your address'
                            onChange={onChange}
                        />
{/*                        <Label for='states'>State</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='states'
                            name='states'
                            value={states}
                            placeholder='Enter the state'
                            onChange={onChange}
                        />
                        <Label for='country'>Country</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='country'
                            name='country'
                            value={country}
                            placeholder='Enter the country'
                            onChange={onChange}
                        /> */}
                        <CountryStateCity />
                        <Label for='zipcode'>Zip Code</Label>
                        <Input
                            type='text'
                            className='form-control'
                            id='zipcode'
                            name='zipcode'
//                            value={user.zipcode ? setFormData({zipcode:user.zipcode}) : zipcode}
                            value={user.zipcode ? user.zipcode : zipcode}
                            placeholder='Enter the zipcode'
                            onChange={onChange}
                        />
                        <Label for='contact'>Contact No</Label>
                        <Input
                            type='number'
                            className='form-control'
                            id='contact'
                            name='contact'
//                            value={user.contact ? setFormData({contact:user.contact}) : contact}
                            value={user.contact ? user.contact : contact}
                            placeholder='Enter the contact no'
                            onChange={onChange}
                        />
                        <Label for='photo'>Photo</Label>
                        <Input
                            type='file'
                            className='form-control'
                            id='photo'
                            name='photo'
//                            value={user.photo ? setFormData({photo:user.photo}) : photo}
                            value={user.photo ? user.photo : photo}
                            placeholder='Select the image file'
                            onChange={onChange}
                        />
                        <Button color='dark' style={{ marginTop: '2rem' }} block>
                            Update
                        </Button>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    </div>
    )
}

export default Profile