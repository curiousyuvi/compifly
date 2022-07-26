import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

const MobileNavlink = ({
  href,
  idleIcon,
  activeIcon,
}: {
  href: string;
  idleIcon: ReactNode;
  activeIcon: ReactNode;
}) => {
  const router = useRouter();
  return (
    <Link href={href} className="text-6xl">
      {router.pathname === href ? activeIcon : idleIcon}
    </Link>
  );
};

export default MobileNavlink;
