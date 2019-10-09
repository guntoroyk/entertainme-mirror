module.exports = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Service Error'

  res.status(status).json({
    status,
    message
  })
}
