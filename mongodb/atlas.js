const { MongoClient } = require("mongodb");
 
// Connect to MongoDB Atlas                                                                                                                                        
const url = `mongodb+srv://fanh:1909@cluster0.flrah.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
        console.log("Connected success");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);