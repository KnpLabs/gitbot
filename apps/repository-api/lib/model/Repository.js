const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function removeInternalFields(doc, ret, options) {
  delete ret._id;
  delete ret.__v;
  delete ret.hookId;

  return ret;
}

export const repositorySchema = new Schema({
  name: {type: String},
  token: {type: String},
  hookId: {type: Number}
}, {toJSON: {transform: removeInternalFields}});

export default mongoose.model('Repository', repositorySchema);
