// metrics.js
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // CPU, memory, etc.

// Custom HTTP request duration histogram
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 1000] // ms buckets
});

module.exports = {
  httpRequestDurationMicroseconds,
  metricsMiddleware: (req, res, next) => {
    const startEpoch = Date.now();
    res.on('finish', () => {
      const responseTimeInMs = Date.now() - startEpoch;
      httpRequestDurationMicroseconds
        .labels(req.method, req.route?.path || req.path, res.statusCode)
        .observe(responseTimeInMs);
    });
    next();
  },
  metricsEndpoint: (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(client.register.metrics());
  }
};
