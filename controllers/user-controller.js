const { User, Thought } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // get one user by id
  getUserById(req, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },

  // update user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUserData) => {
        if (!updatedUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(updatedUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAuserData({ _id: params.userData })
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
