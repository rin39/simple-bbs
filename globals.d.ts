declare module globalThis {
  var mongoose: {
    conn: Mongoose;
    promise: Promise<Mongoose> | null;
  };
}
