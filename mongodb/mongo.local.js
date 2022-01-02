var MongoClient = require('mongodb').MongoClient;
var opt = {
    database: 'jev',
    collection: 'Jaen_local'
}
// Connect to the db
MongoClient.connect(`mongodb://127.0.0.1:27017`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, async (err, client) => {
    console.log(`MongoDB Connected`);
    if (err) {
        return console.log(err);
    }

    // Specify database you want to access
    const db = client.db(opt.database);
    await db.collection(opt.collection).find().toArray((err, results) => {
        if(err) throw err
        console.log(results);
    });
    client.close()
});