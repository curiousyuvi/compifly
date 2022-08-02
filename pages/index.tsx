import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import "@fontsource/rubik-mono-one";
import Typical from "react-typical";
import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";
import { useEffect, useRef } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import LandingLayout from "../components/LandingLayout";
import useUser from "../hooks/useUser";
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
            )} flex items-center py-[12rem]`}
          >
            <div className="w-2/3 text-5xl flex flex-col items-center">
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
            <div className="h-[45rem] w-[45rem] absolute right-[10rem] top-[5rem]">
              <Image src="/logo-art.png" alt="" layout="fill" />
            </div>
          </div>
          <div className="my-20" />
          <div className="w-full flex flex-col justify-center items-center">
            <Text className="text-4xl">What can I do here?</Text>
            <span className="my-4" />
            <BiChevronDown
              className="text-8xl animate-bounce"
              onClick={handleBelowPitchClick}
            />
          </div>
        </div>
        {/* PROFILE SECTION */}
        <div ref={belowSectionRef} />
        <div className="w-full max-w-6xl">
          <div className="my-36" />
          <div className="w-full relative">
            <div className="w-full flex items-center p-4 px-8 bg-gradient-to-r from-pink-700 to-pink-400 rounded-2xl drop-shadow-xl">
              <Text className="leading-snug text-4xl" color="white">
                {
                  "Create your profile and showcase your competitive 🦾 prowess through badges."
                }
              </Text>
              <div className="h-[20rem] w-[30rem]"></div>
            </div>
            <div
              className="h-[28rem] w-[28rem] absolute top-[-5rem] right-[-2rem]"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <Image src="/profile-intro.png" alt="" layout="fill" />
            </div>
          </div>
          {/* FRIEND SECTION */}
          <div className="my-32" />
          <div className="w-full relative">
            <div className="w-full flex items-center p-4 px-8 bg-gradient-to-r from-indigo-700 to-indigo-400 rounded-2xl drop-shadow-xl">
              <Text className="leading-snug text-4xl" color="white">
                {
                  "View others profile, see their ratings and title and add them as friends."
                }
              </Text>
              <div className="h-[20rem] w-[30rem]"></div>
            </div>
            <div
              className="h-[28rem] w-[28rem] absolute top-[-5rem] right-[-4rem]"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <Image src="/friend-intro.png" alt="" layout="fill" />
            </div>
          </div>
          {/* RANKING SECTION */}
          <div className="my-32" />
          <div className="w-full relative">
            <div className="w-full flex items-center p-4 px-8 bg-gradient-to-r from-yellow-700 to-yellow-400 rounded-2xl drop-shadow-xl">
              <Text className="leading-snug text-4xl" color="white">
                {
                  "See ranking among your friends and show them who's the alpha."
                }
              </Text>
              <div className="h-[20rem] w-[30rem]"></div>
            </div>
            <div
              className="h-[28rem] w-[28rem] absolute top-[-5rem] right-[-2rem]"
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
