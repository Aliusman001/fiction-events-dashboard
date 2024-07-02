import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { favorite, unFavorite } from "../store/dataReducer";
import { FaHeart, FaRegHeart } from "React-Icons/fa";

function Like({ className = "w-5 h-5", data }) {
  const favList = useSelector((store) => store.data.favorite);
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);

  useEffect(
    function () {
      if (favList.find((v) => v.id === data.id)) {
        setLike(true);
      } else {
        setLike(false);
      }
    },
    [favList, data.id]
  );

  useEffect(
    function () {
      if (favList) {
        localStorage.setItem("favorite", JSON.stringify(favList));
      }
    },
    [favList]
  );

  return (
    <span className="bg-red-500">
      {like ? (
        <FaHeart
          onClick={(event) => {
            dispatch(unFavorite(data.id));
            setLike((c) => !c);
            event.stopPropagation();
          }}
          fill="#ED5656"
          className={`cursor-pointer ${className}`}
        />
      ) : (
        <FaRegHeart
          fill="#5041BC"
          onClick={(event) => {
            dispatch(favorite([data]));
            setLike((c) => !c);
            event.stopPropagation();
          }}
          className={`cursor-pointer ${className}`}
        />
      )}
    </span>
  );
}

export default Like;
