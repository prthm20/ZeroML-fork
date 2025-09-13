export const cleanData = async (data: string | File) => {
  console.log("Cleaning data", data);
  await new Promise(r => setTimeout(r, 500)); // fake delay
  return { cleaned: true, data };
};