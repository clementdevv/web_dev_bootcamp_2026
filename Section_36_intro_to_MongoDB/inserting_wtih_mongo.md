
# Inserting with MongoDB

MongoDB stores data in **documents**, and documents live inside **collections**.
A collection is similar to a table in SQL, but it does not require a fixed schema.

## 1. Switch to a database
Mongo creates the database automatically when data is inserted.

use animalShelter

## 2. Confirm the current database
db

It should display:
animalShelter

## 3. Insert a document into a collection
If the collection does not exist, MongoDB creates it automatically.

db.dogs.insertOne({name: "Charlie", age: 3, breed: "corgi", catFriendly: true})

## 4. Check available collections
show collections

Expected output:
dogs

## 5. View documents inside the collection
db.dogs.find()

## 6. Insert multiple documents
db.dogs.insert([
{name: "Wyatt", age: 14, breed: "Golden", catFriendly: false},
{name: "Tonya", age: 17, breed: "Chihuahua", catFriendly: true}
])

## 7. Create and insert into another collection
db.cats.insert({name: "Blue", age: 2, breed: "Russian Blue"})
db.cats.insert({name: "Milo", age: 5, breed: "Tabby"})

## 8. View cat documents
db.cats.find()

MongoDB will automatically create the **cats** collection when the first document is inserted.
