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
  getOneThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
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
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },

  // update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUserData) => {
        if (!updatedUserData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(updatedUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json({ message: 'thought deleted' });
      })
      .catch((err) => res.status(400).json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((reactionData) => {
        if (!reactionData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(reactionData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((reactionData) => {
        if (!reactionData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(reactionData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
