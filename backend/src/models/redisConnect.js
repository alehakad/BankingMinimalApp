import redis from "redis";

const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
    socket: {
        host: redisHost,
        port: redisPort,
    },
});


redisClient.on('connect', () => {
    console.log("Connected to Redis");
});


redisClient.on('error', (err) => {
    console.log("Redis error", err);
})

export default redisClient;