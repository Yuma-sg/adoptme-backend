export default class CustomError {
  static createError({ name = 'Error', message, statusCode = 500 }) {
    const error = new Error(message);
    error.name = name;
    error.statusCode = statusCode;
    throw error;
  }
}
