import merge from "lodash/merge";
import theme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const rem = (value: number): string => `${value}rem`;
const removeNonNumeric = (input: string): number => Number(input.replace(/[^0-9.]/g, ""));
const round = (value: number, accuracy: number = 1000): number => Math.round((value + Number.EPSILON) * accuracy) / accuracy;

type FontEntry = [string, { lineHeight: number }];

const magicTypography = (input: Record<string, number> = {}, ratio: number = 1.2, lineHeightRange: number[] = [1.2, 1.6]): Record<string, FontEntry> => {
  const exponents = Object.values(input).sort((a, b) => b - a);

  const minFontSize = Math.pow(ratio, Math.min(...exponents));
  const maxFontSize = Math.pow(ratio, Math.max(...exponents));

  const minLineHeight = Math.min(...lineHeightRange);
  const maxLineHeight = Math.max(...lineHeightRange);

  const exponentDiff = maxFontSize - minFontSize;
  const lineHeightDiff = maxLineHeight - minLineHeight;

  const returnObject: Record<string, FontEntry> = {};

  for (const [name, exponent] of Object.entries(input)) {
    const fontSize = Math.pow(ratio, exponent);
    const lineHeight = maxLineHeight - lineHeightDiff * ((fontSize - minFontSize) / exponentDiff);

    returnObject[name] = [rem(round(fontSize)), { lineHeight: round(lineHeight) }];
  }

  return returnObject;
};

interface Options {
  container: {
    defaultWidth: string;
    padding: string;
  };
  gridColumns: {
    count: number;
    width: string;
    gutter: string;
  };
}

const defaults: Options = {
  container: {
    defaultWidth: "12c",
    padding: "5vw"
  },
  gridColumns: {
    count: 16,
    width: theme.spacing[20],
    gutter: theme.spacing[8]
  }
};

const buildGridColumns = (options: Options): Record<string, string> => {
  const width = removeNonNumeric(options.gridColumns.width);
  const gutter = removeNonNumeric(options.gridColumns.gutter);

  return Array.from({ length: options.gridColumns.count }, (_, i) => i).reduce<Record<string, string>>((acc, index) => {
    acc[`${index + 1}c`] = rem((index + 1) * width + index * gutter);
    return acc;
  }, {});
};

const designSystem = plugin.withOptions<Partial<Options>>(
  (options = {}) => {
    const merged: Options = merge({}, defaults, options);

    return ({ matchComponents, theme }) => {
      matchComponents(
        {
          container: value => ({
            "--container-width": value,
            "--container-padding": merged.container.padding,
            marginLeft: theme("margin.auto"),
            marginRight: theme("margin.auto"),
            maxWidth: "calc(var(--container-width) + (var(--container-padding) * 2));",
            paddingLeft: "max(var(--container-padding), theme('spacing.7'))",
            paddingRight: "max(var(--container-padding), theme('spacing.7'))",
            width: theme("width.full")
          })
        },
        { values: theme("container") }
      );
    };
  },
  (options = {}) => {
    const merged: Options = merge({}, defaults, options);
    const gridColumns = buildGridColumns(merged);

    return {
      theme: {
        extend: {
          gridTemplateColumns: {
            container: `1fr minmax(0, ${gridColumns[merged.container.defaultWidth]}) 1fr`
          },
          spacing: {
            ...gridColumns
          }
        },
        container: {
          DEFAULT: gridColumns[merged.container.defaultWidth],
          full: "100%",
          ...gridColumns
        }
      }
    };
  }
);

export default designSystem;

export { designSystem, magicTypography };
