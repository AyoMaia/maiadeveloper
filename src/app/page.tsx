import Image from "next/image";
import Hero from "./components/Hero";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="w-full px-10 ">
      <Header/>
      <Hero/>
      
    </div>
  );
}
