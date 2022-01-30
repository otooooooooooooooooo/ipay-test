const {parse} = require("nodemon/lib/cli");

const existsById = (id, repository) => repository.some(entry => parseInt(id) === parseInt(entry.id))

const findById = (id, repository) => repository.find(entry => parseInt(id) === parseInt(entry.id))

const register = (data, repository) => {
    const newId =  Math.max(...repository.map(obj => parseInt(obj['id']))) + 1
    data['id'] = newId
    repository.push(data)
    return newId
}

module.exports = {existsById, findById, register}