import { useEffect, useState } from "react";
import { search_Logo } from "../utils/constant";
import { useParams } from "react-router-dom";

const Body = () => {
  const { ItemsId } = useParams(); // Access the dynamic route parameter
  const [searchText, setSearchText] = useState("");
  const [listOfItem, setListOfItem] = useState([]);
  const [filterItem, setFilterItem] = useState([]);


  const fetchData = async () => {
    try {
      const response = await fetch("/constantData.json");
      const json = await response.json();
      const menuData = json?.data?.cards || [];
      setListOfItem(menuData || []);
      setFilterItem(menuData || []); // Default to showing all items initially
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [ItemsId]);

  // Handle search filtering
  const handleSearch = () => {
    const filteredItems = listOfItem.filter(
      (item) =>
        item?.name?.toLowerCase().includes(searchText.toLowerCase()) // Ensure case-insensitive search
    );
    setFilterItem(filteredItems);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex py-4 mx-8">
        <span className="flex border h-8 border-black bg-gray-200 rounded-l-xl md:h-12">
          <img className="h-4 w-4 m-2 md:h-6" src={search_Logo} alt="search icon" />
          <input
            className="w-36 rounded-lg border bg-gray-200 focus:outline-none md:w-96"
            placeholder="Search items..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
          />
        </span>
        <button
          className="px-2 bg-red-600 font-semibold text-white rounded-r-xl active:bg-red-500"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* <div>
        {filterItem.length > 0 ? (
          <ItemsMenu items={filterItem} />
        ) : (
          <p className="text-center text-gray-500 mt-4">No items found.</p>
        )}
      </div> */}
    </div>
  );
};

export default Body;
