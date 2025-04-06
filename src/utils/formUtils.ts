export interface FormValidationError {
  message: string;
  field?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: FormValidationError[];
}

export interface FormField {
  name: string;
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: string) => string | null;
}

export const validateForm = (fields: FormField[]): FormValidationResult => {
  const errors: FormValidationError[] = [];
  
  fields.forEach((field) => {
    const { name, value, required, minLength, maxLength, pattern, customValidator } = field;
    
    // Required check
    if (required && !value.trim()) {
      errors.push({
        field: name,
        message: `${name} is required`,
      });
      return; // Skip other validations if field is empty but required
    }
    
    // Skip other validations if field is empty and not required
    if (!value.trim()) {
      return;
    }
    
    // Min length check
    if (minLength && value.length < minLength) {
      errors.push({
        field: name,
        message: `${name} must be at least ${minLength} characters`,
      });
    }
    
    // Max length check
    if (maxLength && value.length > maxLength) {
      errors.push({
        field: name,
        message: `${name} must be no more than ${maxLength} characters`,
      });
    }
    
    // Pattern check
    if (pattern && !pattern.test(value)) {
      errors.push({
        field: name,
        message: `${name} has an invalid format`,
      });
    }
    
    // Custom validator
    if (customValidator) {
      const errorMessage = customValidator(value);
      if (errorMessage) {
        errors.push({
          field: name,
          message: errorMessage,
        });
      }
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : 'Please enter a valid email address';
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone) ? null : 'Please enter a valid phone number';
};
