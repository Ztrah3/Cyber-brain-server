// Import the Clarifai module
const Clarifai = require('clarifai');

// Initialize a new Clarifai app with your API key
const app = new Clarifai.App({
 apiKey: '18b605c1a82645408ac18bea03e1d276'
});

// Define a function to handle API calls
const handleApiCall = (req, res) => {
  // Use the Clarifai app to predict the face-detection model with the input from the request body
  app.models.predict('face-detection', req.body.input)
  .then(data => {
    // Send the data from the prediction as a JSON response
    res.json(data);
  })
   // If an error occurs, send a 400 status code and a message
  .catch(err => res.status(400).json('unable to work with API'))
}

// Define a function to handle image requests
const handleImage = (req, res, db) => {
  // Extract the id from the request body
  const { id } = req.body;
  // Use the database to increment the entries for the user with the provided id
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
     // Send the number of entries as a JSON response
    res.json(entries[0].entries);
  })
  // If an error occurs, send a 400 status code and a message
  .catch(err => res.status(400).json('unable to get entries'))
}

// Export the functions for use in other modules
module.exports = {
	handleImage,
  handleApiCall
}