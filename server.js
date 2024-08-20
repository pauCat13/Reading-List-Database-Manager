/**
* Author: Paula Catalan Santana
* Date: 11/05/24
* StudentID: 22920306
*/

const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

//Importing schemas from 'schemas' folder
const tenant = require('./schemas/tenantSchema');
const landlord = require('./schemas/landlordSchema');
const contract = require('./schemas/contractSchema');
const address = require('./schemas/addressSchema');

const app = express(); //using ExpressJS

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// UI 
const hbs = require('hbs');
const path = require('path');
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get("/", async function(req, res){
    try{
        const tenantR = await tenant.find();
        const landlordR = await landlord.find();
        const contractR = await contract.find();
        res.render("viewtenants", {
            tenant: tenantR,
            landlord: landlordR,
            contract: contractR
        });
    }catch(e){
        console.log("Nope " + e.message);
        res.status(500).send("Nope: " + e.message);
    }
});
// END UI

//START CRUD

//Tenant CRUD

// Create a new tenant using RESTful API post 
app.post('/tenants', async (req, res) => {
    const {title, fname, lname, mobile, email, addressLine1, addressLine2, town, county, eircode} = req.body;
    try {
        var newAddress = new address({addressLine1, addressLine2, town, county, eircode}); // Create new address
        await newAddress.save(); // Save new address registered
        var addressID = await newAddress._id; // Address id will now be the addressid that we have just created
        const newTenant = await new tenant({title, fname, lname, mobile, email, addressID}); // New tenant added to tenant table
        await newTenant.save(); // Save new Tenant registered
        res.json({ "newTenant" : newTenant , "newAddress" : newAddress}); 
        console.log("Tenant inserted properly: " + newTenant + newAddress);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


// Require tenant by email using RESTful API get
app.put('/tenants', async (req, res) => {
    try {
        console.log(req.body)
        const foundTenant = await tenant.findOne({ "email" : req.body.email}); //Look for tenant using email
        const find = foundTenant.addressID; // Find the addressID for tenants address details 
        const foundAddress = await address.findOne({"_id" : find}); // Save address details 
        res.json({ "foundTenant" : foundTenant , "foundAddress" : foundAddress}); //Output tenant's and their address details
        console.log(foundTenant + foundAddress); 
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


// Update a tenant's information
app.patch('/tenants', async (req, res) => {
    const email = req.body.email; //Get tenants email
    console.log(await email);
    const {title, fname, lname, mobile, addressLine1, addressLine2, town, county, eircode} = req.body; // Retrive the rest of the info
    try {
        const updateTenant = await tenant.findOneAndUpdate({email}, {title, fname, lname, mobile, email}); // Find matching email and update rest of parameters
        const find = updateTenant.addressID; // Find the addressID for tenants address details 
        const updateAddress = await address.findOneAndUpdate({"_id" : find}, {addressLine1, addressLine2, town, county, eircode}); // Find matching id and update rest of parameters 
        console.log(updateTenant + updateAddress);
        res.json({ "updateTenant" : updateTenant , "updateAddress" : updateAddress}); //Output tenant's and their address details
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


// Delete a tenant's information
app.delete('/tenants', async (req, res) => {
    const email = req.body.email; ///Get tenant's email
    console.log(await email);
    try {
        const findTenant = await tenant.findOne({email}); // Find matching email and save tenant's details
        const find = findTenant.addressID; // Find the addressID for tenants address details 
        const deletedTenant = await tenant.deleteOne({email}); // Delete tenant
        const deletedAddress = await address.deleteOne({"_id" : find}); // deleteTenant's address
        res.json({ "deletedTenant" : deletedTenant , "deletedAddress" : deletedAddress}); //Output tenant's and their address details
        console.log(deletedTenant + deletedAddress);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


//Landord CRUD

// Create a new landlord using RESTful API post 
app.post('/landlords', async (req, res) => {
    const {title, fname, lname, mobile, email, dob, permit, emailContact, addressLine1, addressLine2, town, county, eircode} = req.body;
    try {
        var newAddress = new address({addressLine1, addressLine2, town, county, eircode}); // Create new address
        await newAddress.save(); // Save new landlord address registered
        var addressID = await newAddress._id; // Address id will now be the addressid that we have just created
        const newLandlord = await new landlord({title, fname, lname, mobile, email, dob, permit, emailContact, addressID}); // New landlord added to landlord table
        await newLandlord.save(); // Save new landlord registered
        res.json({ "newLandlord" : newLandlord , "newAddress" : newAddress}); 
        console.log("Landlord inserted properly: " + newLandlord + newAddress);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Require a landlord's information by email using RESTful API get
app.put('/landlords', async (req, res) => {
    try {
        const foundLandlord = await landlord.findOne({email: req.body.email}); //Look for landlord using email
        const find = foundLandlord.addressID; // Find the addressID for landlord's address details 
        const foundAddress = await address.findOne({"_id" : find}); // Save address details 
        res.json({ "foundLandlord" : foundLandlord , "foundAddress" : foundAddress}); //Output tenant's and their address details
        console.log(foundLandlord + foundAddress); 
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Update a landlord's information
app.patch('/landlords', async (req, res) => {
    const email = req.body.email; //Get landlord's email
    console.log(await email);
    const {title, fname, lname, mobile, dob, permit, emailContact, addressLine1, addressLine2, town, county, eircode} = req.body; // Retrive the rest of the info
    try {
        const updateLandlord = await landlord.findOneAndUpdate({email}, {title, fname, lname, mobile, dob, permit, emailContact}); // Find matching email and update rest of parameters
        const find = updateLandlord.addressID; // Find the addressID for landlord's address details 
        const updateAddress = await address.findOneAndUpdate({"_id" : find}, {addressLine1, addressLine2, town, county, eircode}); // Find matching id and update rest of parameters 
        console.log(updateLandlord + updateAddress);
        res.json({ "updateLandlord" : updateLandlord , "updateAddress" : updateAddress}); //Output landlord's and their address details
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


// Delete a landlord's information
app.delete('/landlords', async (req, res) => {
    const email = req.body.email; ///Get landlord's email
    console.log(await email);
    try {
        const findLandlord = await landlord.findOne({email}); // Find matching email and save landlord's details
        const find = findLandlord.addressID; // Find the addressID for landlord's address details 
        const deletedLandlord = await landlord.deleteOne({email}); // Delete landlord
        const deletedAddress = await address.deleteOne({"_id" : find}); // delete Landlord's address
        res.json({ "deletedLandlord" : deletedLandlord , "deletedAddress" : deletedAddress}); //Output tenant's and their address details
        console.log(deletedLandlord + deletedAddress);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Contract CRUD

//Create a contract (at least one tenant and max of 3)
app.post('/contracts', async (req, res) => {
    const {date, addressLine1, addressLine2, town, county, eircode, tenants, landlord, fee, contractLength, propertyType} = req.body;
    try {
        var newAddress = new address({addressLine1, addressLine2, town, county, eircode}); // Create new address
        await newAddress.save(); // Save new contract address registered
        var addressID = await newAddress._id; // Address id will now be the addressid that we have just created
        const newContract = await new contract({date, tenants, landlord, fee, contractLength, propertyType, addressID}); // New contarct added to contract table
        await newContract.save(); // Save new landlord registered
        res.json({ "newContract" : newContract , "newAddress" : newAddress}); 
        console.log("Contract inserted properly: " + newContract + newAddress);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Retrive all contracts by a landlord
app.put('/contracts', async (req, res) => {
    try {
        console.log(req.body)
        const foundContract= await contract.findOne({ "landlord" : req.body.landlord}); //Look for tenant using email
        const find = foundContract.addressID; // Find the addressID for tenants address details 
        const foundAddress = await address.findOne({"_id" : find}); // Save address details 
        res.json({ "foundContract" : foundContract , "foundAddress" : foundAddress}); //Output tenant's and their address details
        console.log(foundContract + foundAddress); 
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Update a Contract's conditions

// Delete a whole contract

//END CRUD

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

