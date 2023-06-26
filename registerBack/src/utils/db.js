const mongoose = require('mongoose')
const uri = process.env.CONNECT



  const run = async () => {

    try  {
        const db = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Connected successfully to database");
    }
    catch (e) {
      console.error(e)
    }
  }

  module.exports = { run }