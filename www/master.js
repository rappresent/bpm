var env = process.env;
var info = {
    version : env.npm_package_version,
    port : env.npm_package_port,
    name : env.npm_package_name,
    description : env.npm_package_description,
    home : env.PWD + '/',
    node : env.NODE,
    pid : process.pid,
    ip : require(env.PWD + '/libs/getip')(),
    dbConfig : require(env.PWD + '/config/mongo'),
    maxAge : 15 * 60 * 1000 //15 munites session idle
};
var cluster = require('cluster');
//
if (cluster.isMaster) {
    cluster.on('exit', function (worker, code, signal) {
        console.error('Exiting died worker :', worker.process.pid.toString());
    });
    cluster.on('death', function (worker) {
        console.error('Died worker :', worker.process.pid.toString());
    });
    console.info('Starting :', info.description);
    for (var i = 0; i < (require('os').cpus().length); i++) {
        var worker = cluster.fork();
        worker.send({for : "initialize", message : 'Hello world!'});
    }
} else {
    require('./worker')(info);
}