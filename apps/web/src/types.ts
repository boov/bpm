export type Target = "_self" | "_blank" | "_parent" | "_top" | (string & {});

export interface ButtonProps {
  variant?: "outline" | "solid" | "text";
  label: string;
  class?: string;
  href?: string;
  id?: string;
  name?: string;
  palette?: "action" | "bold";
  target?: Target;
  type?: "submit" | "reset" | "button" | "anchor";
}
