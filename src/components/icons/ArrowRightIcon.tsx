type ArrowRightIconProps = {
  className?: string;
};

export default function ArrowRightIcon({ className }: ArrowRightIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}