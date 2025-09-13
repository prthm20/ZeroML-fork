export const evaluateModel = async (model: string | File) => {
  console.log("Evaluating model", model);
  await new Promise(r => setTimeout(r, 500));
  return { accuracy: 0.85 };
};