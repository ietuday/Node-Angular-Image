require('dotenv').config();

const users = require('./users');
const contacts = require('./contacts');

const MongoClient = require('mongodb').MongoClient;

const bcrypt = require('bcrypt');


function seedCollection(collectionName, intialRecords) {
  MongoClient.connect(process.env.DB_CONN, (err, db) => {
    console.log('Connected to mongoDb.........');
    const collection = db.collection(collectionName);
    collection.remove();
    intialRecords.forEach((item)=>{
      if(item.password){
        item.password = bcrypt.hashSync(item.password, 10);
      }
    });

    collection.insertMany(intialRecords, (err,result) =>{
      console.log(`${result.insertedCount} record inserted.`);
      console.log(`closing connection.....`);
      db.close();
      console.log('done....');
    });
  });
}

  seedCollection('users',users);
  seedCollection('contacts',contacts);
