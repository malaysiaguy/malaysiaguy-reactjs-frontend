import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../features/auth/authSlice'
import {
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    CardText,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Button
} from 'reactstrap'
import { format } from 'date-fns'
import { storage } from '../firebase'
import {
    ref,
    getDownloadURL,
    listAll,
    list,
} from 'firebase/storage'

function ProfileDetails() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.users)
    const [ state, setState ] = useState(user)
//    console.log('profile detail user')
//    console.log(user)

    useEffect(() => {
        const userData = {
            email: 'malaysiaguy@aliyun.com',
            password: '123456'
        }
        setState(userData)

        dispatch(login(userData))
    }, [dispatch])

    const [imageUrls, setImageUrls] = useState([])
    const imagesListRef = ref(storage, 'profile/')

    useEffect(() => {
        listAll(imagesListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    console.log(url)
                    setImageUrls((prev) => [...prev, url])
                })
            })
        })
    }, [])

    return (
        <Row className='text-center bg-dark g-4'>
            <Col className='col-md-4 mb-3'>
                <div id='pic' className='bg-info' style={{ height: '100%' }}>
                <ListGroup className='list-group-flush lead bg-info'>
                    <ListGroupItem className='bg-info'>
                        <ListGroupItemHeading className='fw-bold th text-success'>
                            First Name 名字 Nama Pertama :
                        </ListGroupItemHeading>
                        <ListGroupItemText className='align-left'>
                            {user ? user.firstname : ''}
                        </ListGroupItemText>
                        <ListGroupItemHeading className='fw-bold th text-success'>
                            Last Name 姓氏 Nama Keluarga :
                        </ListGroupItemHeading>
                        <ListGroupItemText className='align-left'>
                            {user ? user.lastname : ''}
                        </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem className='bg-info'>
                        <ListGroupItemHeading className='fw-bold th text-success'>
                            National Identity No 身份证号码 Kad Pengenalan :
                        </ListGroupItemHeading>
                        <ListGroupItemText className='align-left'>
                            {user ? user.nric : ''}
                        </ListGroupItemText>
                        <ListGroupItemHeading className='fw-bold th text-success'>
                            Date of Birth 出生日期 Tarikh Kelahiran :
                        </ListGroupItemHeading>
                        <ListGroupItemText className='align-left'>
                            {user ? format(new Date(user.dob), 'yyyy-MM-dd') : ''}
                        </ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
                </div>
            </Col>
            <Col className='col-md-4 mb-3'>
                <div id='pic' className='bg-info' style={{ height: '100%' }}>
                <ListGroup className='list-group-flush lead bg-info'>
                    <ListGroupItem className='bg-info'>
                        <ListGroupItemHeading className='fw-bold th text-success'>
                            Gender 性别 Janita :
                        </ListGroupItemHeading>
                        <ListGroupItemText className='align-left'>
                            {user ? user.gender : ''}
                        </ListGroupItemText>
                        <ListGroupItemHeading className='fw-bold th text-success'>
                            Marital Status 婚姻状况 Status Perkahwinan :
                        </ListGroupItemHeading>
                        <ListGroupItemText className='align-left'>
                            {user ? user.marital : ''}
                        </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem className='bg-info'>
                        <ListGroupItemHeading className='fw-bold th text-success'>
                            Place of Birth 诞生地点 Tempat Kelahiran :
                        </ListGroupItemHeading>
                        <ListGroupItemText className='align-left'>
                            {user ? user.placeofbirth : ''}
                        </ListGroupItemText>
                        <ListGroupItemHeading className='fw-bold th text-success'>
                            Nationality 国籍 Kewarganegaraan :
                        </ListGroupItemHeading>
                        <ListGroupItemText className='align-left'>
                            {user ? user.nationality : ''}
                        </ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
                </div>
            </Col>
            <Col className='col-md-4 mb-3'>
                <div id='pic' className='bg-info' style={{ height: '100%' }}>
                <ListGroup className='list-group-flush lead bg-info'>
                    <ListGroupItem className='bg-info'>
                        <ListGroupItemHeading className='fw-bold th text-success'>
                            Profile Picture 个人照片 Gambar Profil :
                        </ListGroupItemHeading>
                        {
                            imageUrls.length > 0 ? (
                                imageUrls.map((url, key) =>
                             <ListGroupItemText className='me-10' key={key}>
                               <img src={url} className='rounded-circle img'></img>
                            </ListGroupItemText>
                        )) : (
                            <div>
                                <h3>
                                    There is no image yet.
                                </h3>
                            </div>
                            )
                        }
                    </ListGroupItem>
                </ListGroup>
                </div>
            </Col>
        </Row>
    )
}

export default ProfileDetails