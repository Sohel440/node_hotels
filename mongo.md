# **MongoDB Cheat Sheet with Examples**

----------

## **1. Database Operations**

### Show Databases



**Example**:

`
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB 
`

### Switch/Create Database



`use <database_name>
`

**Example**:


> use mydb
switched to db mydb

### Delete Database


db.dropDatabase()

**Example**:

bash

Copy

> use mydb
> db.dropDatabase()
{ "dropped" : "mydb", "ok" : 1 }

----------

## **2. Collection Operations**

### Show Collections



`show collections`

**Example**:


> show collections
users
posts

### Create Collection


> db.createCollection("<collection_name>")

**Example**:

bash

Copy

> db.createCollection("users")
{ "ok" : 1 }

### Delete Collection

bash

Copy

db.<collection_name>.drop()

**Example**:



> db.users.drop()
true

----------

## **3. CRUD Operations**

### Insert Documents

#### Insert One



` db.<collection_name>.insertOne({ key: "value" })`

**Example**:



> db.users.insertOne({ name: "John", age: 25 })
{
  "acknowledged" : true,
  "insertedId" : ObjectId("615f1b2e8f1b2e8f1b2e8f1b")
}

#### Insert Many



> db.<collection_name>.insertMany([{ key1: "value1" }, { key2: "value2" }])

**Example**:

bash

Copy

> db.users.insertMany([{ name: "Alice", age: 30 }, { name: "Bob", age: 22 }])
{
  "acknowledged" : true,
  "insertedIds" : [
    ObjectId("615f1b2e8f1b2e8f1b2e8f1c"),
    ObjectId("615f1b2e8f1b2e8f1b2e8f1d")
  ]
}

### Query Documents

#### Find All

>db.<collection_name>.find()

**Example**:



> db.users.find()
{ "_id" : ObjectId("615f1b2e8f1b2e8f1b2e8f1b"), "name" : "John", "age" : 25 }
{ "_id" : ObjectId("615f1b2e8f1b2e8f1b2e8f1c"), "name" : "Alice", "age" : 30 }
{ "_id" : ObjectId("615f1b2e8f1b2e8f1b2e8f1d"), "name" : "Bob", "age" : 22 }

#### Find with Filter



> db.<collection_name>.find({ key: "value" })

**Example**:



> db.users.find({ name: "John" })
{ "_id" : ObjectId("615f1b2e8f1b2e8f1b2e8f1b"), "name" : "John", "age" : 25 }

#### Projection (Select Specific Fields)


> db.<collection_name>.find({}, { field1: 1, field2: 1 })

**Example**:



> db.users.find({}, { name: 1 })
{ "_id" : ObjectId("615f1b2e8f1b2e8f1b2e8f1b"), "name" : "John" }
{ "_id" : ObjectId("615f1b2e8f1b2e8f1b2e8f1c"), "name" : "Alice" }
{ "_id" : ObjectId("615f1b2e8f1b2e8f1b2e8f1d"), "name" : "Bob" }

### Update Documents

#### Update One



> db.<collection_name>.updateOne({ filter }, { $set: { key: "new_value" } })

**Example**:



> db.users.updateOne({ name: "John" }, { $set: { age: 26 } })
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

#### Update Many


> db.<collection_name>.updateMany({ filter }, { $set: { key: "new_value" } })

**Example**:



> db.users.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } })
{ "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }

### Delete Documents

#### Delete One



> db.<collection_name>.deleteOne({ filter })

**Example**:


> db.users.deleteOne({ name: "John" })
{ "acknowledged" : true, "deletedCount" : 1 }

#### Delete Many



> db.<collection_name>.deleteMany({ filter })

**Example**:



> db.users.deleteMany({ age: { $lt: 30 } })
{ "acknowledged" : true, "deletedCount" : 2 }

----------

## **4. Aggregation**

### Aggregation Pipeline



> db.<collection_name>.aggregate([
  { $match: { status: "A" } },
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
])

**Example**:



> db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customer_id", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
])

----------

## **5. Indexing**

### Create Index



> db.<collection_name>.createIndex({ field: 1 })  # 1 for ascending, -1 for descending

**Example**:



> db.users.createIndex({ name: 1 })
{
  "createdCollectionAutomatically" : false,
  "numIndexesBefore" : 1,
  "numIndexesAfter" : 2,
  "ok" : 1
}

----------

## **6. Transactions**

### Start a Session



>const session = db.getMongo().startSession()

### Use Transaction



>session.startTransaction()
try {
  const collection = session.getDatabase("<db_name>").<collection_name>
  collection.insertOne({ key: "value" })
  session.commitTransaction()
} catch (error) {
  session.abortTransaction()
} finally {
  session.endSession()
}

----------

## **7. Performance Tips**

-   Use indexes for frequently queried fields.
    
-   Use projections to retrieve only necessary fields.
    
-   Avoid large documents; split data into smaller collections if needed.
    
-   Use  `explain()`  to analyze query performance:
    
    
    
    > db.<collection_name>.find({ key: "value" }).explain("executionStats")
    

----------

## **8. Useful Commands**

### Count Documents



> db.<collection_name>.countDocuments({ filter })

**Example**:

bash

Copy

> db.users.countDocuments({ age: { $gt: 25 } })
2

### Distinct Values



> db.<collection_name>.distinct("field_name")

**Example**:



> db.users.distinct("age")
[ 22, 25, 30 ]