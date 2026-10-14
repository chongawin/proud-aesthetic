type PlayIconProps = {
  className?: string;
};

export default function PlayIcon({ className }: PlayIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M7 4.8v14.4L19 12 7 4.8z" />
    </svg>
  );
}