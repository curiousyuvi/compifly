import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import type { NextPage } from "next";
import "@fontsource/rubik-mono-one";
import Typical from "react-typical";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";
import { useEffect, useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import LandingLayout from "../components/LandingLayout";
import { auth } from "../firebase";
import Link from "next/link";

const Home: NextPage = () => {
  const belowSectionRef = useRef<HTMLDivElement>(null);
  const handleBelowPitchClick = () => {
    belowSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    Aos.init({
      once: true,
    });
  });
  return (
    <LandingLayout>
      <div className="w-full h-full flex flex-col items-center">
        {/* PITCH SECTION */}
        <div className="w-full h-screen relative">
          <div
            className={`w-full ${useColorModeValue(
              "bg-violet-400",
              "bg-violet-600"
            )} flex justify-center md:justify-start text-center md:text-start items-center p-4 py-[12rem]`}
          >
            <div className="w-full lg:w-2/3 text-2xl md:text-3xl lg:text-4xl xl:text-5xl flex flex-col items-center">
              <Text className="leading-snug text-center" color="white">
                A social media app for
              </Text>
              <div
                className={`w-full flex justify-center font-extrabold ${useColorModeValue(
                  "text-green-300",
                  "text-green-400"
                )}`}
              >
                <Typical
                  steps={["Competitive Programmers", 1000]}
                  loop={Infinity}
                  wrapper="p"
                />
              </div>
              <span className="my-8" />
              {!auth.currentUser ? (
                <Link href="/register">
                  <Button
                    className="w-full max-w-sm p-2"
                    height="14"
                    bgColor="green.400"
                    color="white"
                    fontWeight="bold"
                  >
                    GET STARTED
                  </Button>
                </Link>
              ) : (
                <></>
              )}
            </div>
            <div className="hidden lg:flex md:h-[20rem] md:w-[20rem] lg:h-[30rem] lg:w-[30rem] xl:h-[35rem] xl:w-[35rem] 2xl:h-[45rem] 2xl:w-[45rem] absolute  right-[2rem] top-[10rem] 2xl:top-[5rem]">
              <Image src="/logo-art.png" alt="" layout="fill" />
            </div>
          </div>
          <div className="my-20" />
          <div className="w-full flex flex-col justify-center items-center">
            <Text className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              What can I do here?
            </Text>
            <span className="my-4" />
            <BiChevronDown
              className="text-8xl animate-bounce"
              onClick={handleBelowPitchClick}
            />
          </div>
        </div>
        {/* PROFILE SECTION */}
        <div ref={belowSectionRef} />
        <div className="w-full max-w-6xl px-6 py-2">
          <div className="my-36" />
          <div className="w-full relative flex flex-col items-center">
            <div className="w-full flex flex-col-reverse md:flex-row items-center p-8 bg-gradient-to-t md:bg-gradient-to-r from-pink-700 to-pink-400 rounded-2xl drop-shadow-xl">
              <Text
                className="leading-snug text-lg md:text-xl lg:text-2xl xl:text-3xl"
                color="white"
              >
                {
                  "Create your profile and showcase your competitive 🦾 prowess through badges."
                }
              </Text>
              <div className="h-[10rem] w-[3rem] md:h-[18rem] md:w-[30rem]" />
            </div>
            <div
              className="h-[18rem] w-[18rem] md:h-[24rem] md:w-[24rem] lg:h-[28rem] lg:w-[28rem] absolute top-[-6rem] md:top-[-5rem] md:right-[-2rem]"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <Image src="/profile-intro.png" alt="" layout="fill" />
            </div>
          </div>
          {/* FRIEND SECTION */}
          <div className="my-32" />
          <div className="w-full relative flex flex-col items-center">
            <div className="w-full flex flex-col-reverse md:flex-row items-center p-8 bg-gradient-to-t md:bg-gradient-to-r from-indigo-700 to-indigo-400 rounded-2xl drop-shadow-xl">
              <Text
                className="leading-snug text-lg md:text-xl lg:text-2xl xl:text-3xl"
                color="white"
              >
                {
                  "View others profile, see their ratings and title and add them as friends."
                }
              </Text>
              <div className="h-[10rem] w-[3rem] md:h-[18rem] md:w-[30rem]" />
            </div>
            <div
              className="h-[18rem] w-[18rem] md:h-[24rem] md:w-[24rem] lg:h-[28rem] lg:w-[28rem] absolute top-[-6rem] md:top-[-5rem] md:right-[-2rem]"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <Image src="/friend-intro.png" alt="" layout="fill" />
            </div>
          </div>
          {/* RANKING SECTION */}
          <div className="my-32" />
          <div className="w-full relative flex flex-col items-center">
            <div className="w-full flex flex-col-reverse md:flex-row items-center p-8 bg-gradient-to-t md:bg-gradient-to-r from-yellow-700 to-yellow-400 rounded-2xl drop-shadow-xl">
              <Text
                className="leading-snug text-lg md:text-xl lg:text-2xl xl:text-3xl"
                color="white"
              >
                {
                  "See ranking among your friends and show them who's the alpha."
                }
              </Text>
              <div className="h-[10rem] w-[3rem] md:h-[18rem] md:w-[30rem]" />
            </div>
            <div
              className="h-[18rem] w-[18rem] md:h-[24rem] md:w-[24rem] lg:h-[28rem] lg:w-[28rem] absolute top-[-6rem] md:top-[-5rem] md:right-[-2rem]"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <Image src="/ranking-intro.png" alt="" layout="fill" />
            </div>
          </div>
          <div className="my-32" />
        </div>
      </div>
    </LandingLayout>
  );
};

export default Home;
