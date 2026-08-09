import { asMap, asString, type DesignMap, type DesignValue } from "./design-source.ts";

export type ContrastResult = {
  actual: number;
  background: string;
  foreground: string;
  minimum: number;
  name: string;
};

export function checkContrast(source: DesignMap) {
  const norux = asMap(source.norux, "norux");
  const accessibility = asMap(norux.accessibility, "norux.accessibility");
  const pairs = accessibility.contrast;
  if (!Array.isArray(pairs)) throw new Error("norux.accessibility.contrast must be an array.");

  return pairs.map((pair, index) => contrastResult(asMap(pair as DesignValue, `contrast[${index}]`)));
}

export function contrastRatio(foreground: string, background: string) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((left, right) => right - left);
  return (lighter + 0.05) / (darker + 0.05);
}

function contrastResult(pair: DesignMap): ContrastResult {
  const foreground = asString(pair.foreground, "contrast foreground");
  const background = asString(pair.background, "contrast background");
  const minimum = pair.minimum;
  if (typeof minimum !== "number") throw new Error("contrast minimum must be a number.");

  return {
    actual: contrastRatio(foreground, background),
    background,
    foreground,
    minimum,
    name: asString(pair.name, "contrast name")
  };
}

function luminance(color: string) {
  const values = rgb(color).map(linear);
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}

function rgb(color: string) {
  if (!/^#[\da-f]{6}$/i.test(color)) throw new Error(`Contrast checks require six-digit hex colors: ${color}.`);
  return [1, 3, 5].map((index) => Number.parseInt(color.slice(index, index + 2), 16) / 255);
}

function linear(value: number) {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}
