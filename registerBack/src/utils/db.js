const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = process.env.CONNECT

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  const run = async () => {

    try  {
        await client.connect();
        await client.db("admin").command({ ping: 1 })
        console.log("Connected successfully to database");
    }
    catch (e) {
    }
  }

  module.exports = { run, client }