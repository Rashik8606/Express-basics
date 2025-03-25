const {MongoClient} = require('mongodb')

const state = {
    db : null
}

module.exports.connect = (done)=>{
    const url = "mongodb://127.0.0.1:27017"
    const dbname = 'UserDetails'

    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true},(error,client)=>{
        if (error) {
            console.log('Connection Error'+ error)
            return done(error)
        }

        state.db = client.db(dbname)
        console.log('Conneted the database')
        done()
    })

   
}


module.exports.get = ()=>{
    if (!state.db){
        console.log(' Database is not initialized! Call db.connect() first.')
        return null
    }
    return state.db
}