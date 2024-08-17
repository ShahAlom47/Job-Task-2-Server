const { db } = require("../utils/DB-connect");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getUserCollection } = require("../utils/AllDB_Collections/userCollection");
const { ObjectId } = require("mongodb");



const usersCollection = getUserCollection()


// Register  


const addUser = async (req, res) => {
  const userData = req.body;
  try {
   
    const existingUser = await usersCollection.findOne({ email: userData.email });

    if (existingUser) {
      return res.send({ message: 'Account with this email already exists' });
    }

  
    const result = await usersCollection.insertOne(
      userData
    );
    res.status(201).send(result);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Internal Server Error');
  }
};





const updateUserData = async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    if (!ObjectId.isValid(id)) {
      return res.send({ message: 'Invalid ID format' });
    }

    const query = { _id: new ObjectId(id) };
    const updateData = {
      $set: newData
    };

    const result = await usersCollection.updateOne(query, updateData);

    if (result.matchedCount === 0) {
      return res.send({ message: 'User not found' });
    }

    return res.send({ message: 'User updated successfully', result });
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

const updateUserProfilePhoto = async (req, res) => {
  const email=req.params.email;
  const {photoURL}=req.body;
  const query= {email:email}
  const updateData={
    $set:{
      photoURL:photoURL
    }
  }

  const result=await usersCollection.updateOne(query,updateData)
  return res.send(result)


}

module.exports = {
  addUser,
 
  updateUserData,
  updateUserProfilePhoto,
}