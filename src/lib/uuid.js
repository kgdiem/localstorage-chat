const randomNumber = () => Math.floor(Math.random() * 15000);

export const uuid = () =>
  `${Date.now()}-${randomNumber()}-${randomNumber()}-${randomNumber()}-${Date.now()}`;
