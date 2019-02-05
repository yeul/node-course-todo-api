// const MongoClient = require('mongodb').MongoClient;
// below using object restructuring to pull off more properties off the mongodb objet
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')


    // db.collection('Todos').insertOne({
    //     text: 'Finish Udemy Node.js course.',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Todos', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Julia',
        age: 25,
        location: 'USA'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert Users', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});

