const mongoose = require('mongoose')
const uri = process.env.CONNECT



  const run = async () => {

    try  {
        const db = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Connected successfully to database");
        return db
    }
    catch (e) {
      console.error(e)
    }
  }


  const db = run()
  module.exports = { db }