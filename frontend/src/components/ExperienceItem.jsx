import { useDispatch } from 'react-redux'
import { deleteExperienceSummary } from '../features/experienceSummary/experienceSummarySlice'
import { format } from 'date-fns'
import {
    Table,
    Button
} from 'reactstrap'

function ExperienceItem({summary}) {
    const dispatch = useDispatch()

    return (
        <tbody>
            <tr key={summary._id}>
                <td className='td col-sm-9'>{summary.experience}</td>
                <td className='col-sm-3'>{summary.years}</td>
            </tr>
        </tbody>
    )
}

export default ExperienceItem