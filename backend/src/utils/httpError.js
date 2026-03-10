class HttpError extends Error {
  constructor(statusCode, message, details) {
    super(message || 'An unexpected error occurred');
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.status = statusCode;
    if (details !== undefined) {
      this.details = details;
    }
    Error.captureStackTrace?.(this, this.constructor);
  }

  static badRequest(message, details) {
    return new HttpError(400, message, details);
  }

  static unauthorized(message, details) {
    return new HttpError(401, message, details);
  }

  static forbidden(message, details) {
    return new HttpError(403, message, details);
  }

  static notFound(message, details) {
    return new HttpError(404, message, details);
  }

  static conflict(message, details) {
    return new HttpError(409, message, details);
  }

  static internal(message, details) {
    return new HttpError(500, message || 'An internal server error occurred.', details);
  }
}

module.exports = HttpError;