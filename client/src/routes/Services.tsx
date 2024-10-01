import Footer from "../components/Footer";
import GeminiComponent from "../components/GeminiApi";
import { servies } from "../lib/servicesList";

function Services() {
  return (
    <div className="min-h-screen relative bg-light-gradient-6">
      <div className="container w-3/4 mx-auto p-4">
        {servies.map((card, i) => (
          <div key={i}>
            <div className="cardContainer flex justify-between my-6 pb-6">
              <div className="textContainer flex flex-col gap-y-3">
                <h1 className="text-2xl font-bold">{card.title}</h1>
                <ol className="list-disc pl-5">
                  <li>{card.description.desc1}</li>
                  <li>{card.description.desc2}</li>
                  <li>{card.description.desc3}</li>
                </ol>
              </div>
              <div className="buttonContainer">
                <button className="p-3 rounded-xl text-white bg-red-500">
                  Book Service
                </button>
              </div>
            </div>
            {/* Gray Border Below Each Card */}
            <div className="border-b-2 border-gray-300"></div>
          </div>
        ))}
      </div>
       <GeminiComponent />
      <Footer />
    </div>
  );
}

export default Services;
