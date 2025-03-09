export function extractKeyValue(errorMessage: string) {
  const regex = /Key \((.*?)\)=\((.*?)\) already exists\./;
  const match = errorMessage.match(regex);

  if (match) {
    return {
      field: match[1],
      value: match[2],
    };
  }
  return null;
}
