(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["relayr"] = factory();
	else
		root["relayr"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _relayrBrowserSdkMin = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./relayr-browser-sdk.min.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var _relayrBrowserSdkMin2 = _interopRequireDefault(_relayrBrowserSdkMin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//connect to cloud
	var RELAYR = _relayrBrowserSdkMin2.default;

	//init gives the api enough information to link this code to a specific project on the relayr cloud
	RELAYR.init({
	    // this comes from the api key page on the dashboard
	    //it is important that these be called exactly  "redirectURI" and "id"
	    //TODO figure out how to get sensitive data back into a seperate file
	    id: "yourIDhere",
	    // this identifies my website as a 'trusted user' basically- it expects me to show up and ask for access to stuff
	    redirectURI: "http://localhost:3000/dist/front-page.html"
	});

	//authorizing redirects you to log in, and returns the current user, whose devices and other things you can then interact with
	RELAYR.authorize().then(function (currentUser) {

	    //USER THINGS
	    //TODO is it better to use this to keep the promise structure consistent, or just get the email property directly from the currentUser?
	    currentUser.getUserInfo().then(function (response) {
	        //inject this text into the html
	        $(".users").text(response.email);
	    }).catch(function (err) {
	        console.log(err);
	    });

	    //DEVICE THINGS
	    currentUser.getMyDevices().then(function (response) {
	        //inject this text into the html
	        var allDevices = response;
	        // tack the object[index].name on to the list displayed in the html
	        response.forEach(function (x) {
	            $('<ul>').text(x.name).appendTo('.devices');
	        });

	        //now that we have the list of devices, we can display the data from the first two
	        //set up the device instance

	        var deviceInstance1 = new _relayrBrowserSdkMin.Device({
	            id: allDevices[0].id
	        }, {
	            ajax: currentUser.ajax
	        });
	        // this gets the data from the device, updated upon page refresh
	        deviceInstance1.getReadings().then(function (dev1) {
	            //inserts into html
	            $(".reading1").text(dev1.readings[0].value);
	        }).catch(function (err) {
	            //informs you if something went wrong
	            console.log(err);
	        });

	        //this gets you live-updating data from the device, constantly updated
	        deviceInstance1.connect().then(function (connection) {
	            connection.on('data', function (data) {
	                $(".reading2").text(data.readings[0].value);
	            });
	        });
	    }).catch(function (err) {
	        console.log(err);
	    });

	    currentUser.getMyGroups().then(function (response) {
	        //inject this text into the html
	        // loops through the object holding the devices, x gives you an index
	        response.forEach(function (x) {
	            // tack the object[index].name on to the list displayed in the html
	            $('<ul>').text(x.name).appendTo('.groups');
	        });
	    }).catch(function (err) {
	        console.log(err);
	    });

	    //TRANSMITTER THINGS
	    currentUser.getMyTransmitters().then(function (response) {
	        var allTransmitters = response;
	        // loops through the object holding the devices, x gives you an index
	        response.forEach(function (x) {
	            // tack the object[index].name on to the list displayed in the html
	            $('<ul>').text(x.name + " : " + x.id).appendTo('.transmitterlist');
	        });

	        //set up the transmitter instance
	        var transmitterInstance = new _relayrBrowserSdkMin.Transmitter({
	            id: allTransmitters[0].id,
	            ajax: currentUser.ajax
	        });

	        $("#delete").click(function () {
	            //delete the first transmitter in the list
	            transmitterInstance.deleteTransmitter().then(function () {
	                document.location.reload(true);
	            }).catch(function (err) {
	                //informs you if something went wrong
	                console.log(err);
	            });
	        });

	        $("#updateName").click(function () {
	            // update the first transmitter in the list
	            var patchBody = {
	                name: $('.status-box').val()
	            };
	            transmitterInstance.updateTransmitter(patchBody).then(function (res) {
	                document.location.reload(true);
	            }).catch(function (err) {
	                //informs you if something went wrong
	                console.log(err);
	            });
	        });
	    }).catch(function (err) {
	        console.log(err);
	    });
	});

/***/ }
/******/ ])
});
;