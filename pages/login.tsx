import { useRouter } from "next/router";
import { GetStaticProps, NextPage } from "next/types";
import React, { useEffect } from "react";
import { auth } from "../firebase";

const Login: NextPage<{ userProtected: boolean }> = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (props.userProtected && auth.currentUser) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);

  return <div>login</div>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      userProtected: true,
    },
  };
};

export default Login;
