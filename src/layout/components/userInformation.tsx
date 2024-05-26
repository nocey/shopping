import { useAppSelector } from "@/redux/hooks";
import { selectCard } from "@/redux/slices/card";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function UserInformation() {
  const card = useAppSelector(selectCard);
  return (
    <div className="flex gap-4 items-center justify-between">
      <div className="w-full flex gap-4 items-center">
        <FaShoppingCart className="text-white" />
        <p className="text-white" data-testid="total-price">
          {Object.keys(card).length
            ? Object.keys(card)
                .map((key) =>
                  card[key].reduce(
                    (prev, curr) => prev + parseFloat(curr.price),
                    0
                  )
                )
                .reduce((prev, curr) => prev + curr, 0)
                .toFixed(2)
            : 0}
          ₺
        </p>
      </div>
      <div className="w-full flex gap-4 items-center">
        <FaUser className="text-white" />
        <p className="text-white">Naci</p>
      </div>
    </div>
  );
}

export default UserInformation;
