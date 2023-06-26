const {server,router} = require('./src/utils/server')
const {run,client} = require('./src/utils/db')

run()

router.get('/', (req, res) => {
    res.status(200).json({message: 'test'})

})