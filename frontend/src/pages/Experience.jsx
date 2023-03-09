import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBriefcase, FaCaretRight } from 'react-icons/fa'
import { format } from 'date-fns'
import 'bootstrap/dist/css/bootstrap.css'
import {
    Table,
    Button
} from 'reactstrap'
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa'
import Spinner from '../components/Spinner'
import MainScreen from '../components/MainScreen'
import CustomAccordion from '../components/CustomAccordion'
import Work from '../components/Work'
import Project from '../components/Project'
import ProjectItem from '../components/ProjectItem'
import { getWorks, reset } from '../features/work/workSlice'
import { getProject } from '../features/project/projectSlice'
import { login } from '../features/auth/authSlice'
import useSortableData from '../features/useSortableData'

function Experience() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.users)
    const { works, isLoading: isLoadingWork, isError: isErrorWork, message: messageWork } = useSelector((state) =>  state.works)
    const { projects, isLoading: isLoadingProject, isError: isErrorProject, message: messageProject } = useSelector((state) =>  state.projects)
    const { items, requestSort } = useSortableData(projects)
    const [ state, setState ] = useState(user)

    let isVisible = false

    useEffect(() => {
        const userData = {
            email: 'malaysiaguy@aliyun.com',
            password: '123456'
        }
        setState(userData)

        dispatch(login(userData))
    }, [dispatch])

    console.log('user - ' + user)
    console.log('project - ' + projects)
    useEffect(() => {
        if(isErrorProject) {
            console.log(messageProject)
        }
        if (!user) {
//            navigate('/')
        }

        console.log('experience b4 dispatch')
        dispatch(getProject())

        return () => {
            dispatch(reset())
        }
    }, [user, isErrorWork, messageWork, dispatch])

    useEffect(() => {
        if(isErrorWork) {
            console.log(messageWork)
        }
        if (!user) {
//            navigate('/')
        }

        console.log('experience b4 dispatch')
        dispatch(getWorks())

        return () => {
            dispatch(reset())
        }
    }, [user, isErrorProject, messageProject, dispatch])

{/*    console.log('isLoadingProject -' + isLoadingProject)
    console.log('isLoadingWork -' + isLoadingWork)
    if(isLoadingWork && isLoadingProject) {
        return <Spinner />
    }
*/}
    return (
        <MainScreen title1='EXPERIENCE' title2='经验' title3='PENGALAMAN'>
            {
                works ? (
                    <CustomAccordion header='IT Industry 资讯科技 Bidang IT'
                        children={
                           works.filter((work) => work.industryType === 'IT' && work.workType !== 'Internship').map((work, key) => (
                            <Table responsive striped key={key}>
                                <thead bgcolor='#D3D3D3'>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Company:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.company}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Location:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.location}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Period:</th>
                                        <td className='td td-sm-10' colSpan='4'>{format(new Date(work.fromDate), 'MM/yyyy')}-{format(new Date(work.toDate), 'MM/yyyy')}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Position:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.position}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Reason of Leaving:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.reasonLeaving}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Task Assigned:</th>
                                        <td className='td-right td-sm-10' colSpan='4'>
                                        {   isVisible && (
                                            <div>
                                            <Button className='btn btn-info px-3' size='xs' type='button'>
                                                <Project key={work._id} work={work} size='xs' text='dark' /></Button>
                                            <span className='px-1'><Button className='btn btn-warning px-3' size='xs' type='button'>
                                                <FaEdit /> Edit</Button></span>
                                            <span className='px-1'><Button className='btn btn-danger px-3' size='xs' type='button'>
                                                <FaTrashAlt /> Delete</Button></span>
                                            </div>
                                        )}
                                        </td>
                                    </tr>
                                </thead>
                                <thead bgcolor='grey' key={work._id}>
                                    <tr>
                                        <th className='th th-sm-1' onClick={() => requestSort('projectItem')}>Item</th>
                                        <th className='th th-sm-2' onClick={() => requestSort('projectRole')}>Role</th>
                                        <th className='th th-sm-3' onClick={() => requestSort('projectName')}>Name</th>
                                        <th className='th th-sm-4' onClick={() => requestSort('projectDetails')}>Description</th>
                                        <th className='th th-sm-2' onClick={() => requestSort('projectDuration')}>Duration</th>
                                    </tr>
                                </thead>
                                {
                                    items ? (
                                        items.filter(item => item.company === work._id).map((item) => (
                                        <tbody key={item._id}>
                                            <ProjectItem item={item} />
                                        </tbody>
                                    ))
                                    ) : (
                                        <div>
                                            <h3>
                                                You have not enter any data yet.
                                                <br />
                                                Please add your data here
                                            </h3>
                                            <Project />
                                        </div>
                                    )
                                }
                            </Table>
                            ))
                        } item='accordionItem1'>
                    </CustomAccordion>
                ) : (
                <div>
                    <h3>
                        You have not enter any data yet.
                        <br />
                        Please add your data here
                    </h3>
                    <FaBriefcase /><Work />
                </div>
                )
            }
            {
                works ? (
                    <CustomAccordion header='Non IT Industry 非资讯科技 Bukan Bidang IT'
                        children={
                            works.filter((work) => work.industryType !== 'IT').map((work, key) => (
                            <Table responsive striped key={key}>
                                <thead bgcolor='#D3D3D3'>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Company:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.company}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Location:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.location}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Period:</th>
                                        <td className='td td-sm-10' colSpan='4'>{format(new Date(work.fromDate), 'MM/yyyy')}-{format(new Date(work.toDate), 'MM/yyyy')}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Position:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.position}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Reason of Leaving:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.reasonLeaving}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Task Assigned:</th>
                                        <td className='td-right td-sm-10' colSpan='4'>
                                        {   isVisible && (
                                            <div>
                                            <Button className='btn btn-info px-3' size='xs' type='button'>
                                                <Project key={work._id} work={work} size='xs' text='dark' /></Button>
                                            <span className='px-1'><Button className='btn btn-warning px-3' size='xs' type='button'>
                                                <FaEdit /> Edit</Button></span>
                                            <span className='px-1'><Button className='btn btn-danger px-3' size='xs' type='button'>
                                                <FaTrashAlt /> Delete</Button></span>
                                            </div>
                                        )}
                                        </td>
                                    </tr>
                                </thead>
                                <thead bgcolor='grey' key={work._id}>
                                    <tr>
                                        <th className='th th-sm-1' onClick={() => requestSort('projectItem')}>Item</th>
                                        <th className='th th-sm-2' onClick={() => requestSort('projectRole')}>Role</th>
                                        <th className='th th-sm-3' onClick={() => requestSort('projectName')}>Name</th>
                                        <th className='th th-sm-4' onClick={() => requestSort('projectDetails')}>Description</th>
                                        <th className='th th-sm-2' onClick={() => requestSort('projectDuration')}>Duration</th>
                                    </tr>
                                </thead>
                                {
                                    items ? (
                                        items.filter(item => item.company === work._id).map((item) => (
                                        <tbody key={item._id}>
                                            <ProjectItem item={item} />
                                        </tbody>
                                    ))
                                    ) : (
                                        <div>
                                            <h3>
                                                You have not enter any data yet.
                                                <br />
                                                Please add your data here
                                            </h3>
                                            <Project />
                                        </div>
                                    )
                                }
                            </Table>
                        ))
                    } item='accordionItem2'>
                    </CustomAccordion>
                ) : (
                <div>
                    <h3>
                        You have not enter any data yet.
                        <br />
                        Please add your data here
                    </h3>
                    <FaBriefcase /><Work />
                </div>
                )
            }
            {
                works ? (
                    <CustomAccordion header='Internship 实习 Latihan Amali'
                        children={
                            works.filter((work) => work.industryType === 'IT' && work.workType === 'Internship').map((work, key) => (
                            <Table responsive striped key={key}>
                                <thead bgcolor='#D3D3D3'>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Company:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.company}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Location:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.location}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Period:</th>
                                        <td className='td td-sm-10' colSpan='4'>{format(new Date(work.fromDate), 'MM/yyyy')}-{format(new Date(work.toDate), 'MM/yyyy')}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Position:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.position}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Reason of Leaving:</th>
                                        <td className='td td-sm-10' colSpan='4'>{work.reasonLeaving}</td>
                                    </tr>
                                    <tr>
                                        <th className='th th-sm-2 px-3 h6'>Task Assigned:</th>
                                        <td className='td-right td-sm-10' colSpan='4'>
                                        {   isVisible && (
                                            <div>
                                            <Button className='btn btn-info px-3' size='xs' type='button'>
                                                <Project key={work._id} work={work} size='xs' text='dark' /></Button>
                                            <span className='px-1'><Button className='btn btn-warning px-3' size='xs' type='button'>
                                                <FaEdit /> Edit</Button></span>
                                            <span className='px-1'><Button className='btn btn-danger px-3' size='xs' type='button'>
                                                <FaTrashAlt /> Delete</Button></span>
                                            </div>
                                        )}
                                        </td>
                                    </tr>
                                </thead>
                                <thead bgcolor='grey' key={work._id}>
                                    <tr>
                                        <th className='th th-sm-1' onClick={() => requestSort('projectItem')}>Item</th>
                                        <th className='th th-sm-2' onClick={() => requestSort('projectRole')}>Role</th>
                                        <th className='th th-sm-3' onClick={() => requestSort('projectName')}>Name</th>
                                        <th className='th th-sm-4' onClick={() => requestSort('projectDetails')}>Description</th>
                                        <th className='th th-sm-2' onClick={() => requestSort('projectDuration')}>Duration</th>
                                    </tr>
                                </thead>
                                {
                                    items ? (
                                        items.filter(item => item.company === work._id).map((item) => (
                                        <tbody key={item._id}>
                                            <ProjectItem item={item} />
                                        </tbody>
                                    ))
                                    ) : (
                                        <div>
                                            <h3>
                                                You have not enter any data yet.
                                                <br />
                                                Please add your data here
                                            </h3>
                                            <Project />
                                        </div>
                                    )
                                }
                            </Table>
                        ))
                    } item='accordionItem3'>
                    </CustomAccordion>
                ) : (
                <div>
                    <h3>
                        You have not enter any data yet.
                        <br />
                        Please add your data here
                    </h3>
                    <FaBriefcase /><Work />
                </div>
                )
            }
        </MainScreen>
    )
}

export default Experience
