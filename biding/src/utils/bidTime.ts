export const bidTime = (startDateTime: string) => {
  const start: any = new Date(startDateTime);
  const end: any = new Date();

  const timeDiff: any = Math.abs(end - start);

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes + 1}m`;
};

export const pageReload = (products: any): number => {
  let minTime: Date = new Date(products[0]?.bid_time);

  for (let i = 1; i < products.length; i++) {
    const bidTime: Date = new Date(products[i]?.bid_time);
    if (bidTime < minTime) {
      minTime = bidTime;
    }
  }

  const currentTime: Date = new Date();
  const timeDifferenceInSeconds: number = Math.floor(
    (currentTime.getTime() - minTime.getTime()) / 1000
  );

  return Math.abs(timeDifferenceInSeconds * 1000);
};
