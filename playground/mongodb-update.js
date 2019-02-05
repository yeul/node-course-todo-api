// const MongoClient = require('mongodb').MongoClient;
// below using object restructuring to pull off more properties off the mongodb objet
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5c577fb1c816b026138de45b')
    // }, {
    //         $set: { completed: true }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(result)
    //     });

    db.collection('Users').findOneAndUpdate({
        id_: new ObjectID('5c57788d1898da40e0ce0819')
    }, {
            $set: {
                name: 'Julia'
            },
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(JSON.stringify(result, undefined, 2));
        });

    // client.close();
});

