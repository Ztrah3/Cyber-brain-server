// Define a function to handle GET requests to the profile endpoint
const handleProfileGet = (req, res, db) => {
  // Extract the id from the request parameters
  const { id } = req.params;
  // Use the database to select all fields from the 'users' table where the id matches the provided id
  db.select('*').from('users').where({id})
    .then(user => {
      // If the user array has at least one element, send the first element as a JSON response
      if (user.length) {
        res.json(user[0])
      } else {
        // If the user array is empty, send a 400 status code and a message
        res.status(400).json('Not found')
      }
    })
    // If an error occurs, send a 400 status code and a message
    .catch(err => res.status(400).json('error getting user'))
}

// Export the function for use in other modules
module.exports = {
	handleProfileGet
}