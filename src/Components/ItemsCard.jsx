import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";

const ItemsCard = ({ data }) => {
  
  return !data || Object.keys(data).length === 0 ? (
  <Shimmer />
  ) : (
  <div className="shadow-sm rounded-xl border text-center my-4 mx-4  ">
    <Link to={`${data?.collectionName}`}>
      <div className="w-28 md:w-40 cursor-pointer hover:scale-90">
        <img
          className="rounded-md h-20 justify-center w-full object-contain"
          src={data.image}
          alt="ItemImages"
        />
        <p className="font-semibold text- text-gray-800 my-4 text-wrap">
          {data.name}
        </p>
      </div>
    </Link>
  </div>
);
}

export default ItemsCard;
