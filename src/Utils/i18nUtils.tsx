export const flattenMessages = (
  nestedMessages: Record<string, string>,
  prefix: string = ""
): Record<string, string> =>
  Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      messages[prefixedKey] = value; // eslint-disable-line
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {} as Record<string, string>);
