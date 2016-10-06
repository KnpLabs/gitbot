const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function removeInternalFields(doc, ret, options) {
  delete ret._id;
  delete ret.name;

  return ret;
}

export const repositorySchema = new Schema({
  name: {type: String},
  token: {type: String}
}, {toJSON: {transform: removeInternalFields}});

export default mongoose.model('Repository', repositorySchema);
