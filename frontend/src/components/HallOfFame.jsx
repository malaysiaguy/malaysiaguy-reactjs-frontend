import { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import {
    Container,
    Col,
    Row,
    Card,
    CardTitle,
    CardText,
    CardLink,
    Button
} from 'reactstrap'
import { storage } from '../firebase'
import {
    ref,
    getDownloadURL,
    listAll,
    list,
} from 'firebase/storage'
import TinderCards from '../TinderCards'

function HallOfFame() {
    const [imageUrls, setImageUrls] = useState([])
    const imagesListRef = ref(storage, 'awards/')
    const [imageMarathonUrls, setImageMarathonUrls] = useState([])
    const imagesMarathonListRef = ref(storage, 'marathons/')
    const [imageAcademicUrls, setImageAcademicUrls] = useState([])
    const imagesAcademicListRef = ref(storage, 'academics/')

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
        listAll(imagesMarathonListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
//                    console.log(url)
                    setImageMarathonUrls((prev) => [...prev, url])
                })
            })
        })
    }, [])

    useEffect(() => {
        listAll(imagesAcademicListRef).then((res) => {
            res.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
//                    console.log(url)
                    setImageAcademicUrls((prev) => [...prev, url])
                })
            })
        })
    }, [])

    return (
        <Container className='text-light bgImage'>
            <Row className='text-justify g-4'>
                <Col className='col-lg-12'>
                    <h3 style={{ color: 'cyan' }}>Please Swipe the Photos 请滑动相片 Sila Leret Foto</h3>
                </Col>
            {
                imageUrls.length > 0 ? (
                <Col className='col-lg-6'>
                    <TinderCards imageUrls={imageUrls}></TinderCards>
                </Col>
            ) : (
                <div>
                    <h3 style={{ color: 'yellow' }}>
                        There is no image yet.
                    </h3>
                </div>
                )
            }
            {
                imageMarathonUrls.length > 0 ? (
                <Col className='col-lg-6'>
                    <TinderCards imageUrls={imageMarathonUrls}></TinderCards>
                </Col>
            ) : (
                <div>
                    <h3 style={{ color: 'yellow' }}>
                        There is no image yet.
                    </h3>
                </div>
                )
            }
                imageAcademicUrls.length > 0 ? (
                <Col className='col-lg-6'>
                    <TinderCards imageUrls={imageAcademicUrls}></TinderCards>
                </Col>
            ) : (
                <div>
                    <h3 style={{ color: 'yellow' }}>
                        There is no image yet.
                    </h3>
                </div>
                )
            }
            </Row>
        </Container>
    )
}

export default (HallOfFame)
