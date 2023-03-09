import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import activityReducer from '../features/activity/activitySlice'
import experienceSummaryReducer from '../features/experienceSummary/experienceSummarySlice'
import skillSummaryReducer from '../features/skillSummary/skillSummarySlice'
import academicReducer from '../features/academic/academicSlice'
import achievementReducer from '../features/achievement/achievementSlice'
import courseworkReducer from '../features/coursework/courseworkSlice'
import knowledgeReducer from '../features/knowledge/knowledgeSlice'
import projectReducer from '../features/project/projectSlice'
import workReducer from '../features/work/workSlice'

export const store = configureStore({
  reducer: {
    users: authReducer,
    activities: activityReducer,
    experienceSummaries: experienceSummaryReducer,
    skillSummaries: skillSummaryReducer,
    academics: academicReducer,
    achievements: achievementReducer,
    courseworks: courseworkReducer,
    knowledges: knowledgeReducer,
    projects: projectReducer,
    works: workReducer,
  },
})
