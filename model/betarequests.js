var mongoose = require('mongoose');
var betaRequestSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  city: String,
  instagram: String,
  snapchat: String
});
mongoose.model('BetaRequest', betaRequestSchema);
