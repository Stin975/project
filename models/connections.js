const { DateTime } = require("luxon");
//const {v4: uuidv4} = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    topic: {type: String, required: [true, 'topic is required']},
    content: {type: String, required: [true, 'content is required'],  minLength: [10, 'the content should have at least 10 characters']},
    address: {type: String, required: [true, 'address is required']},
    date: {type: String, required: [true, 'Date is required']},
    startTimeM: {type: String, required: [true, 'start Time is required']},
    startTime: {type: String, required: [true, 'start Time is not set']},
    endTimeM: {type: String, required: [true, 'end Time is required']},
    endTime: {type: String, required: [true, 'end Time is not set']},
    host: {type: String, required: [true, 'host is required']},
    image: {type: String, required: [true, 'image Url is required']},

}
);
//collection name is stories in the database
module.exports = mongoose.model('games', gamesSchema);



/*exports.find = () => connections;

exports.findById = id => connections.find(connections=>connections.id === id);

exports.save = function(connection){
    connection.id = uuidv4();
    
    let time = connection.startTimeM.split(':');
    connection.startTime =DateTime.local(1972, 1, 1, parseInt(time[0]), parseInt(time[1])).toLocaleString(DateTime.TIME_SIMPLE);
    time = connection.endTimeM.split(':');
    connection.endTime =DateTime.local(1972, 1, 1, parseInt(time[0]), parseInt(time[1])).toLocaleString(DateTime.TIME_SIMPLE);

    connections.push(connection);
}

exports.updateById = function(id, newConnection) {
    let connection = connections.find(connections=>connections.id === id);
    if(connection){
        connection.title = newConnection.title;
        connection.topic = newConnection.topic;
        connection.host = newConnection.host;
        connection.content = newConnection.content
        connection.address = newConnection.address;
        connection.date = newConnection.date;
        connection.startTimeM = newConnection.startTimeM;
        connection.endTimeM = newConnection.endTimeM;
        connection.image = newConnection.image;


        let time = connection.startTimeM.split(':');
        connection.startTime =DateTime.local(1972, 1, 1, parseInt(time[0]), parseInt(time[1])).toLocaleString(DateTime.TIME_SIMPLE);
        time = connection.endTimeM.split(':');
        connection.endTime =DateTime.local(1972, 1, 1, parseInt(time[0]), parseInt(time[1])).toLocaleString(DateTime.TIME_SIMPLE);

        return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = connections.findIndex(connections=>connections.id === id);
    if (index !== 1) {
        connections.splice(index,1);
        return true;
    } else {
        return false;
    }
}
*/
