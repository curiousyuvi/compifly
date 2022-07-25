import { Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingLayout = () => {
  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center overflow-y-auto">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="white"
        color={"green.500"}
        size="xl"
      />
    </div>
  );
};

export default LoadingLayout;
