import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react";

function Footer() {
  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 50,
      once: false,
    });
    AOS.refresh();
  }, []);

  function ListItem({ title, items }: { title: string; items: string[] }) {
    return (
      <div data-aos="fade-down" className="w-full sm:w-1/4 mt-10">
        <ul className="space-y-4">
          <li className="text-2xl font-bold">{title}</li>
          {items.map((item, index) => (
            <li key={index} className="text-lg">{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  const aboutUsItems = [
    "About Carenest",
    "Membership",
    "Moh TV",
    "Blogs",
    "Media",
    "User Stories",
    "Franchise Partnership",
  ];

  const supportItems = [
    "Emergency Support",
    "Vas Services",
    "Contact Us",
  ];

  const termsAndPoliciesItems = [
    "Terms and Conditions",
    "Privacy Policy",
    "Cookie Policy",
    "Disclaimer",
  ];

  return (
    <div className="footer_container w-full py-10 bg-black text-orange-400">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center items-start">
        <ListItem title="About Us" items={aboutUsItems} />
        <ListItem title="Support" items={supportItems} />
        <ListItem title="Terms and Policies" items={termsAndPoliciesItems} />
        <div data-aos="fade-right" className="w-full sm:w-1/4 mt-10">
          <ul className="space-y-4">
            <li className="text-2xl font-bold">Get The App</li>
            <li>
              <img src="playstore.png" alt="Play Store" className="w-32 h-auto" />
            </li>
            <li>
              <img src="appstore.png" alt="App Store" className="w-32 h-auto" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
