import { Queue } from "bullmq";
import { getRedisConnObject } from "../config/redis.config";

export const producerQueue = new Queue("order-completion", {
  connection: getRedisConnObject(),
});

export async function addJobs() {
  await producerQueue.add("order-completion", { message: "Order Completed" });
}
