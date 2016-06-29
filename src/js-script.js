import relayrSDK from './relayr-browser-sdk.min.js';
// import keys from './api-keys.js';

//connect to cloud
const RELAYR = relayrSDK;

RELAYR.init({
    // this comes from the api key page on the dashboard
    //it is important that these be called exactly  "redirectURI" and "id" 
    id: "",
    // this identifies my website as a 'trusted user' basically- it expects me to show up and ask for access to stuff
    redirectURI: "http://localhost:3000/dist/front-page.html"
});
RELAYR.authorize().then((currentUser) => {
    //authorizing returns the current user, whose devices and other things you can now interact with
    let allDevices;
    let allTransmitters;

    //USER THINGS
    //TODO is it better to use this to keep the promise structure consistent, or just get the email property directly from the currentUser?
    currentUser.getUserInfo().then((response) => {
        //inject this text into the html
        $(".users").text(response.email);
    }).catch((err) => {
        console.log("error, the userInfo promise was rejected");
    });

    currentUser.getMyDevices().then((response) => {
        // console.log(response);
        //inject this text into the html
        allDevices = response;
        // tack the object[index].name on to the list displayed in the html
        response.forEach((x) => {
            $('<ul>').text(x.name).appendTo('.devices');
        });

    }).catch((err) => {
        console.log("error, the getMyDevices promise was rejected");
    });

    currentUser.getMyGroups().then((response) => {
        //inject this text into the html
        // loops through the object holding the devices, x gives you an index
        response.forEach((x) => {
            // tack the object[index].name on to the list displayed in the html
            $('<ul>').text(x.name).appendTo('.groups');
        });
    }).catch((err) => {
        console.log("error, the getMyGroups promise was rejected")
    });

    currentUser.getMyTransmitters().then((response) => {
        allTransmitters = response;
        // loops through the object holding the devices, x gives you an index
        response.forEach((x) => {
            // tack the object[index].name on to the list displayed in the html
            $('<ul>').text(x.name + " : " + x.id).appendTo('.transmitterlist');
        });
    }).catch((err) => {
        console.log("error, the getMyTransmitters promise was rejected")
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
        console.log("error, the dev 1 readings promise was rejected");
    });

    // this gets the data from the second device
    deviceInstance2.getReadings().then((response) => {
        //inserts into html
        $(".reading2").text(dev1);
    }).catch((err) => {
        //informs you if something went wrong
        console.log("error, the dev 2 readingspromise was rejected");
    });

    //TRANSMITTER THINGS
    //set up the transmitter instances
    let transmitterInstance = new Transmitter(allTransmitters[0]);

    //delete the first transmitter in the list
    transmitterInstance.deleteTransmitter().then((response) => {
        location.reload();
    }).catch((err) => {
        //informs you if something went wrong
        console.log("error, the deleteTransmitter promise was rejected");
    });

    // update the first transmitter in the list
    let patch = {
        name: $('.status-box').val()
    };
    transmitterInstance.updateTransmitter(patch, true).then((response) => {
        location.reload();
    }).catch((err) => {
        //informs you if something went wrong
        console.log("error, the updateTransmitter promise was rejected");
    });


});