const generatePassword = require('password-generator');

const getPasswords = (req, res) => {
    const count = 5;
      
        // Generate some passwords
    const passwords = Array.from(Array(count).keys()).map(i =>
        generatePassword(12, false)
    )
    
    // Return them as json
    res.json(passwords);
    
    console.log(`Sent ${count} passwords`);
}

module.exports = {
    getPasswords
}