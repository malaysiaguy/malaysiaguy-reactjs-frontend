import MainScreen from '../components/MainScreen'
import CustomAccordion from '../components/CustomAccordion'
import ProfileDetails from '../components/ProfileDetails'
import ContactMap from '../components/ContactMap'

function ProfilePage() {
    const handlerDelete = () => {
        return ''
    }
    return (
        <MainScreen title1='PROFILE' title2='档案' title3='PROFIL'>
            <CustomAccordion header='Profile 档案 Profil' children={
                <ProfileDetails />
            } item='accordionItem1'>
            </CustomAccordion>
            <CustomAccordion header='Contact 联系 Perhubungan' children={
                <ContactMap />
            } item='accordionItem2'>
            </CustomAccordion>
        </MainScreen>
    )
}

export default ProfilePage