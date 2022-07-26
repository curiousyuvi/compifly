import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React, { ReactNode } from "react";

const DesktopNavlink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    <Link href={href}>
      <Button variant="link" textColor="ButtonText">
        {children}
      </Button>
    </Link>
  );
};

export default DesktopNavlink;
