"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = React.ComponentProps<typeof Link>;

export default function ActiveLink({ href, className, children, ...rest }: Props) {
  const pathname = usePathname();

  const hrefStr =
    typeof href === "string" ? href : (href as any)?.pathname ?? "";

  const isActive =
    hrefStr !== "#" && (pathname === hrefStr || pathname.startsWith(hrefStr + "/"));

  const combined = `${className ?? ""} ${isActive ? "active" : ""}`.trim();

  return (
    <Link href={href} className={combined} {...rest}>
      {children}
    </Link>
  );
}
