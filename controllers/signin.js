// Define a function to handle sign in
const handleSignin = (req, res, db, bcrypt) => {
   // Extract the email and password from the request body
  const { email, password} = req.body;
  // If either the email or password is missing, send a 400 status code and a message
  if (!email || !password) {
    return res.status(400).json('incorect form submission');
  }
  // Select the email and hash from the 'login' table where the email matches the provided email
  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      // Compare the provided password with the hashed password
      const isValid = bcrypt.compareSync(password, data[0].hash);
      // If the password is valid
      if (isValid) {
        // Select all fields from the 'users' table where the email matches the provided email
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            // Send the user data as a JSON response
            res.json(user[0])
          })
          // If an error occurs, send a 400 status code and a message
          .catch(err => res.status(400).json('unable to get user'))
      } else {
         // If the password is not valid, send a 400 status code and a message
        res.status(400).json('wrong credentials')
      }
    })
    // If an error occurs, send a 400 status code and a message
    .catch(err => res.status(400).json('wrong credentials'))
}

// Export the function for use in other modules
module.exports = {
	handleSignin: handleSignin
}