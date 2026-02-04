declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean | string;
        "auto-rotate"?: boolean | string;
        "camera-orbit"?: string;
        "min-field-of-view"?: string;
        "max-field-of-view"?: string;
        style?: React.CSSProperties;
      },
      HTMLElement
    >;
  }
}
