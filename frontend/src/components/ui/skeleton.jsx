import React from 'react';

const Skeleton = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      className={`skeleton ${className}`}
      {...props}
      ref={ref}
    />
  );
});

Skeleton.displayName = "Skeleton";

export { Skeleton };
