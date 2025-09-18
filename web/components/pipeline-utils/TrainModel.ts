export const trainModel = async (cleanedData: string | File) => {
  console.log("Training model on", cleanedData);
  await new Promise(r => setTimeout(r, 1000));
  return { model: "RandomForest", trained: true };
};
