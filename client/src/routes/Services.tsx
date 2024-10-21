import Footer from "../components/Footer";
import GeminiComponent from "../components/GeminiApi";
import { services } from "../lib/servicesList";

function Services() {


  const handleSubmit = () => {
    const message = "Do you want to confirm the booking ?";
    
    // Show confirmation dialog
    const userConfirmed = window.confirm(message);
  
    // Check user's response
    if (userConfirmed) {
      alert("Thank you for your confirmation! \n You will recieve a callback shortly"); // Alert if user clicks "Yes"
    } else {
      alert("You canceled the booking."); // Alert if user clicks "No"
    }
  };
  

  return (
    <div className="min-h-screen relative bg-slate-800 text-gray-300">
      <div className="container w-3/4 mx-auto p-4">
        {services.map((card, i) => (
          <div key={i}>
            <div className="cardContainer flex justify-between my-6 pb-6">
              <div className="textContainer flex flex-col gap-y-3">
                <h1 className="text-2xl font-bold text-yellow-400">{card.title}</h1>
                <ol className="list-disc pl-5">
                  <li>{card.description.desc1}</li>
                  <li>{card.description.desc2}</li>
                  <li>{card.description.desc3}</li>
                  <li> Rupees : {card.price}</li>
                </ol>
              </div>
              <div className="buttonContainer">
                <button className="p-3 rounded-xl text-gray-200 bg-red-500" onClick={handleSubmit}>
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
