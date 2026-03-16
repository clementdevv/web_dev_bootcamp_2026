

# Deleting with MongoDB

Deleting removes documents from collections.

MongoDB mainly uses:
deleteOne()
deleteMany()

## 1. Ensure correct database

use animalShelter

## 2. Delete a single document

db.dogs.deleteOne({name: "Tonya"})

MongoDB removes the first document that matches.

## 3. Delete multiple documents

db.dogs.deleteMany({age: {$gt: 12}})

This removes all dogs older than 12.

## 4. Delete all documents in a collection

db.cats.deleteMany({})

The empty object {} means **match everything**.

## 5. Verify deletion

db.dogs.find()
db.cats.find()

Deleting data represents the **Delete operation** in CRUD.
