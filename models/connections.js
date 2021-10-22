const { DateTime } = require("luxon");
const {v4: uuidv4} = require('uuid');
const connections = [
    {
        id: '1',
        title: 'Super Mario Bros 3',
        topic: 'Retro Games',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque neque dolor, accumsan a sagittis quis, euismod non neque. ',
        address: '123 Fake street',
        date: '2021-01-01',
        startTimeM: '09:00',
        startTime: DateTime.local(1972, 1, 1, 9, 0).toLocaleString(DateTime.TIME_SIMPLE),
        endTimeM: '11:00',
        endTime: DateTime.local(1972, 1, 1, 11, 0).toLocaleString(DateTime.TIME_SIMPLE),
        host: 'Austin',
        image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/Super_Mario_Bros._3_coverart.png'
        
    },
    {
        id: '2',
        title: 'Halo',
        topic: 'Modern Games',
        content: 'Halo test content',
        address: '123 Fake street',
        date: '2021-02-12',
        startTimeM: '13:00',
        startTime: DateTime.local(1972, 1, 1, 13, 0).toLocaleString(DateTime.TIME_SIMPLE),
        endTimeM: '14:00',
        endTime: DateTime.local(1972, 1, 1, 14, 0).toLocaleString(DateTime.TIME_SIMPLE),
        host: 'Dustin',
        image: 'https://store-images.s-microsoft.com/image/apps.32635.13744479854832406.0affa1b0-655f-49af-ab66-9c9ccd71090c.75be220c-443f-4f73-b3af-4dfcd5da2e9c?w=180&h=270&q=60'
        
    },
    {
        id: '3',
        title: 'Call of Duty',
        topic: 'Modern Games',
        content: 'Call of Duty test content',
        address: '123 Fake street',
        date: '2021-02-12',
        startTimeM: '13:30',
        startTime: DateTime.local(1972, 1, 1, 13, 30).toLocaleString(DateTime.TIME_SIMPLE),
        endTimeM: '14:30',
        endTime: DateTime.local(1972, 1, 1, 14, 30).toLocaleString(DateTime.TIME_SIMPLE),
        host: 'justin',
        image: 'https://upload.wikimedia.org/wikipedia/en/d/db/Modern_Warfare_2_cover.PNG'
        
    },
    {
        id: '4',
        title: 'Borderlands 3',
        topic: 'Modern Games',
        content: 'Borderlands 3 test content',
        address: '123 Fake street',
        date: '2021-03-13',
        startTimeM: '18:00',
        startTime: DateTime.local(1972, 1, 1, 18, 0).toLocaleString(DateTime.TIME_SIMPLE),
        endTimeM: '19:00',
        endTime: DateTime.local(1972, 1, 1, 19, 0).toLocaleString(DateTime.TIME_SIMPLE),
        host: 'Chirs',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Borderlands_3_cover_art.jpg/220px-Borderlands_3_cover_art.jpg'
        
    }
    ,
    {
        id: '5',
        title: 'Tetris',
        topic: 'Retro Games',
        content: 'Tetris test content',
        address: '123 Fake street',
        date: '2021-04-14',
        startTimeM: '16:00',
        startTime: DateTime.local(1972, 1, 1, 16, 0).toLocaleString(DateTime.TIME_SIMPLE),
        endTimeM: '17:00',
        endTime: DateTime.local(1972, 1, 1, 17, 0).toLocaleString(DateTime.TIME_SIMPLE),
        host: 'Josh',
        image: 'https://images-na.ssl-images-amazon.com/images/I/61Wvdn29vZL.png'
        
    }
    ,
    {
        id: '6',
        title: 'Pac-Man',
        topic: 'Retro Games',
        content: 'Pac-Man test content',
        address: '123 Fake street',
        date: '2021-05-25' ,
        startTime: DateTime.local(1972, 1, 1, 13, 0).toLocaleString(DateTime.TIME_SIMPLE),
        startTimeM: '13:00',
        endTime: DateTime.local(1972, 1, 1, 19, 0).toLocaleString(DateTime.TIME_SIMPLE),
        endTimeM: '19:00',
        host: 'Josh',
        image: 'https://upload.wikimedia.org/wikipedia/en/2/2d/Pac-Man_Vs._Coverart.png'
        
    }
   
];

exports.find = () => connections;

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
