import { Container, Row } from 'reactstrap'

function MainScreen({ children, title1, title2, title3 }) {
    return (
        <div>
            <Container>
                <Row>
                    <div className='page'>
                        {
                            (title1 || title2 || title3) && (
                                <>
                                    <div className='main-heading text-center mb-4'>
                                        <span className='text-secondary px-1'>{title1}</span>
                                        <span className='text-danger px-1'>{title2}</span>
                                        <span className='text-secondary px-1'>{title3}</span>
                                    </div>
                                    <hr />
                                </>
                            )
                        }
                        {children}
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default MainScreen