//* Sizes from here
// https://tailwindcss.com/docs/breakpoints

const sizes: Record<string, number> = {
  small: 0.5,
  regular: 1,
  large: 2,
  xl: 3,
};

type Sizes = "small" | "regular" | "large" | "xl";

export const mq = (n: Sizes) => {
  const bpArray = Object.keys(sizes).map((key) => [key, sizes[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (min-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

export const textSize = (size: Sizes) => {
  return sizes[size];
};
