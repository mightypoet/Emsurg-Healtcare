import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LayoutGrid, Card } from "../components/ui/layout-grid";
import { supabase } from "../lib/supabase";

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        State-of-the-Art Cleanrooms
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Our ISO-certified cleanrooms ensure the highest level of sterility for the manufacturing of critical orthobiologics and wound care solutions.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Precision Dialysis Manufacturing
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Advanced indigenous production lines for high-purity hemodialysis fluids, ensuring supply chain resilience across India.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        R&D Laboratories
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Our scientists pushing the boundaries of biomaterials, continually testing and developing the next generation of synthetic bone grafts.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Quality Assurance
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Every batch undergoes rigorous quality control checks in our in-house testing facility before reaching healthcare providers.
      </p>
    </div>
  );
};

const INITIAL_CARDS: Card[] = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Gallery() {
  const [cards, setCards] = useState<Card[]>(INITIAL_CARDS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchGallery() {
      try {
        const promise = Promise.resolve(
          supabase
            .from("gallery")
            .select("*")
            .order("created_at", { ascending: false })
        );

        const { data, error } = (await Promise.race([
          promise,
          new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
        ])) as any;

        if (error) {
          console.info("Using default gallery items:", error.message || error.code);
        } else if (data && data.length > 0 && isMounted) {
          const formattedCards: Card[] = data.map((item: any) => ({
            id: item.id,
            className: item.col_span || "col-span-1",
            thumbnail: item.image_url,
            content: (
              <div>
                <p className="font-bold md:text-4xl text-xl text-white">
                  {item.title}
                </p>
                <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                  {item.description}
                </p>
              </div>
            ),
          }));
          setCards(formattedCards);
        }
      } catch (err: any) {
        console.info("Using default gallery items:", err?.message || err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Header />
      
      {/* Page Header */}
      <div className="pt-40 pb-16 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Our Facilities & Operations</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A glimpse into the clinical, manufacturing, and research facilities driving Emsurg's innovation.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 w-full flex-grow">
        <div className="h-screen py-10 w-full">
          <LayoutGrid cards={cards} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
