// const MongoClient = require('mongodb').MongoClient;
// below using object restructuring to pull off more properties off the mongodb objet
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server.')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')


    // deletemany
    // db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((result) => {
    //     console.log(result);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({ completed: true }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({ name: 'Inquisitor' }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({ _id: new ObjectID('5c59b49dc816b026138e3a0a') }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
    // client.close();
});

