import { useEffect, useState } from "react";
import { search_Logo } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import SearchItems from "./SearchItems";

const Body = () => {
  const { ItemsId } = useParams();
  const [searchText, setSearchText] = useState("");
  const [listOfItem, setListOfItem] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await fetch("/constantData.json");
      const json = await response.json();
      const menuData = json?.data?.cards || [];
      const allMenuItems = menuData.flatMap(item => item?.ItemsMenu || []);
      setListOfItem(allMenuItems);
      setFilteredItems(allMenuItems)
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [ItemsId]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = listOfItem.filter((item) =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(filtered);
    
    navigate('/search/',{state: {items: filtered}})
    setFilteredItems(filtered);
  };

  return (
    <div>
      <div className="flex py-4 mx-24 md:ml-[30%] md:my-8">
        <form className="flex border h-8 border-black bg-gray-200 rounded-l-xl md:h-12" onSubmit={handleSearch}>
          <img className="h-4 w-4 m-2 md:h-6 md:w-6" src={search_Logo} alt="search icon" />
          <input
            className="w-36 rounded-lg border bg-gray-200 focus:outline-none md:w-96"
            placeholder="Search items..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
          />
          <button
            type="submit"
            className="px-2 bg-red-600 font-semibold text-white active:bg-red-500"
          >
            Search
          </button>
        </form>
      </div>

      {/* <div>
        <SearchItems items={filteredItems} />
      </div> */}
    </div>
  );
};

export default Body;
