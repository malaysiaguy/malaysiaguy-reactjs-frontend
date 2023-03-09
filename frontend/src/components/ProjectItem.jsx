import { useDispatch } from 'react-redux'
import { deleteProject } from '../features/project/projectSlice'
import {
    Table,
    Button
} from 'reactstrap'

function ProjectItem({item}) {
//    console.log('projectItem - ' + item.projectItem)
//    console.log('item id - ' + item._id)
    const dispatch = useDispatch()

    return (
            <tr key={item._id}>
                <td className='td col-sm-1'>{item.projectItem}</td>
                <td className='td col-sm-2'>{item.projectRole}</td>
                <td className='td col-sm-3'>{item.projectName}</td>
                <td className='td col-sm-4'>
                    <textarea className='textarea' rows='10' cols='50' value={`${item.projectDetails}`} readOnly={true}></textarea>
                </td>
                <td className='td col-sm-2'>{item.projectDuration}</td>
            </tr>
    )
}

export default ProjectItem