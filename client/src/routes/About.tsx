import { useEffect } from "react";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import Marquee from "react-marquee-slider"; 
import { FaAmazon, FaApple, FaAtlassian, FaFacebook, FaGoogle, FaMicrosoft, FaSpotify } from "react-icons/fa";

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100, 
      once: false, 
    });
    AOS.refresh(); 
  }, []);

  return (
    <div className="about_container bg-slate-800">
      {/* Hero Image Section */}



      <div className="w-3/4 mx-auto ">
        <div
          className="carenest flex flex-col lg:flex-row box-border rounded-lg pt-20 lg:space-x-10"
        >
          <div className="imageContainer w-full lg:w-1/2 flex items-center" data-aos="fade-right">
            <img
              src="/doctor-patient.webp"
              alt="CareNest Overview"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="textContainer w-full lg:w-1/2 p-4 lg:mt-0 mt-6 lg:space-y-10" data-aos="fade-left">
            <h1 className="lg:text-6xl text-4xl font-serif text-neutral-400">
              Who We Are
            </h1>
            <p className="text-wrap text-lg leading-relaxed text-white">
              Carenest is not just a self service; it is a celebration of
              love, respect, and appreciation for the ones who paved the way for
              us. We are here to provide you with support,
              companionship, and professional care, so you can rest easy,
              knowing that they are in loving and capable hands. After all those
              who made us deserve nothing but the best!
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-md bg-slate-800 pt-20">
        <h1 className="text-center text-2xl font-bold font-serif tracking-wider p-8 text-blue-500">OUR SPONSORS</h1>
        <div className="overflow-hidden py-4 mx-auto w-3/4 rounded-sm" style={{paddingTop:"30px", paddingBottom:"30px"}}>
          <Marquee
            velocity={35}
            direction="ltr" 
            scatterRandomly={false} 
            resetAfterTries={1} 
            onInit={() => {}} 
            onFinish={() => {}} 
          >
            {[
              { name: "Google", icon: <FaGoogle className="h-10 w-10 text-orange-500"/>, },
              { name: "Atlassian", icon: <FaAtlassian className="h-10 w-10 text-orange-500" /> },
              { name: "Microsoft", icon: <FaMicrosoft className="h-10 w-10 text-orange-500" /> },
              { name: "Amazon", icon: <FaAmazon className="h-10 w-10 text-orange-500" /> },
              { name: "Facebook", icon: <FaFacebook className="h-10 w-10 text-orange-500" /> },
              { name: "Apple", icon: <FaApple className="h-10 w-10 text-orange-500" /> },
              { name: "Spotify", icon: <FaSpotify className="h-10 w-10 text-orange-500" /> },
            ].map((company, index) => (
              <div key={index} className="mx-10 flex items-center text-red-400">
                {company.icon}
              </div>
            ))}
          </Marquee>
        </div>
      </div>

   
   <div className="flex flex-col pt-20">
      <div className="testimonialContainer w-3/4 mx-auto flex flex-col lg:flex-row justify-between items-stretch lg:space-x-10 space-y-6 lg:space-y-0 pb-10"
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
            JUNE 2019 A special presentation complimentary with Forbes to CareNest
          </p>
          <p className="font-thin">
            Forbes India Marquee, a marketing initiative, is a complimentary
            supplement for … automation and the rise in health and wellness.
            CareNest was started in 2014 by IIT Kanpur alumni Vipin Pathak and.
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
            CareNest operates in Mumbai and Delhi. It raised $350,000 from India
            Quotient in 2015 and $4 million from SAIF Partners in 2016 and till
            date has raised $4.5 million.
          </p>
        </div>
      </div>

      </div>



      

      <Footer />
    </div>
  );
}

export default About;
