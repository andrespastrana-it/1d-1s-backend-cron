import express from "express";
import axios from "axios";
import { env } from "./src/env.js";

import cron from "node-cron";

const app = express();

// Cron job scheduled to run every 1 minute
cron.schedule("* * * * *", async () => {
  try {
    console.log(`Cron job triggered at ${new Date().toISOString()}`);

    const response = await axios.get(env.ONE_DAY_ONE_STORY_NEXTAPP, {
      headers: { Authorization: env.CRON_SECRET },
    });

    if (response.status === 200) {
      console.log(
        `Cron job finished successfully at ${new Date().toISOString()}`
      );
    }
  } catch (error) {
    console.error("Error making request:", error.message);
  }
});

// Start the server and dynamically log the address
const server = app.listen(env.PORT, () => {
  const addressInfo = server.address();
  if (typeof addressInfo === "string") {
    console.log(`Server is running on ${addressInfo}`);
  } else if (addressInfo) {
    // When address is '::' (IPv6 unspecified), we'll display 'localhost'
    const host =
      addressInfo.address === "::" ? "localhost" : addressInfo.address;
    console.log(`Server is running on http://${host}:${addressInfo.port}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
