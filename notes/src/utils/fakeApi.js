const sleep = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const fakeApi = {
  setPublicStatus: async (_status) => {
    await sleep(1300);
    return;
  },
  getPublishedDate: async () => {
    await sleep(1100);
    return new Date();
  },
  getPreferredFont: async () => {
    await sleep(300);
    const fonts = [
      "Arial",
      "Times New Roman",
      "Comic Sans",
      "Papyrus",
      "Zapfino",
      "American Typewriter",
      "Herculanum",
    ];
    return fonts[Math.floor(Math.random() * fonts.length)];
  },
  getPreferredColor: async () => {
    await sleep(400);
    return Math.random() > 0.5 ? "light" : "dark";
  },
};

export default fakeApi;
