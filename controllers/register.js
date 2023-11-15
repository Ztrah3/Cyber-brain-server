// Define a function to handle registration
const handleRegister = (req, res, db, bcrypt) => {
  // Extract the email, name, and password from the request body
  const { email, name, password } = req.body;
  // If any of the fields are missing, send a 400 status code and a message
  if (!email || !name || !password) {
    return res.status(400).json('incorect form submission');
  }
  // Hash the password using bcrypt
  const hash = bcrypt.hashSync(password);
    // Start a database transaction
    db.transaction(trx => {
      // Insert the hashed password and email into the 'login' table
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        // Insert the email, name, and current date into the 'users' table
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date()
          })
          .then(user => {
            // Send the user data as a JSON response
            res.json(user[0]);
          })
      })
      // Commit the transaction
      .then(trx.commit)
      // Rollback the transaction if an error occurs
      .catch(trx.rollback)
    })
    // If an error occurs, send a 400 status code and a message
    .catch(err => res.status(400).json('unable to register'))
}

// Export the function for use in other modules
module.exports = {
  handleRegister: handleRegister
};