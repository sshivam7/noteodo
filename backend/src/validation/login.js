import emailValidator from 'email-validator';

function validateLogin(data) {
     const validationErrors = [];

     // Ensure that email and password fields are not empty 
     // Both are required
     if (!data.email || !data.password) {
          validationErrors.push('Missing fields')
     }

     // Use "email-validator" to validated email 
     if (!emailValidator.validate(data.email)) {
          validationErrors.push('Enter a valid email address');
     }

     return {
          validationErrors,
          isValid: validationErrors.length === 0
     }
}

export default validateLogin;