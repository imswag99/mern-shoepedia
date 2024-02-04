import React from "react";
import { PiStarBold, PiStarFill, PiStarHalfFill } from "react-icons/pi";

const Star = ({ allRatings, product }) => {
  let stars = Math.round((allRatings.reduce((a, b) => a + b, 0) / allRatings.length) * 10) / 10;
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <PiStarFill />
        ) : stars >= number ? (
          <PiStarHalfFill />
        ) : (
          <PiStarBold />
        )}
      </span>
    );
  });

  return (
    <>
      {allRatings.length > 0 && (
        <div className="flex gap-1 items-center">
          {ratingStar}({product.ratings.length})
        </div>
      )}
    </>
  );
};

export default Star;
