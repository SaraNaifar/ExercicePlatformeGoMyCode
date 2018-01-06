
const express = require('express')
const assert = require('assert')
const mongoDriver = require('mongodb').MongoClient
const DB_URL = 'mongodb://localhost:27017'
const DB_NAME = 'gmc-exercise-plateform'

let app = express()
mongoDriver.connect(DB_URL, function(err, dbHandler ){
  const db = dbHandler.db(DB_NAME )
  const Classrooms = db.collection('classrooms')
  assert.equal(null, err)
  app.get('/classrooms' , (req,res)=>{
    let query= {ref:1 , language:1 , description:1}
    Classrooms.find({}).project(query).toArray(function(err,docs){
      if (err) return process.exit(1)
      //console.log(docs)
      res.send(docs)
  })


})
app.listen(8000 , ()=>{console.log('listen at 8000')})
})
