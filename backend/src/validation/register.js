import emailValidator from 'email-validator';

function validateRegistration(data) {
   const validationErrors = [];

   // Check for empty fields
   if (!data.email || !data.password || !data.passwordCheck || !data.username) {
      validationErrors.push('Missing fields');
   } else {
      // ensure password is longer than 5 (6 or above)
      if (data.password.length < 6) {
         validationErrors.push('The password needs to be at least 6 characters long');
      }
      // check if passwords match
      if (data.password !== data.passwordCheck) {
         validationErrors.push('The passwords did not match');
      }
      // Validate registration email using "email-validator"
      if (!emailValidator.validate(data.email)) {
         validationErrors.push('Enter a valid email address');
      }
   }

   return {
      validationErrors,
      isValid: validationErrors.length === 0,
   };
}

export default validateRegistration;
