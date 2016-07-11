# browser-sdk-js-example

Welcome to the vanilla javascript example using the relayr browser SDK- here are a few tips on how to get started: 

This example is served up using webpack, so as a first step (like usual), in the terminal, run npm install, and that should get all the dependencies you need to make this run smoothly. 

Once all the dependencies are in place, you should put the id and the redirectURI in the RELAYR.init section of the js-script file, to identify you and your specific project. If you serve it in exactly the same way as the example is set up, you can leave the redirectURI as it is, and give that as the expected redirect when you create the project on the relayr cloud. 

When your project is set up through the relayr dashboard and you have some devices and maybe some transmitters, the process of getting the example up and running is super simple. In the terminal, "npm start" will, based on the scripts in the package.json, pack the various files in the example up and serve them to http://localhost:3000/dist/front-page.html. Go to this in the browser, and you should see the example, working with your account and devices!



