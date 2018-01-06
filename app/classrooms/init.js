const classroomsDao = require('./classrooms-dao.js')


function initClassrooms(app){

  //READ ALL CLASSROOMS
  app.get('/classrooms' , (req, res, next) => {
    classroomsDao.getClassrooms((docs) => {
      res.send(docs)
    })
  })

//READ cassroom by REF
    app.get('/classrooms/:ref', (req, res, next) => {
      const ref = req.params.ref
      classroomsDao.getClassroomByRef(ref)
        .then((classrooms) => {
          console.log( 'trying to read the classroom',classrooms)
          res.send( classrooms)
        })
        .catch((err) => {
          next(err)
        })
    })

//  ADD a classroom
    app.post('/classrooms', (req, res, next) => {
      const addedclassroom = req.body
      classroomsDao.addClassroom(addedclassroom)
        .then((result) => {
            console.log( result)
          res.send('classrooom added')
        })
        .catch((err) => {
          next(err)
        })
    })

// UPDATE a classroom
  app.put('/classrooms/:ref' , (req, res ,next)=>{
    const ref= req.params.ref
    const newvalues=req.body
    classroomsDao.updateClassroom(ref, newvalues)
    .then((result)=>{
      console.log('**********************')
      res.send(result)
    })
    .catch((err)=>{
      next(err)
    })
  })



//DELETE classroom by REF
    app.delete('/classrooms/:ref' , (req, res, next)=>{
      const ref= req.params.ref
      classroomsDao.removeClassroomByRef(ref)
      .then((result)=>{
        console.log('************************',result,'************')
        res.send('classroom removed')
      })
      .catch((err)=>{
        next(err)
      })
    })

//DELETE all classroom
  app.delete('/classrooms' , (req, res, next)=>{
    classroomsDao.removeClassroom((result)=>{
      res.send('ALL classroomS removed')
    })
  })

}

module.exports = initClassrooms
