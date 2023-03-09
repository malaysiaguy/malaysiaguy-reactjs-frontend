import { Container } from 'reactstrap'

function Footer() {
    return (
        <Container className='bgImage text-light'>
            <footer className='text-warning text-center position-relative'>
                <p className='lead'>Updated on April 2023</p>
{/*                        <a href='#' className='position-absolute bottom-0 end-0 p-5'>
                        <i className='bi bi-arrow-up-circle h1'>
                    </a> */}
            </footer>
        </Container>
    )
}

export default Footer