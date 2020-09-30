const usernameValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === '') {
    return `${fieldName} is required`;
  }

  if (/[^A-Za-z0-9.-_]/.test(fieldValue)) {
    return `${fieldName} has invalid characters`;
  }

  if (fieldValue.length < 3) {
    return `${fieldName} must be at least 3 characters long`;
  }

  return null;
};

const passwordValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === '') {
    return `${fieldName} is required`;
  }

  if (/[^A-Za-z0-9.*-_]/.test(fieldValue)) {
    return `${fieldName} has invalid characters`;
  }

  if (fieldValue.length < 3) {
    return `${fieldName} must be at least 3 characters long`;
  }

  return null;
};

const emailValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === '') {
    return 'Email is required';
  }

  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      fieldValue,
    )
  ) {
    return null;
  }

  return 'Please enter a valid email';
};

export {usernameValidation, passwordValidation, emailValidation};
