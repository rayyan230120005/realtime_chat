import Redis from "ioredis";

const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379";

const redisConfig = {
    maxRetriesPerRequest:null,
    enableReadyCheck: false,
    retryStrategy(times)
    {
        const delay = Math.min(times * 100, 3000);
        return delay;
    },
};

//General redis client for key-value storage
//(presence , caching , socket maps)

export const redisClient = new Redis(REDIS_URI,redisConfig)

// Dedicated Redis clients for Socket.io Pub/Sub adapter
export const createRedisClient = () =>
{
    return new Redis(REDIS_URI,redisConfig);
};

redisClient.on("connect" , () =>
{
    console.log("Connected to Redis instance")
});

redisClient.on("connect", (err) => 
{
    console.error("Redis client error :" , err.message)
});