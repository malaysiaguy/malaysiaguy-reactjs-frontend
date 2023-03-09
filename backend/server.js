const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(
    cors({
        origin: ["http://localhost:3000", "https://malaysiaguy-api.onrender.com"],
    })
)

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/experienceSummary', require('./routes/experienceSummaryRoutes'))
app.use('/api/skillSummary', require('./routes/skillSummaryRoutes'))
app.use('/api/academic', require('./routes/academicRoutes'))
app.use('/api/knowledge', require('./routes/knowledgeRoutes'))
app.use('/api/coursework', require('./routes/courseworkRoutes'))
app.use('/api/achievement', require('./routes/achievementRoutes'))
app.use('/api/work', require('./routes/workRoutes'))
app.use('/api/project', require('./routes/projectRoutes'))
app.use('/api/activity', require('./routes/activityRoutes'))

//Server frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    )
} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () =>
    console.log(`Server started on port ${port}`)
)