/**
 * Import express
 * Import mongoose
 * Import fetch from node-fetch
 * Import ToDo from models
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const ToDo = require('../models/ToDo');

/**
 * Fetch Data from "https://jsonplaceholder.typicode.com/todos" 
 * /fetch => GET
 *
 */
router.use('/fetch', async (req, res, next)=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {method : 'GET'})
    const data =  await response.json();
    for(let x of data){
        await new ToDo(x).save();
    }
    res.json({message: "Successfully inserted"});
    console.log('Inserted successfully into the DB..');
});

/** Update document field 'completed' to true by matching with 'id' field
 * /update/:docId => PATCH
 */
router.patch('/update/:docId', async (req, res, next)=>{
    try{
        const updatedPost = await ToDo.updateOne(
            {'id': req.params.docId},
            {$set: {'completed': true}}
        );
        res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
});

/** Delete specific document by matching id
 * /delete/:docId
 */
router.delete('/delete/:docId', async (req, res, next)=>{
    try{
        const deletedDoc = await ToDo.deleteOne(
            {'id': req.params.docId}
        );
        res.json(deletedDoc);
    }catch(err){
        res.json(err);
    }
});

/**
 * /get-data/:id =>GET
 */
router.get('/get-data/:docId', async (req, res,next)=>{
    try{
        const getSpecData = await ToDo.find({'id': req.params.docId});
        res.json(getSpecData);
    }catch(err){
        res.json({message: err});
    }
});

/**
 * /get-data => GET
 */
router.get('/get-data', async (req, res, next)=>{
    try{
        const getData = await ToDo.find();
        res.json(getData);
    }catch(err){
        res.json({message: err});
    }
    
});

/**
 * Middle ware for Home Page
 */
router.use('/', (req, res, next)=>{
    res.send('<h3>On Home Page</h3>');
});

module.exports = router;