import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Adjust animation duration
      offset: 100, // Starts animation by specified pixels farther before the element enters the viewport
      once: false, // Set to false to trigger on every scroll up and down
    });
    AOS.refresh(); // Ensure AOS is aware of any new elements or content
  }, []);

  return (
    <div className="about_container">
      {/* Hero Image Section */}
      <div
        data-aos="fade-up"
        className="image_container h-[80vh] overflow-hidden relative"
      >
        <img
          src="about.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center text-white px-5">
          <p className="text-3xl font-medium hidden xl:flex font-sans mt-4 absolute left-96 top-1/2 transform -translate-y-1/2">
            A Solution for all your problems.
          </p>
        </div>
      </div>

      <div className="w-3/4 mx-auto ">
        <div
          data-aos="fade-left"
          className="carenest flex flex-col lg:flex-row box-border rounded-lg mt-20 lg:space-x-10"
        >
          <div className="imageContainer w-full lg:w-1/2 flex items-center">
            <img
              src="Elder-care-dubai.webp"
              alt="CareNest Overview"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="textContainer w-full lg:w-1/2 p-4 lg:mt-0 mt-6 lg:space-y-10">
            <h1 className="text-red-500 lg:text-6xl text-4xl font-serif">
              Who We Are
            </h1>
            <p className="text-wrap text-xl leading-relaxed ">
              Carenest is not just an elder care service; it is a celebration of
              love, respect, and appreciation for the ones who paved the way for
              us. We are here to provide your parents with support,
              companionship, and professional care, so you can rest easy,
              knowing that they are in loving and capable hands. After all those
              who made us deserve nothing but the best!
            </p>
          </div>
        </div>
      </div>

      <div
        className="testimonialContainer w-3/4 mx-auto flex flex-col lg:flex-row justify-between items-stretch lg:space-x-10 mt-20 space-y-6 lg:space-y-0"
        data-aos="fade-right"
      >
        <div className="w-full lg:w-1/3 border border-gray-300 p-5 shadow-lg space-y-6 rounded-lg bg-gray-100 flex flex-col">
          <div className="imgContainer flex justify-between items-center">
            <img src="forbes.png" alt="" className="w-1/2" />
            <button className="p-2 text-white bg-blue-500 rounded-lg min-w-[80px] text-sm lg:text-base">
              Featured
            </button>
          </div>
          <p className="text-wrap text-lg text-blue-800 font-bold font-serif">
            JUNE 2019 A special presentation complimentary with Forbes to Care24
          </p>
          <p className="font-thin">
            Forbes India Marquee, a marketing initiative, is a complimentary
            supplement for … automation and the rise in health and wellness.
            Care24 was started in 2014 by IIT Kanpur alumni Vipin Pathak and.
          </p>
        </div>

        <div className="w-full lg:w-1/3 border border-gray-300 p-5 shadow-lg space-y-6 rounded-lg bg-gray-100 flex flex-col">
          <div className="imgContainer flex justify-between items-center">
            <img src="economic.png" alt="" className="w-1/2" />
            <button className="p-2 text-white bg-blue-500 rounded-lg min-w-[80px] text-sm lg:text-base">
              Featured
            </button>
          </div>
          <p className="text-wrap text-lg text-blue-800 font-bold font-serif">
            Home caregiving thrives but talent needs to keep pace
          </p>
          <p className="font-thin">
            Proud to announce that Care24 is in a spree of market penetration as
            we have hired 3,000 – 5,000 caregiving staff in Mumbai and Delhi,
            determined to serve everyone who needs care.
          </p>
        </div>

        <div className="w-full lg:w-1/3 border border-gray-300 p-5 shadow-lg space-y-6 rounded-lg bg-gray-100 flex flex-col">
          <div className="imgContainer flex justify-between items-center">
            <img src="financial.png" alt="" className="w-1/2" />
            <button className="p-2 text-white bg-blue-500 rounded-lg min-w-[80px] text-sm lg:text-base">
              Featured
            </button>
          </div>
          <p className="text-wrap text-lg text-blue-800 font-bold font-serif">
            Mumbai-based healthcare start-up in talks with investors to raise
            funds.
          </p>
          <p className="font-thin text-black">
            Care24 operates in Mumbai and Delhi. It raised $350,000 from India
            Quotient in 2015 and $4 million from SAIF Partners in 2016 and till
            date has raised $4.5 million.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
