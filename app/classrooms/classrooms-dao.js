const dbConnect = require('../db-helper')

//Display all classrooms
const getClassrooms = (cb)=>{

    dbConnect().then((db)=>{
     let query= {ref:1 , language:1 , description:1}

      db.collection('classrooms').find({}).project(query).toArray(function(err,docs){
        if (err) return process.exit(1)
        console.log(docs)
          cb(docs)
        })
    })
    .catch((err)=>{
      reject(err)
    })
  }


  const getClassroomByRef = (ref) => {
    return new Promise((fulfill, reject) => {
      dbConnect().then((db) => {
        const query ={ref:1 , language:1 , name:1 , description:1}
        db.collection('classrooms')
          .findOne({ref})
        //  .project({ref:1 , language:1 , name:1 , description:1})
          .then((classrooms) => {

            fulfill(classrooms)
          })
          .catch((err) => {
            reject(err)
          })
      })
      .catch((err) => {
        reject(err)
      })
    })
  }


    const addClassroom = (addedclassroom) => {
      return new Promise((fulfill, reject) => {
        dbConnect().then((db) => {
          db.collection('classrooms')
            .insertOne(addedclassroom)
            .then((result) => {
              fulfill(result)
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch((err) => {
          reject(err)
        })
      })
    }

  const removeClassroomByRef = (ref)=>{
    return new Promise((fulfill,reject)=>{
      dbConnect().then((db)=>{
        db.collection('classrooms').deleteOne({ref}).then((result)=>{
            fulfill(result)
        })
        .catch((err)=>{
          reject(err)
        })
      })
      .catch((err)=>{
        reject(err)
      })
    })

  }

 const updateClassroom =(ref,newvalues)=>{
   return new Promise ((fulfill, reject)=>{
  //  var newvalues = { name: "Introduction to JavaScript BABY STEPS", language: "JavaScript & ES6" }
     dbConnect().then((db)=>{
       db.collection('classrooms').insert({ref},newvalues).then((result)=>{
         fulfill(result)
       })
       .catch((err)=>{
         reject(err)
       })
     })
     .catch((err)=>{
       reject(err)
     })
   })

 }


const removeClassroom = (cb,result)=>{
      dbConnect().then((db)=>{
        db.collection('classrooms').deleteOne().then((result)=>{
          console.log('the collection classrooms deleted')
          cb(result)
        })
      })
      .catch((err)=>{
        reject(err)
      })
    }

//CRUD FOR ASSIGNMENT



  module.exports = {
    getClassrooms,
    getClassroomByRef,
    addClassroom,
    removeClassroomByRef,
    updateClassroom,
    removeClassroom

  }
