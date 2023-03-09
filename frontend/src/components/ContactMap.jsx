import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../features/auth/authSlice'
import {
    Container,
    Col,
    Row,
    Card,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Button
} from 'reactstrap'

function ContactMap() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.users)
    const [ state, setState ] = useState(user)
    console.log('contact user')
    console.log(user)

    useEffect(() => {
        const userData = {
            email: 'malaysiaguy@aliyun.com',
            password: '123456'
        }
        setState(userData)

        dispatch(login(userData))
    }, [dispatch])

    return (
            <Row className='bgImage g4 p-3'>
                <Col className='col-md-6'>
                    <ListGroup className='list-group-flush lead'>
                        <ListGroupItem className='bg-info'>
                            <ListGroupItemHeading className='fw-bold th text-success'>
                                Main Location 通讯处 Alamat :
                            </ListGroupItemHeading>
                            <ListGroupItemText className='align-left'>
                                {user ? user.address : ''}
                            <br />
                                {user ? user.city : ''}
                            <br />
                                {user ? user.states : ''}
                            <br />
                                {user ? user.country : ''}
                            <br />
                                {user ? user.zipcode : ''}
                            </ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem className='bg-warning'>
                            <ListGroupItemHeading className='fw-bold th text-success'>
                                Contact No 联络号码 No Telefon :
                            </ListGroupItemHeading>
                            <ListGroupItemText className='align-left'>
                                {user ? user.contact : ''}
                            </ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem className='bg-info'>
                            <ListGroupItemHeading className='fw-bold th text-success'>
                                Email 电邮信箱 Emel :
                            </ListGroupItemHeading>
                            <ListGroupItemText className='align-left'>
                                {user ? user.email : ''}
                            </ListGroupItemText>
                        </ListGroupItem>
                    </ListGroup>
                    <ListGroup className='list-group-flush lead'>
                        <ListGroupItem className='bg-warning'>
                            <ListGroupItemHeading className='fw-bold th text-success'>
                                NFT Site 网址 Laman NFT :
                            </ListGroupItemHeading>
                            <ListGroupItemText className='align-left'>
                                <a href='https://opensea.io/collection/sense-of-nature'
                                    style={{ color: 'blue', textDecoration: 'none' }}>
                                    https://opensea.io/collection/sense-of-nature
                                </a>
                                <br />
                                <a href='https://opensea.io/collection/malaysiaguy-sports'
                                    style={{ color: 'blue', textDecoration: 'none' }}>
                                    https://opensea.io/collection/malaysiaguy-sports
                                </a>
                                <br />
                                <a href='https://opensea.io/collection/malaysiaguy-collection-285582468'
                                    style={{ color: 'blue', textDecoration: 'none' }}>
                                    https://opensea.io/collection/malaysiaguy-collection-285582468
                                </a>
                            </ListGroupItemText>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col className='col-md-6'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.9589884836805!2d100.4933903147121!3d5.269073996177284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x80d9c81f729d7a6e!2zNcKwMTYnMDguNyJOIDEwMMKwMjknNDQuMSJF!5e0!3m2!1sen!2smy!4v1650889481154!5m2!1sen!2smy"
                        width="100%"
                        height="100%"
                        style={{border:0}}
                        allowfullscreen=""
                        loading="lazy"
                        className="py-3"
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </Col>
            </Row>
    )
}

export default ContactMap
