export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toISOString().split("T")[0];
};
