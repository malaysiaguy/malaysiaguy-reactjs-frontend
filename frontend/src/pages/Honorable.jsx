import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    Table,
    Button
} from 'reactstrap'
import Spinner from '../components/Spinner'
import MainScreen from '../components/MainScreen'
import CustomAccordion from '../components/CustomAccordion'
import Achievement from '../components/Achievement'
import AchievementItem from '../components/AchievementItem'
import { getAchievement, reset } from '../features/achievement/achievementSlice'
import { login } from '../features/auth/authSlice'
import useSortableData from '../features/useSortableData'

function Honorable() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.users)
    const { achievements, isLoading, isError, message } = useSelector((state) => state.achievements)
    console.log('user - ' + user)
    console.log('achievements - ' + achievements)
    const { items, requestSort } = useSortableData(achievements)
    const [ state, setState ] = useState(user)

    useEffect(() => {
        const userData = {
            email: 'malaysiaguy@aliyun.com',
            password: '123456'
        }
        setState(userData)

        dispatch(login(userData))
    }, [dispatch])

    useEffect(() => {
        if(isError) {
            console.log(message);
        }
        if (!user) {
//            navigate('/')
        }

        console.log('useEffect b4 getAchievement')
        dispatch(getAchievement())

        return () => {
            dispatch(reset())
        }
    }, [user, isError, message, navigate, dispatch])

{/*    if(isLoading) {
        return <Spinner />
    }
*/}
    return (
        <MainScreen title1='ACHIEVEMENT' title2='成就' title3='PENCAPAIAN'>
            {
                items.length > 0 ? (
                    <CustomAccordion header='Employment 职业 Pekerjaan' children={
                        <Table responsive striped={true}>
                            <thead bgcolor='grey'>
                                <tr>
                                    <th className='th col-sm-2' onClick={() => requestSort('years')}>Year</th>
                                    <th className='th col-sm-5' onClick={() => requestSort('name')}>Description</th>
                                    <th className='th col-sm-5' onClick={() => requestSort('organization')}>Organization</th>
                                </tr>
                            </thead>
                            {
                                items.filter(award => award.awardType === 'employment').map((award) => (
                                <AchievementItem key={award._id} award={award} />
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
                        <Achievement />
                    </div>
                ) }
            {
                items.length > 0 ? (
                    <CustomAccordion header='Academic 学业 Akademik' children={
                        <Table responsive striped={true}>
                            <thead bgcolor='grey'>
                                <tr>
                                    <th className='th col-sm-2' onClick={() => requestSort('years')}>Year</th>
                                    <th className='th col-sm-5' onClick={() => requestSort('name')}>Description</th>
                                    <th className='th col-sm-5' onClick={() => requestSort('organization')}>Organization</th>
                                </tr>
                            </thead>
                            {
                                items.filter(award => award.awardType === 'academic').map((award) => (
                                <AchievementItem key={award._id} award={award} />
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
                        <Achievement />
                    </div>
                ) }
            {
                items.length > 0 ? (
                    <CustomAccordion header='Photography 摄影 Fotografi' children={
                        <Table responsive striped={true}>
                            <thead bgcolor='grey'>
                                <tr>
                                    <th className='th col-sm-2' onClick={() => requestSort('years')}>Year</th>
                                    <th className='th col-sm-5' onClick={() => requestSort('name')}>Description</th>
                                    <th className='th col-sm-5' onClick={() => requestSort('organization')}>Organization</th>
                                </tr>
                            </thead>
                            {
                                items.filter(award => award.awardType === 'photography').map((award) => (
                                <AchievementItem key={award._id} award={award} />
                            ))}
                        </Table>
                    } item='accordionItem3'>
                    </CustomAccordion>
                ) : (
                    <div>
                        <h3>
                            You have not enter any data yet.
                            <br />
                            Please add your data here
                        </h3>
                        <Achievement />
                    </div>
                ) }
            {
                items.length > 0 ? (
                    <CustomAccordion header='Marathon 赛跑 Perlumbaan' children={
                        <Table responsive striped={true}>
                            <thead bgcolor='grey'>
                                <tr>
                                    <th className='th col-sm-2' onClick={() => requestSort('years')}>Year</th>
                                    <th className='th col-sm-5' onClick={() => requestSort('name')}>Description</th>
                                    <th className='th col-sm-5' onClick={() => requestSort('organization')}>Organization</th>
                                </tr>
                            </thead>
                            {
                                items.filter(award => award.awardType === 'marathon').map((award) => (
                                <AchievementItem key={award._id} award={award} />
                            ))}
                        </Table>
                    } item='accordionItem4'>
                    </CustomAccordion>
                ) : (
                    <div>
                        <h3>
                            You have not enter any data yet.
                            <br />
                            Please add your data here
                        </h3>
                        <Achievement />
                    </div>
                ) }
        </MainScreen>
    )
}

export default Honorable
