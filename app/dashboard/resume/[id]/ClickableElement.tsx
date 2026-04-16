"use client";
import { ReactNode } from "react";

interface ClickableElementProps {
  id: string;
  url: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ClickableElement = ({
  id,
  url,
  children,
  className,
  onClick,
}: ClickableElementProps) => {
  return (
    <div
      id={id}
      data-clickable="true"
      data-url={url}
      className={`${className}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {children}
    </div>
  );
};

// "use client";

// import { ReactNode, useState } from "react";

// interface ClickableElementProps {
//   id: string;
//   url: string;
//   children: ReactNode;
//   className?: string;
//   showAsLink?: boolean; // Add this to control visual styling
// }

// export const ClickableElement = ({
//   id,
//   url,
//   children,
//   className,
//   showAsLink = true, // Default to showing as link
// }: ClickableElementProps) => {
//   const [isHovered, setIsHovered] = useState(false);

//   // Only apply visual link styles in preview mode (not in PDF export)
//   const linkStyles = showAsLink
//     ? {
//         cursor: "pointer",
//         textDecoration: "underline",
//         textDecorationStyle: "dotted",
//         textDecorationColor: "#3b82f6",
//         transition: "all 0.2s ease",
//         ...(isHovered && {
//           textDecorationColor: "#2563eb",
//           textDecorationThickness: "2px",
//           backgroundColor: "#eff6ff",
//         }),
//       }
//     : {};

//   return (
//     <div
//       id={id}
//       data-clickable="true"
//       data-url={url}
//       className={className}
//       style={linkStyles}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={() => window.open(url, "_blank")}
//     >
//       {children}
//     </div>
//   );
// };
