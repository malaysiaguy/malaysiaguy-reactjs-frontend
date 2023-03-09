import { useDispatch } from 'react-redux'
import { deleteSkillSummary } from '../features/skillSummary/skillSummarySlice'
import { format } from 'date-fns'
import {
    Table,
    Button
} from 'reactstrap'

function SkillItem({summary}) {
    const dispatch = useDispatch()

    return (
        <tbody>
            <tr key={summary._id}>
                <td className='td col-sm-9'>{summary.skill}</td>
                <td className='col-sm-3'>{summary.years}</td>
            </tr>
        </tbody>
    )
}

export default SkillItem