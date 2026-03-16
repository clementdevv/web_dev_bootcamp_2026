# Finding with MongoDB

MongoDB retrieves data using the **find()** method.

## 1. Ensure you are in the correct database

use animalShelter

## 2. View all documents in a collection

db.dogs.find()

This returns every document inside the dogs collection.

## 3. Find documents matching a condition

db.dogs.find({breed: "corgi"})

MongoDB searches for documents where breed equals "corgi".

## 4. Find documents using numeric conditions

db.dogs.find({age: {$gt: 5}})

$gt means **greater than**.

Other useful operators:
$lt → less than  
$gte → greater than or equal  
$lte → less than or equal  

Example:

db.dogs.find({age: {$lt: 10}})

## 5. Pretty display (easier to read)

db.dogs.find().pretty()

## 6. Find cat documents

db.cats.find()

Finding data is the **read operation** in CRUD.
