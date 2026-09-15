import Landing from "./components/landing-section";
import GalaxyBackground from "./components/galaxy-background";
import About from "./components/about-section";
import LottieBg from "./components/lottie-bg";
import CodeEditorCard from "./components/events-section";
import Participate from "./components/participate";
import Register from "./components/register";
import Location from "./components/location";
import Broucher from "./components/broucher-section";

export default function Home() {
  return (
    <>

      <div className="absolute top-0 left-0 w-full h-[90vh] overflow-hidden pointer-events-none z-0 bg-black">
        {/* <GalaxyBackground /> */}
        <LottieBg />
      </div>
      <div className="relative z-10 m-0 p-0">
        <Landing />
      </div>
      <img src="/icon-wavedrop.png" className="w-full wavedrop-img" alt="" />
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-24 mt-12 sm:mt-20">
        <CodeEditorCard />
      </div>
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-24">
        <About />
      </div>
      <div className="mx-0">
        <Register />
      </div>
      <div className="mx-0">
        <Location />
      </div>
      <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-24">
        <Broucher />
      </div>
    </>
    );
}
