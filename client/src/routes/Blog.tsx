import axios from "axios";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useInView } from "react-intersection-observer";
import GeminiComponent from "../components/GeminiApi";

type Article = {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

function Blog() {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const apiKey = '4a7222c4341d4c63be78ef72500bca84'; 
      const response = await axios.get(`https://newsapi.org/v2/everything?q=health&pageSize=100&apiKey=${apiKey}`);
      setBlogs(response.data.articles); // Set all blogs at once
    } catch (error: any) {
      console.error("Error getting blog data:", error.response?.data || error.message);
      setError("Failed to load blog data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Fetch all blogs on component mount
  }, []); // Empty dependency array means it runs once when the component mounts

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []); // Initialize AOS when component mounts

  // Create a component that uses useInView
  const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <img
        ref={ref}
        src={inView ? src : 'fallback-image-url.jpg'} // Lazy load image
        alt={alt}
        className="w-full h-48 object-cover"
      />
    );
  };

  return (
    <div className="container mx-auto p-6 relative">
      {error && (
        <div className="text-center mt-8 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center mt-8">
          <p>Loading...</p> {/* Consider using a spinner or loading animation */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
              data-aos="fade-up" // Apply AOS to each card
            >
              <LazyImage src={blog.urlToImage} alt={blog.title} />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{blog.description}</p>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <GeminiComponent />
    </div>
  );
}

export default Blog;
