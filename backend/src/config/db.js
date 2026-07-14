mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});