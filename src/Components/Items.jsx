import { useEffect, useState } from "react";
import ItemsCard from "./ItemsCard";
import Footer from "./Footer";
import Shimmer from "./Shimmer";
import BgSlide from "./BgSlide";
import useOnlineStatus from "../Hooks/useOnlineStatus";

const Items = () => {
  const [cards, setCards] = useState([]);
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/constantData.json");
        const json = await response.json();
        setCards(json?.data?.cards || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (onlineStatus) {
      fetchData();
    }
  }, [onlineStatus]);

  if (!onlineStatus) {
    return <h1>Looks like you're offline! Please check your internet connection.</h1>;
  }

  if (cards.length === 0) {
    return <Shimmer />;
  }

  return (
    <>
      <BgSlide />
      <div className="flex flex-wrap justify-center p-4">
        {cards.map((card) => (
          <ItemsCard key={card.id} data={card} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Items;
