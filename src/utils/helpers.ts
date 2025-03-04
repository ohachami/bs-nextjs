function findNextStepCode(
  codesListByOrder: string[] | undefined,
  currentCode: string | undefined
): string | undefined {
  // if list of codes is not empty
  if (codesListByOrder && codesListByOrder.length > 0) {
    const codeIndex = codesListByOrder.findIndex(
      (code) => code === currentCode
    );
    // if code is found in the list of codes
    if (codeIndex !== -1) {
      // if it's not the last index on the list (the last step code)
      // we return the next code (incrementing indexex by one)
      if (codeIndex !== codesListByOrder.length - 1)
        return codesListByOrder[codeIndex + 1];
    }
  }
  return currentCode;
}

export { findNextStepCode };
