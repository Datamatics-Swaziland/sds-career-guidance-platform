const logger = require('../utils/logger');

const mapKnownError = (err) => {
  if (!err) return { statusCode: 500, message: 'An internal server error occurred.' };

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return { statusCode: 401, message: 'Invalid or expired token' };
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return { statusCode: 409, message: 'Resource already exists' };
  }

  if (err.name === 'SequelizeValidationError') {
    return {
      statusCode: 400,
      message: 'Validation failed',
      details: err.errors?.map((item) => ({ field: item.path, message: item.message }))
    };
  }

  if (err.type === 'entity.parse.failed') {
    return { statusCode: 400, message: 'Invalid JSON payload' };
  }

  const statusCode = err.statusCode || err.status || 500;
  return {
    statusCode,
    message: err.message || (statusCode >= 500 ? 'An internal server error occurred.' : 'Request failed'),
    details: err.details
  };
};

const handleError = (err, req, res, next) => {
  const normalized = mapKnownError(err);

  logger.error({
    message: err?.message,
    stack: err?.stack,
    statusCode: normalized.statusCode,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    user: req.user?.id || 'anonymous',
    details: err?.details
  });

  const body = {
    status: 'error',
    message: normalized.message
  };

  if (normalized.details !== undefined) {
    if (normalized.details && typeof normalized.details === 'object' && !Array.isArray(normalized.details)) {
      body.details = normalized.details;
    } else {
      body.errors = normalized.details;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    body.stack = err?.stack;
  }

  return res.status(normalized.statusCode).json(body);
};

module.exports = handleError;
module.exports.handleError = handleError;
