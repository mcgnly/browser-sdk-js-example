import main from 'relayr-browser-sdk/src/main.js';

//connect to cloud
var relayr = main.init({
    // this comes from the api key page on the dashboard
    appId: keys.APP_ID,
    // this identifies my website as a 'trusted user' basically- it expects me to show up and ask for access to stuff
    redirectUri: "http://localhost:8080/front-page.html"
});



main.authorize().then((token) {

    // the login function returns success or error, 
    // the token is generated when you log in to your account in that redirect,
    // and is passed in the local memory of the browser

    //define some variables to hold arrays derived from the user class, for further use in the specific classes 
    let allDevices;
    let allTransmitters;

    //USER THINGS
    let userInstance = new User(token);
    //getUserInfo creates a Promise, so call .then on it
    relayr.userinstance.getUserInfo().then((response) => {
        //inject this text into the html
        $(".users").text(response.email);
        userid = response.id;
    }).catch((err) => {
        console.log("error, the promise was rejected");
    });

    relayr.userinstance.getMyDevices().then((response) => {
        allDevices = response;
        //inject this text into the html
        for (x in response) {
            // tack the object[index].name on to the list displayed in the html
            $('<ul>').text(response[x].name).appendTo('.devices');
        }
    }).catch((err) => {
        console.log("error, the promise was rejected");
    });

    relayr.userinstance.getMyGroups().then((response) => {
        //inject this text into the html
        // loops through the object holding the devices, x gives you an index
        for (x in response) {
            // tack the object[index].name on to the list displayed in the html
            $('<ul>').text(response[x].name).appendTo('.groups');
        }
    }).catch((err) {
        console.log("error, the promise was rejected")
    });

    relayr.userinstance.getMyTransmitters().then((response) => {
        allTransmitters = response;
        // loops through the object holding the devices, x gives you an index
        for (x in response) {
            // tack the object[index].name on to the list displayed in the html
            $('<ul>').text(msg[x].name + " : " + msg[x].id).appendTo('.transmitterlist');
        }
    }).catch((err) {
        console.log("error, the promise was rejected")
    });

    //DEVICE THINGS
    //set up the device instances
    let deviceInstance1 = new Device(allDevices[0]);
    let deviceInstance2 = new Device(allDevices[1]);

    // this gets the data from the devices
    deviceInstance1.getReadings().then((response) => {
        //inserts into html
        $(".reading1").text(dev1);
    }).catch((err) => {
        //informs you if something went wrong
        console.log("error, the promise was rejected");
    });

    // this gets the data from the second device
    deviceInstance2.getReadings().then((response) => {
        //inserts into html
        $(".reading2").text(dev1);
    }).catch((err) => {
        //informs you if something went wrong
        console.log("error, the promise was rejected");
    });

    //TRANSMITTER THINGS
    //set up the transmitter instances
    let transmitterInstance = new Transmitter(allTransmitters[0]);

    //delete the first transmitter in the list
    transmitterInstance.deleteTransmitter().then((response) => {
        location.reload();
    }).catch((err) => {
        //informs you if something went wrong
        console.log("error, the promise was rejected");
    });

    // update the first transmitter in the list
    let patch = {
        name: $('.status-box').val()
    };
    transmitterInstance.updateTransmitter(patch, true).then((response) => {
        location.reload();
    }).catch((err) => {
        //informs you if something went wrong
        console.log("error, the promise was rejected");
    });


});