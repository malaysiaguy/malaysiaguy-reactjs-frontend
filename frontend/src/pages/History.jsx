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
import Academic from '../components/Academic'
import Knowledge from '../components/Knowledge'
import Coursework from '../components/Coursework'
import { getAcademic, reset } from '../features/academic/academicSlice'
import { getKnowledge } from '../features/knowledge/knowledgeSlice'
import { getCoursework } from '../features/coursework/courseworkSlice'
import { login } from '../features/auth/authSlice'
import useSortableData from '../features/useSortableData'
import { format } from 'date-fns'

function History() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.users)
    const { academics, isLoading: isLoadingAcademic, isError: isErrorAcademic, message: messageAcademic } = useSelector((state) => state.academics)
    const { knowledges, isLoading: isLoadingKnowledge, isError: isErrorKnowledge, message: messageKnowledge } = useSelector((state) => state.knowledges)
    const { courseworks, isLoading: isLoadingCoursework, isError: isErrorCoursework, message: messageCoursework } = useSelector((state) => state.courseworks)
    const { items: academicsitems, requestSort: requestSortAcademic } = useSortableData(academics)
    const { items: knowledgesitems, requestSort: requestSortKnowledge } = useSortableData(knowledges)
    const { items: courseworkitems, requestSort: requestSortCoursework } = useSortableData(courseworks)
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
        console.log('inside useEffect academics')
        if(isErrorAcademic) {
            console.log(messageAcademic);
        }
        if (!user) {
//            navigate('/')
        }

        dispatch(getAcademic())

        return () => {
            dispatch(reset())
        }
    }, [user, isErrorAcademic, messageAcademic, dispatch])

    useEffect(() => {
//        console.log('inside useEffect knowledges')
        if(isErrorKnowledge) {
            console.log(messageKnowledge);
        }
        if (!user) {
//            navigate('/')
        }

        dispatch(getKnowledge())

        return () => {
            dispatch(reset())
        }
    }, [user, isErrorKnowledge, messageKnowledge, dispatch])

    useEffect(() => {
//        console.log('inside useEffect coursework')
        if(isErrorCoursework) {
            console.log(messageCoursework);
        }
        if (!user) {
//            navigate('/')
        }

        dispatch(getCoursework())

        return () => {
            dispatch(reset())
        }
    }, [user, isErrorCoursework, messageCoursework, dispatch])

{/*    if(isLoadingAcademic && isLoadingKnowledge && isLoadingCoursework) {
        return <Spinner />
    }
*/}
    return (
        <MainScreen title1='HISTORY' title2='历史' title3='SEJARAH'>
            {
                courseworkitems ? (
                    <CustomAccordion header='Coursework 课程作业 Kerja Kursus' children={
                            <Table responsive striped>
                                <thead bgcolor='grey'>
                                    <tr>
                                        <th className='th col-sm-3' onClick={() => requestSortCoursework('years')}>Year</th>
                                        <th className='th col-sm-4' onClick={() => requestSortCoursework('name')}>Name</th>
                                        <th className='th col-sm-5' onClick={() => requestSortCoursework('details')}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                 {
                                    courseworkitems.map((course) => (
                                    <tr key={`${course._id}`}>
                                        <td className='td col-sm-3'>{course.years}</td>
                                        <td className='td col-sm-4'>{course.name}</td>
                                        <td className='td col-sm-5'>{course.details}</td>
                                    </tr>
                                ))}
                                </tbody>
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
                        <Coursework />
                    </div>
                ) }
            {
                academicsitems ? (
                    <CustomAccordion header='Education 教育 Pendidikan' children={
                            <Table responsive striped>
                                <thead bgcolor='grey'>
                                    <tr>
                                        <th className='th col-sm-3' onClick={() => requestSortAcademic('years')}>Year</th>
                                        <th className='th col-sm-4' onClick={() => requestSortAcademic('name')}>Institution</th>
                                        <th className='th col-sm-5' onClick={() => requestSortAcademic('qualification')}>Qualification</th>
                                    </tr>
                                </thead>
                                 {
                                    academicsitems.map((academic) => (
                                    <tbody>
                                        <tr key={`${academic._id}`}>
                                            <td className='td col-sm-3'>{format(new Date(academic.years), 'MM/yyyy')}</td>
                                            <td className='td col-sm-4'>{academic.name}</td>
                                            <td className='td col-sm-5'>{academic.qualification}</td>
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
                        <Academic />
                    </div>
                ) }
            {
                knowledgesitems ? (
                    <CustomAccordion header='General Knowledge 普通知识 Pengetahuan Am' children={
                            <Table responsive striped>
                                <thead bgcolor='grey'>
                                    <tr>
                                        <th className='th col-sm-3' onClick={() => requestSortKnowledge('knowledge')}>Knowledge</th>
                                        <th className='th col-sm-4' onClick={() => requestSortKnowledge('level')}>Proficiency</th>
                                        <th className='th col-sm-5' onClick={() => requestSortKnowledge('knowledgeType')}>Type of Knowledge</th>
                                    </tr>
                                </thead>
                                 {
                                    knowledgesitems.map((skill) => (
                                    <tbody>
                                        <tr key={`${skill._id}`}>
                                            <td className='td col-sm-3'>{skill.knowledge}</td>
                                            <td className='td col-sm-4'>{skill.level}</td>
                                            <td className='td col-sm-5'>{skill.knowledgeType}</td>
                                        </tr>
                                    </tbody>
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
                        <Knowledge />
                    </div>
                ) }
        </MainScreen>
    )
}

export default History
