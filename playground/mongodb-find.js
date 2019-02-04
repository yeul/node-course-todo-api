// const MongoClient = require('mongodb').MongoClient;
// below using object restructuring to pull off more properties off the mongodb objet
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')

    // db.collection('Todos').find({ _id: new ObjectID('5c574ac93d60de3f7499b0ed') }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }), (err) => {
    //     console.log('Unable to fetch Todos.', err)
    // };

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }), (err) => {
    //     console.log('Unable to fetch Todos.', err)
    // };

    db.collection('Users').find({ name: 'Julia' }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));

    }), (err) => {
        console.log('Unable to fetch Users.', err);
    };

    // client.close();
});

