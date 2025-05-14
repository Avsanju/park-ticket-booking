const express = require('express');
const logger = require('./logger');
const { metricsMiddleware, metricsEndpoint } = require('./metrics');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Add metrics middleware
app.use(metricsMiddleware);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 🔹 Expose /metrics endpoint for Prometheus
app.get('/metrics', metricsEndpoint);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
