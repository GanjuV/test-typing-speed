import PubSub from "browser-pubsub";

export const Channel = new PubSub("my_channel");

// publish a topic asynchronously
// PubSub.publish("MY TOPIC", "hello world!");
