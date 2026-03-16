
# Updating with MongoDB

Updates modify existing documents.

MongoDB mainly uses:
updateOne()
updateMany()

## 1. Switch to the correct database

use animalShelter

## 2. Update one document

db.dogs.updateOne(
{ name: "Charlie" },
{ $set: { age: 4 } }
)

Explanation:
First object → document to find  
Second object → update operation  

$set changes the value of a field.

## 3. Update multiple documents

db.dogs.updateMany(
{ breed: "Golden" },
{ $set: { catFriendly: true } }
)

This updates every Golden dog.

## 4. Add a new field

db.dogs.updateOne(
{ name: "Wyatt" },
{ $set: { vaccinated: true } }
)

MongoDB allows adding fields dynamically.

## 5. Verify updates

db.dogs.find()

Updating data represents the **Update operation** in CRUD.
