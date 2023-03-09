const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://user:user@cluster0.j9lwc.mongodb.net/mernapp?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
//            useCreateIndex: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(1)
    }
}

module.exports = connectDB