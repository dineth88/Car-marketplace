/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://car-marketplace_owner:MEBzpA6acZG4@ep-royal-union-a5pyg0pg.us-east-2.aws.neon.tech/car-marketplace?sslmode=require',
    }
  };