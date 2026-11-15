import React from "react";
import classNames from "classnames";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  radius?: number | string;
  style?: React.CSSProperties;
}

export function GlassPanel({
  children,
  className,
  radius = 24,
  style,
  ...props
}: GlassPanelProps) {
  const customStyle: React.CSSProperties = {
    borderRadius: typeof radius === "number" ? `${radius}px` : radius,
    ...style,
  };

  return (
    <div className={classNames("glass", className)} style={customStyle} {...props}>
      {children}
    </div>
  );
}
