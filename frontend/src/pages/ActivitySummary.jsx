import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    NavLink,
    Table,
    Col,
    Row,
    Card,
    CardTitle,
    CardText,
    Button
} from 'reactstrap'
import { FaHiking } from 'react-icons/fa'
import MainScreen from '../components/MainScreen'
import CustomAccordion from '../components/CustomAccordion'
import Spinner from '../components/Spinner'
import Activity from '../components/Activity'
import { getActivity, reset } from '../features/activity/activitySlice'
import { login } from '../features/auth/authSlice'
import useSortableData from '../features/useSortableData'
import { storage } from '../firebase'
import {
    ref,
    getDownloadURL,
    listAll,
    list,
} from 'firebase/storage'

function ActivitySummary() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.users)
    const { activities, isLoading: isLoadingActivity, isError: isErrorActivity, message: messageActivity } = useSelector((state) => state.activities)
    const { items, requestSort } = useSortableData(activities)
    const [ state, setState ] = useState(user)
    const [show, setShow] = useState(false)
    const handleToggle = () => setShow(!show)
    const [imageUrls, setImageUrls] = useState([])
    const imagesListRef = ref(storage, 'bibs/')
    const [imageRaceUrls, setImageRaceUrls] = useState([])
    const imagesRaceListRef = ref(storage, 'races/')

    useEffect(() => {
        listAll(imagesListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
//                    console.log(url)
                    setImageUrls((prev) => [...prev, url])
                })
            })
        })
    }, [])

    useEffect(() => {
        listAll(imagesRaceListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
//                    console.log(url)
                    setImageRaceUrls((prev) => [...prev, url])
                })
            })
        })
    }, [])

    useEffect(() => {
        const userData = {
            email: 'malaysiaguy@aliyun.com',
            password: '123456'
        }
        setState(userData)

        dispatch(login(userData))
    }, [dispatch])

//    console.log('user - ' + user)
//    console.log('activities - ' + activities)
//    console.log('items - ' + items)
    useEffect(() => {
//        console.log('inside activity useEffect')
        if(isErrorActivity) {
            console.log(messageActivity);
        }
        if (!user) {
//            navigate('/')
        }
//        console.log('b4 dispatch activity')
        dispatch(getActivity())

        return () => {
            dispatch(reset())
        }
    }, [user, isErrorActivity, messageActivity, dispatch])

{/*    if(isLoadingActivity) {
        return <Spinner />
    }
*/}
    return (
    <>
{/*        <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
            <FaHiking /> Activity
        </NavLink> */}
        <MainScreen toggle={handleToggle} title1='ACTIVITY SUMMARY' title2='活动简报' title3='RINGKASAN AKTIVITI'>
            {
                items ? (
                    <CustomAccordion header='Social Activity 社交活动 Aktiviti Masyarakat' children={
                        <Table responsive striped>
                            <thead bgcolor='grey'>
                                <tr>
                                    <th className='th col-sm-2' onClick={() => requestSort('years')}>Year</th>
                                    <th className='th col-sm-8' onClick={() => requestSort('details')}>Details</th>
                                    <th className='th col-sm-2' onClick={() => requestSort('location')}>Location</th>
                                </tr>
                            </thead>
                             {
                                items.filter((activity) => activity.activityType === 'social').map((activity) => (
                                <tbody key={activity._id}>
                                    <tr>
                                        <td className='td col-sm-2'>{activity.years}</td>
                                        <td className='td col-sm-8'>{activity.details}</td>
                                        <td className='td col-sm-2'>{activity.location}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    } item='accordionItem1'>
                    </CustomAccordion>
                ) : (
                    <div>
                        <h3>
                            You have not enter any data yet.
                            <br />
                            Please add your data here
                        </h3>
                        <Activity />
                    </div>
                ) }
            {
                items ? (
                    <CustomAccordion header='Outdoor Activity 户外活动 Aktiviti Luar'
                        children={
                        <Table responsive striped>
                            <thead bgcolor='grey'>
                                <tr>
                                    <th className='th col-sm-2' onClick={() => requestSort('years')}>Year</th>
                                    <th className='th col-sm-8' onClick={() => requestSort('details')}>Details</th>
                                    <th className='th col-sm-2' onClick={() => requestSort('location')}>Location</th>
                                </tr>
                            </thead>
                             {
                                items.filter((activity) => activity.activityType !== 'social').map((activity) => (
                                <tbody key={activity._id}>
                                    <tr>
                                        <td className='td col-sm-2'>{activity.years}</td>
                                        <td className='td col-sm-8'>{activity.details}</td>
                                        <td className='td col-sm-2'>{activity.location}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    } item='accordionItem2'>
                    </CustomAccordion>
                ) : (
                    <div>
                        <h3>
                            You have not enter any data yet.
                            <br />
                            Please add your data here
                        </h3>
                        <FaHiking /> <Activity />
                    </div>
                ) }
            <CustomAccordion header='Racing Photos 赛跑相片 Foto Perlumbaan' children={
            <Row className='text-justify g-4'>
            {
            imageRaceUrls.length > 0 ? (
                imageRaceUrls.map((url, key) =>
                    <Col className='col' key={key}>
                        <Card key='key' className='bg-primary text-light'>
                            <CardTitle className='h3 mb-3' style={{ color: 'yellow' }}>
                                {url.substring(url.lastIndexOf('F') + 1).substring(5).split('.')[0]}
                            </CardTitle>
                            <CardText className='mb-3'>
                                <img className='img' src={url}>
                                </img>
                            </CardText>
                        </Card>
                    </Col>
                )) : (
                    <div>
                        <h3>
                            There is no image yet.
                        </h3>
                    </div>
                    )
                }
                </Row>
            } item='accordionItem3'>
            </CustomAccordion>
            <CustomAccordion header='Marathon Bib 号码布 Bib Perlumbaan' children={
            <Row className='text-justify g-4'>
            {
            imageUrls.length > 0 ? (
                imageUrls.map((url, key) =>
                    <Col className='col' key={key}>
                        <Card key='key' className='bg-primary text-light'>
                            <CardTitle className='h3 mb-3' style={{ color: 'yellow' }}>
                                {url.substring(url.indexOf('_') + 1).substring('_').split('.')[0]}
                            </CardTitle>
                            <CardText className='mb-3'>
                                <img className='imgLandscape' src={url}>
                                </img>
                            </CardText>
                        </Card>
                    </Col>
                )) : (
                    <div>
                        <h3>
                            There is no image yet.
                        </h3>
                    </div>
                    )
                }
                </Row>
            } item='accordionItem4'>
            </CustomAccordion>
        </MainScreen>
    </>
    )
}

export default ActivitySummary
