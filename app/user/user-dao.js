const dbConnect = require('../db-helper')

const findUserByEmail = (email) => {
  return new Promise((fulfill, reject) => {
    dbConnect().then((db) => {
      db.collection('users')
        .findOne({email})
        .then((user) => {
          fulfill(user)
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


const findUserByName = (firstName) => {
  return new Promise((fulfill, reject) => {
    dbConnect().then((db) => {
      db.collection('users')
        .findOne({firstName})
        .project({ref:1 , language:1 , name:1 , description:1})
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



module.exports = {
  findUserByEmail,
  findUserByName
}
