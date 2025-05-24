type Transformer<T> = (
  item: T,
  index: number,
) => { value: string; label: string };

export const transformToSelectDataType = <T>(
  data: T[] | undefined,
  transformer: Transformer<T>,
) => {
  return data ? data.map((item, index) => transformer(item, index)) : [];
};
