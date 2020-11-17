const wait = (timer) =>
  new Promise((res) => {
    setTimeout(() => {
      res();
    }, timer);
  });

export default wait;
