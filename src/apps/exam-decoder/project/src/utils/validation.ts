import { ValidationError } from '../types';

export class ValidationService {
  static validateEmail(email: string): ValidationError | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return { field: 'email', message: 'Email is required', code: 'REQUIRED' };
    }
    if (!emailRegex.test(email)) {
      return { field: 'email', message: 'Invalid email format', code: 'INVALID_FORMAT' };
    }
    return null;
  }

  static validatePassword(password: string): ValidationError | null {
    if (!password) {
      return { field: 'password', message: 'Password is required', code: 'REQUIRED' };
    }
    if (password.length < 8) {
      return { field: 'password', message: 'Password must be at least 8 characters', code: 'MIN_LENGTH' };
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { field: 'password', message: 'Password must contain uppercase, lowercase, and number', code: 'WEAK_PASSWORD' };
    }
    return null;
  }

  static validateRequired(value: any, fieldName: string): ValidationError | null {
    if (value === null || value === undefined || value === '') {
      return { field: fieldName, message: `${fieldName} is required`, code: 'REQUIRED' };
    }
    return null;
  }

  static validateMinLength(value: string, minLength: number, fieldName: string): ValidationError | null {
    if (value && value.length < minLength) {
      return { 
        field: fieldName, 
        message: `${fieldName} must be at least ${minLength} characters`, 
        code: 'MIN_LENGTH' 
      };
    }
    return null;
  }

  static validateMaxLength(value: string, maxLength: number, fieldName: string): ValidationError | null {
    if (value && value.length > maxLength) {
      return { 
        field: fieldName, 
        message: `${fieldName} must be no more than ${maxLength} characters`, 
        code: 'MAX_LENGTH' 
      };
    }
    return null;
  }

  static validateNumericRange(value: number, min: number, max: number, fieldName: string): ValidationError | null {
    if (value < min || value > max) {
      return { 
        field: fieldName, 
        message: `${fieldName} must be between ${min} and ${max}`, 
        code: 'OUT_OF_RANGE' 
      };
    }
    return null;
  }

  static validateCardTitle(title: string): ValidationError[] {
    const errors: ValidationError[] = [];
    
    const requiredError = this.validateRequired(title, 'title');
    if (requiredError) errors.push(requiredError);
    
    const minLengthError = this.validateMinLength(title, 3, 'title');
    if (minLengthError) errors.push(minLengthError);
    
    const maxLengthError = this.validateMaxLength(title, 100, 'title');
    if (maxLengthError) errors.push(maxLengthError);
    
    return errors;
  }

  static validateQuizSettings(settings: any): ValidationError[] {
    const errors: ValidationError[] = [];
    
    if (settings.timeLimit && settings.timeLimit < 1) {
      errors.push({ 
        field: 'timeLimit', 
        message: 'Time limit must be at least 1 minute', 
        code: 'MIN_VALUE' 
      });
    }
    
    if (settings.passingScore && (settings.passingScore < 0 || settings.passingScore > 100)) {
      errors.push({ 
        field: 'passingScore', 
        message: 'Passing score must be between 0 and 100', 
        code: 'OUT_OF_RANGE' 
      });
    }
    
    return errors;
  }
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000); // Limit length
}

export function validateFileUpload(file: File): ValidationError | null {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (file.size > maxSize) {
    return { field: 'file', message: 'File size must be less than 10MB', code: 'FILE_TOO_LARGE' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { field: 'file', message: 'Only image files are allowed', code: 'INVALID_FILE_TYPE' };
  }
  
  return null;
}