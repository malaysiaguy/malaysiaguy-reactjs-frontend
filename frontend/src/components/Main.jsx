import {
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardText,
    CardLink,
    Button
} from 'reactstrap'

function Main() {

    return (
        <Container className='text-light'>
            <Row className='g4'>
                <Col className='col-md-4 mb-3'>
                    <Card className='p-5 bg-secondary text-light' style={{ height: '100%' }}>
                        <CardTitle className='mb-3'>
                            <span className='text-danger h2 px-2'>Origin of This Website</span>
                        </CardTitle>
                        <CardText className='align-justify'>Recently, a lot of people ask me for my personal website. May it be friends
                            friends from social media or recruiters from job agencies or the interviewers.
                            After thinking for a period of time, I decided to compile every single piece
                            of the jigsaw puzzle that I have collected throughout my learning curve in
                            my lifetime and put them together into a group of dynamic web pages.
                        </CardText>
                        <CardText className='align-justify'>This website is developed using some trendy tools and technologies that I have learnt
                            recently via free online tutorials, youtube tutorials, prodcasts and webinars. The tools and
                            technologies used in this website development includes MERN Stack, Bootstrap, Redux, JWT, Axios, Mongoose, Firebase Bucket,
                            Heroku and some CSS stylesheet files.
                        </CardText>
                        <CardText className='align-justify'>Therefore, I would like to take this opportunity to express my greatest gratitude to these organizations.
                            Here are some of the organizations with the website link:-
                        </CardText>
                    </Card>
                </Col>
                <Col className='col-md-4 mb-3'>
                    <Card className='p-5 bg-primary text-dark' style={{ height: '100%' }}>
                        <CardTitle className='mb-3'>
                            <br />
                            <span className='text-warning h2 px-2'>网页的缘起</span>
                            <br />
                            <br />
                        </CardTitle>
                        <CardText className='align-justify'>
                            最近，有好些人向我索取私人网址。包括了一些网友，职业介绍所的招聘人员以及公司行号的应征经理。经过了一段时间的考量，
                            终于决定把我一生中经历过的，学习过的一些零散琐碎的拼图，凑在一起，构成这幅活动网页。
                        </CardText>
                        <CardText className='align-justify'>
                            这幅网页是我通过免费网路课程，视频分享课程，播客以及网路研讨会学习到的时下最热门时尚的技术工具。这些技术工具包括了
                            MERN Stack, Bootstrap, Redux, JWT, Axios, Mongoose, Firebase Bucket, Heroku 以及 CSS 样式表。
                        </CardText>
                        <CardText className='align-justify'>
                            因此，我想借这个机会向这些机构及个体表达我至上的感恩。以下列出这些机构的行号以及机构的网站链接：-
                        </CardText>
                    </Card>
                </Col>
                <Col className='col-md-4 mb-3'>
                    <Card className='p-5 bg-secondary text-light' style={{ height: '100%' }}>
                        <CardTitle className='mb-3'>
                            <span className='text-danger h2 px-2'>Asal Laman Web</span>
                        </CardTitle>
                        <CardText className='align-justify'>Ramai orang minta laman web saya kebelakangan ini, biar
                            kenalan dari media sosial, wakil perkerjaan mahupun pengurus syarikat yang menjalani
                            temuduga. Selepas memikirkannya buat seketika, akhirnya saya mengambil keputusan mengumpulkan
                            serpihan gambaran tertinggal dalam ingatan sepanjang detik-detik pembelajaran saya dan
                            mengumpulnya jadikan sekumpulan laman yang dinamik.
                        </CardText>
                        <CardText className='align-justify'>
                            Laman web ini dibina menggunakan beberapa alat dan teknologi yang terkini dan bergaya
                            yang dipelajari kebelakangan ini melalui kursus percuma dalam talian, rakaman siaran
                            dan webinar. Alat dan teknologi digunakan dalam binaan laman ini termasuk MERN Stack,
                            Bootstrap, Redux, JWT, Axios, Mongoose, Firebase Bucket, Heroku dan CSS lembaran gaya.
                        </CardText>
                        <CardText className='align-justify'>Oleh itu, saya ingin mengambil kesempatan ini meluahkan
                            kesyukuran saya terhadap organisasi tersebut. Di bawah adalah sebahagian pautan laman web
                            organisasi tersebut:-
                        </CardText>
                    </Card>
                </Col>
            </Row>
            <Row className='g4'>
                <Col className='col-md-12 mb-3'>
                    <Card className='p-5 bg-success text-light' style={{ height: '100%' }}>
                        <CardText className='text-info align-justify'>
                            <a href='https://www.coursera.org' className='text-decoration-none'><span className='lead text-warning mx-2'>coursera</span></a>
                            <a href='https://www.simplilearn.com' className='text-decoration-none'><span className='lead text-warning mx-2'>simplilearn</span></a>
                            <a href='https://www.mygreatlearning.com' className='text-decoration-none'><span className='lead text-warning mx-2'>mygreatlearning</span></a>
                            <a href='https://www.edx.org' className='text-decoration-none'><span className='lead text-warning mx-2'>edX</span></a>
                            <a href='https://www.amigoscode.com' className='text-decoration-none'><span className='lead text-warning mx-2'>amigoscode</span></a>
                            <a href='https://www.mindluster.com' className='text-decoration-none'><span className='lead text-warning mx-2'>mindluster</span></a>
                            <a href='https://www.accenture.com' className='text-decoration-none'><span className='lead text-warning mx-2'>accenture</span></a>
                            <a href='https://www.edureka.co' className='text-decoration-none'><span className='lead text-warning mx-2'>edureka</span></a>
                            <a href='https://codingwithbasir.com' className='text-decoration-none'><span className='lead text-warning mx-2'>codingwithbasir</span></a>
                            <a href='https://traversymedia.com' className='text-decoration-none'><span className='lead text-warning mx-2'>traversymedia</span></a>
                            <a href='https://notezipper.herokuapp.com' className='text-decoration-none'><span className='lead text-warning mx-2'>roadsidecoder</span></a>
                            <a href='https://intellipaat.com' className='text-decoration-none'><span className='lead text-warning mx-2'>intellipaat</span></a>
                            <a href='https://www.twitter.com/johna2' className='text-decoration-none'><span className='lead text-warning mx-2'>walkthroughcode</span></a>
                            <a href='https://www.twitter.com/itsmaheshkariya' className='text-decoration-none'><span className='lead text-warning mx-2'>maheshkariya</span></a>
                            <a href='https://www.balldontlie.io' className='text-decoration-none'><span className='lead text-warning mx-2'>arslan</span></a>
                            <a href='https://www.alison.com' className='text-decoration-none'><span className='lead text-warning mx-2'>alison</span></a>
                            <a href='https://www.machadopedro.com' className='text-decoration-none'><span className='lead text-warning mx-2'>pedrotech</span></a>
                            <a href='https://www.academind.com' className='text-decoration-none'><span className='lead text-warning mx-2'>academind</span></a>
                            <a href='https://www.freecodecamp.org' className='text-decoration-none'><span className='lead text-warning mx-2'>freecodecamp</span></a>
                        </CardText>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Main