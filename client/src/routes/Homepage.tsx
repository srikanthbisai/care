import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import GeminiComponent from "../components/GeminiApi";

function HomePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: false,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="homepage_container relative bg-gray-50 overflow-x-hidden"> {/* Prevent horizontal overflow */}
      {/* Hero Image Section */}
      <div
        data-aos="fade-up"
        className="image_container h-[80vh] overflow-hidden relative"
      >
        <img
          src="background1.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover brightness-75" // Added brightness for contrast
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-5xl font-bold font-serif drop-shadow-md">
            Welcome to CareNest
          </h1>
          <p className=" text-blue-200 text-xl font-medium text-center font-sans mt-4">
            A platform to help you find the perfect homecare
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="flex flex-col items-center pt-20 pb-10 benefits_container bg-light-gradient-6">
        <p className="text-4xl font-serif text-center">
          Benefits of Home Care
        </p>
        <div className="container flex flex-wrap items-center justify-center mt-6 md:space-x-10 gap-4">
          {[
            {
              title: "Faster Recovery",
              description:
                "In-home elder care services are proven to promote recovery.",
              bulletPoints: [
                "Personalized care plans tailored to individual needs.",
                "Familiar and comfortable environment for healing.",
                "Access to medical professionals without hospital visits.",
              ],
            },
            {
              title: "Reduced Health Hazards",
              description:
                "Assistance for seniors at home reduces instances of hospitalization.",
              bulletPoints: [
                "Regular monitoring of health conditions.",
                "Immediate response to emergencies.",
                "Reduced risk of infections associated with hospitals.",
              ],
            },
            {
              title: "Cost Effective",
              description:
                "Get affordable, professional care in the comfort of home.",
              bulletPoints: [
                "No transportation costs for hospital visits.",
                "Flexible pricing based on care needs.",
                "Potential savings on medication and treatment.",
              ],
            },
          ].map((benefit, index) => (
            <div
              data-aos="fade-up"
              key={index}
              className="text-black bg-custom-gradient-7 border shadow-lg border-gray-200 w-full md:w-1/4 space-y-4 h-[25vh] rounded-lg transform hover:scale-105 transition-transform duration-300  p-4"
            >
              <h3 className="text-xl font-bold">{benefit.title}</h3>
              <p className="text-md">{benefit.description}</p>
              <ul className="list-disc pl-5 text-sm">
                {benefit.bulletPoints.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CareNest Sections */}
        <div className="w-3/4 mx-auto mt-20">
          {/* First CareNest Block */}
          <div
            data-aos="fade-up-right"
            className="carenest flex flex-col lg:flex-row box-border rounded-lg mt-20 lg:space-x-10"
          >
            <div className="imageContainer w-full lg:w-1/2 flex items-center">
              <img
                src="background3.jpg"
                alt="CareNest Overview"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="textContainer w-full lg:w-1/2 p-6 mt-10 lg:mt-0 lg:ml-10 lg:space-y-6">
              <h1 className="text-red-500 text-3xl lg:text-5xl font-serif">
                What is CareNest
              </h1>
              <h3 className="mt-6 text-2xl lg:text-3xl font-bold text-black">
                Your Extended Family
              </h3>
              <p className="text-wrap text-base lg:text-xl leading-relaxed">
                We are India's most trusted senior care brand offering holistic
                care and services at home for individuals 55+ years of age.
              </p>
              <Link to="/about">
                <button className="p-3 text-base lg:text-xl bg-red-500 text-white rounded-full mt-6 hover:bg-red-600 transition duration-200">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Second CareNest Block */}
          <div
            data-aos="fade-up-left"
            className="carenest flex flex-col lg:flex-row box-border rounded-lg mt-20 lg:space-x-32"
          >
            <div className="textContainer w-full lg:w-1/2 p-6 lg:pr-10">
              <h1 className="text-red-500 text-3xl lg:text-5xl font-serif">
                Get Expert Care, Right at Home
              </h1>
              <p className="text-wrap text-base lg:text-xl leading-relaxed mt-6">
                With age comes an increased risk of falls, chronic conditions,
                and feelings of isolation. But age also brings a desire to enjoy
                good health and do the things you’ve always wanted to do.
              </p>
              <Link to="/services">
                <button className="p-3 text-base lg:text-xl bg-red-500 text-white rounded-full mt-6 hover:bg-red-600 transition duration-200">
                  Explore Services
                </button>
              </Link>
            </div>
            <div className="imageContainer w-full lg:w-1/2 flex items-center mt-6 lg:mt-0">
              <img
                src="Wellspring8.jpg"
                alt="CareNest Services"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Third CareNest Block */}
          <div
            data-aos="fade-up-right"
            className="carenest flex flex-col lg:flex-row box-border rounded-lg mt-20 lg:space-x-10"
          >
            <div className="imageContainer w-full lg:w-1/2 flex items-center">
              <img
                src="Elder-care-dubai.webp"
                alt="CareNest Plans"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="textContainer w-full lg:w-1/2 p-6 mt-10 lg:mt-0 lg:ml-10 lg:space-y-6">
              <h1 className="text-red-500 text-3xl lg:text-5xl font-serif">
                How Can We Help?
              </h1>
              <p className="text-wrap text-base lg:text-xl leading-relaxed">
                Depending on your parents’ level of need, you can choose one of
                our holistic membership plans to get more comprehensive care and
                proactive health monitoring. You can add-on plans based on your
                specific needs.
              </p>
              <Link to="/plans">
                <button className="p-3 text-base lg:text-xl bg-red-500 text-white rounded-full mt-6 hover:bg-red-600 transition duration-200">
                  Explore Plans
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Chatbot component at bottom right */}
      <GeminiComponent />
    </div>
  );
}

export default HomePage;
