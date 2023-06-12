import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  className = "",
  children,
}) => {
  return (
    <Link href={href} className={`link ${className}`}>
      {children}
      <span className="ml-2">&#10132;</span>
    </Link>
  );
};

export default LinkButton;
