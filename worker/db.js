const { createClient } = require("redis");

class Redis {
  db_instance = null;
  createClient() {
    const redisClient = createClient({
      url: process.env.REDIS_CONNECTION,
    });
    this.db_instance = redisClient;
  }
  async connect() {
    if (!this.db_instance) {
      this.createClient();
    }
    await this.db_instance.connect();
    return this.db_instance;
  }
}
module.exports = Redis;
