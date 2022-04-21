const { User, Thought } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // get one thought
  getOnethought(req, res) {
    Thought.findOne({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // create thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },

  // update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
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

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAuserData({ _id: params.userData })
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },

  // add reaction
  // delete reaction
};

module.exports = thoughtController;
