const MinusCircle: SVGComponent = (props) => (
  <svg
    width="100%"
    height="100%"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
export default MinusCircle;
