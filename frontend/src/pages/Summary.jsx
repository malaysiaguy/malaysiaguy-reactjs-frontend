import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    NavLink,
    Table,
    Button
} from 'reactstrap'
import { FaElementor } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import MainScreen from '../components/MainScreen'
import CustomAccordion from '../components/CustomAccordion'
import ExperienceSummary from '../components/ExperienceSummary'
import ExperienceItem from '../components/ExperienceItem'
import SkillSummary from '../components/SkillSummary'
import SkillItem from '../components/SkillItem'
import { getExperienceSummary } from '../features/experienceSummary/experienceSummarySlice'
import { getSkillSummary, reset } from '../features/skillSummary/skillSummarySlice'
import { login } from '../features/auth/authSlice'
import useSortableData from '../features/useSortableData'

function Summary() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.users)
    const { experienceSummaries, isLoading: isLoadingExperience, isError: isErrorExperience, message: messageExperience } = useSelector((state) => state.experienceSummaries)
    const { skillSummaries, isLoading: isLoadingSkill, isError: isErrorSkill, message: messageSkill } = useSelector((state) => state.skillSummaries)
    const { items: experienceSummariesItems, requestSort: experienceSummariesRS } = useSortableData(experienceSummaries)
    const { items: skillSummaryitems, requestSort: skillSummaryRS } = useSortableData(skillSummaries)
    const [show, setShow] = useState(false)
    const handleToggle = () => setShow(!show)
    const [ state, setState ] = useState(user)

//    console.log('experienceSummary - ' + experienceSummaries)
//    console.log('skillSummary - ' + skillSummaries)
//    console.log('experienceSummaryitems - ' + experienceSummariesItems)
//    console.log('skillSummaryitems - ' + skillSummaryitems)
    useEffect(() => {
//        console.log('inside useEffect user')
        const userData = {
            email: 'malaysiaguy@aliyun.com',
            password: '123456'
        }
        setState(userData)

        dispatch(login(userData))
    }, [dispatch])

    useEffect(() => {
//        console.log('inside useEffect experienceSummary')
        if(isErrorExperience) {
            console.log(messageExperience);
        }
        if (!user) {
//            navigate('/')
        }

        dispatch(getExperienceSummary())

        return () => {
            dispatch(reset())
        }
    }, [user, isErrorExperience, messageExperience, dispatch])

    useEffect(() => {
        console.log('inside useEffect skillSummary')
        if(isErrorSkill) {
            console.log(messageSkill);
        }
        if (!user) {
//            navigate('/')
        }

        dispatch(getSkillSummary())

        return () => {
            dispatch(reset())
        }
    }, [user, isErrorSkill, messageSkill, dispatch])

{/*    if(isLoadingSkill && isLoadingExperience) {
        return <Spinner />
    }
*/}
    return (
    <>
{/*        <NavLink style={{ color: 'grey', textDecoration: 'none' }} onClick={handleToggle}>
            <FaElementor /> Summary
        </NavLink> */}
        <MainScreen isOpen={show} toggle={handleToggle} title1='SUMMARY' title2='简报' title3='RINGKASAN'>
            {
                experienceSummariesItems ? (
                    <CustomAccordion header='Working Experience 工作经验 Pengalaman Pekerjaan'
                        children={
                            <Table responsive striped>
                                <thead bgcolor='grey'>
                                    <tr>
                                        <th className='th col-sm-9' onClick={() => experienceSummariesRS('experience')}>Description</th>
                                        <th className='col-sm-3' onClick={() => experienceSummariesRS('years')}>No of Years</th>
                                    </tr>
                                </thead>
                                 {
                                    experienceSummariesItems.map((summary) => (
                                    <ExperienceItem key={summary._id} summary={summary} />
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
                        <ExperienceSummary />
                    </div>
                ) }
            {
                skillSummaryitems ? (
                    <CustomAccordion header='Skill Sets 技能 Kemahiran'
                        children={
                            <Table responsive striped>
                                <thead bgcolor='grey'>
                                    <tr>
                                        <th className='th col-sm-9' onClick={() => skillSummaryRS('skill')}>Description</th>
                                        <th className='col-sm-9' onClick={() => skillSummaryRS('years')}>No of Years</th>
                                    </tr>
                                </thead>
                                {
                                    skillSummaryitems.map((summary) => (
                                    <SkillItem key={summary._id} summary={summary} />
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
                        <SkillSummary />
                    </div>
                ) }
        </MainScreen>
    </>
    )
}

export default Summary
