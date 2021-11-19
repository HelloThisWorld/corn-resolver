const handleCorn = require("./service/cornhandler");

function resolve() {
    let args = process.argv[2].replace('"');
    let response = handleCorn(args);
    console.log(response);
}
resolve();