import CustomAccordion from '../components/CustomAccordion'
import Main from '../components/Main'
import HallOfFame from '../components/HallOfFame'
import ContactMap from '../components/ContactMap'
import Footer from '../components/Footer'

function Home() {

    return (
        <section id='intro' className='p-5 m-5 text-light bgImage'>
            <Main />
            <CustomAccordion header='Hall Of Fame 星光大道 Ruang Kegemilangan' children={
                <HallOfFame />
            } item='accordionItem1'>
            </CustomAccordion>
            <CustomAccordion header='Contact 联系 Perhubungan' children={
                <ContactMap />
            } item='accordionItem2'>
            </CustomAccordion>
            <Footer />
        </section>
    )
}

export default Home