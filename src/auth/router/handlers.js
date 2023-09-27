'use strict';

const { users } = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error creating a user');
  }
}

async function handleSignin(req, res, next) {
  try {
    const user = {
      user: req.user,
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error signing in as user');
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error getting users');
  }
}

function handleSecret(req, res, next) {
  try {
    res.status(200).send("Welcome to the secret area!");
  } catch (e) {
    console.error(e);
    res.status(500).send('Error accessing secret area');
  }
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
}