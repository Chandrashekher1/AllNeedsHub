import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";

const ItemsCard = ({ data }) => {
  const { name, cloudinaryImageId } = data?.info || {};

  return !data || Object.keys(data).length === 0 ? (
  <Shimmer />
  ) : (
  <div className="shadow-sm rounded-xl border text-center m-2  ">
    <Link to={`items/${data?.id}`}>
      <div className="w-28 cursor-pointer hover:scale-90">
        <img
          className="rounded-md h-20 justify-center w-full object-contain"
          src={cloudinaryImageId}
          alt="ItemImages"
        />
        <p className="font-semibold text- text-gray-800 my-4 text-wrap">
          {name}
        </p>
      </div>
    </Link>
  </div>
);
}

export default ItemsCard;
