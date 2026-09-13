import Landing from "./components/landing-section";
import GalaxyBackground from "./components/galaxy-background";
import About from "./components/about-section";
import LottieBg from "./components/lottie-bg";
import CodeEditorCard from "./components/events-section";
import Participate from "./components/participate";
import Register from "./components/register";
import Location from "./components/location";

export default function Home() {
  return (
    <>

      <div className="z-9 absolute bg-[#000000]">
        {/* <GalaxyBackground /> */}
        <LottieBg />
      </div>
      <div className="z-10 m-0 p-0 ">
        <Landing />
      </div>
      <img src="/icon-wavedrop.png" className="w-[100vw] wavedrop-img" />
      <div className="z-9 mx-25 mt-20 ">
        <CodeEditorCard />
      </div>
      <div className="z-9 mx-25">
        <About />
      </div>
      <div className="z-10 mx-0">
        <Register />
      </div>
      <div className="z-10 mx-0">
    <Location/>
      </div>

    </>
  );
}
