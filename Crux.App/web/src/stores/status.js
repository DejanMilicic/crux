export const initial = () => {
  return { isLoading: false, isFailed: false, loadedText: "", isLoaded: false };
};

export const loading = () => {
  return { isLoading: true, isFailed: false, loadedText: "communicating...", isLoaded: false };
};

export const loaded = () => {
  return { isLoading: false, isFailed: false, loadedText: "finished", isLoaded: true };
};

export const failed = message => {
  return { isLoading: false, isFailed: true, loadedText: message, isLoaded: false };
};
