process.on("message", (cant) => {
  let result = {};
  for (let i = 1; i <= cant; i++) {
    const numRandom = Math.floor(Math.random() * 1000 + 1);
    if (result[numRandom]) {
      result[numRandom] += 1;
    } else {
      result[numRandom] = 1;
    }
  }
  process.send(result);
});
