import "reflect-metadata";
import {useContainer, useExpressServer} from "routing-controllers";
import {Container} from "typedi";

// setup routing-controllers to use typedi container. You can use any container here
useContainer(Container);

// create and setup our own express app
const express = require("express");
const cors = require("cors");
const expressApp = express();
expressApp.use(cors());

// create express server
useExpressServer(expressApp, { // alternatively you can use useExpressServer with your own preconfigured express server
    controllerDirs: [__dirname + "/controllers/**/*.js"]
});

// run express app
expressApp.listen(4000);

console.log("API is up and running at port 4000");