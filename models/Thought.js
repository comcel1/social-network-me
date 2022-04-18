const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: 'string',
    required: true,
    maxLength: 280,
  },
  username: {
    type: 'string',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: 'string',
      required: true,
    },

    // requirement: array of nested documents created with the reactionSchema
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create the Thought model using the Thought
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;
