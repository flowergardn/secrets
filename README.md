# secrets 🗝️

an app to create and share temporary secrets

# setup

1. clone the repo
2. run `bun install` in the root of the project
3. create a `.env` file in the root of the project with the following content:

```
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
ENCRYPTION_KEY=your-encryption-key
```

4. run `bun dev`
5. done 🎉

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details