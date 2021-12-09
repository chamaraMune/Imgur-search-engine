export const sliceInputDataIntoChunks = (dataset, chunkSize) => {
  const result = [];
  if (!(Array.isArray(dataset) && Number.isInteger(chunkSize))) {
    return result;
  }

  for (let idx = 0; idx < dataset.length; idx += chunkSize) {
    const curChunk = dataset.slice(idx, idx + chunkSize);
    result.push(curChunk);
  }
  return result;
};