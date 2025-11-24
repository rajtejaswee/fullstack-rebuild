const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
})

const TodoSchema = new Schema({
    userId: {
        type:Schema.Types.ObjectId, ref:'users'
    },
    title: String,
    done: Boolean
})

const UserModel = mongoose.model('users', UserSchema);
const TodoModel = mongoose.model('todos', TodoSchema);

module.exports = {
    UserModel,
    TodoModel
}