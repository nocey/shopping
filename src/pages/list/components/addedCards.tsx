import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CardSet, selectCard } from "@/redux/slices/card";
import { Button, Typography } from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa";

function AddedCards() {
  const card = useAppSelector(selectCard);
  const dispatch = useAppDispatch();
  const addCard = (key: string) => {
    const newCard = Object.assign({}, card);
    newCard[key] = [...newCard[key], newCard[key][0]];
    dispatch(CardSet({ ...newCard }));
  };

  const removeCard = (key: string) => {
    const newCard = Object.assign({}, card);
    if (newCard[key].length === 1) {
      delete newCard[key];
    } else {
      newCard[key] = newCard[key].slice(1);
    }
    dispatch(CardSet({ ...newCard }));
  };

  return (
    <div className="w-full shadow-xl p-4 flex flex-col gap-2">
      {Object.keys(card).map((key, index) => {
        return (
          <div
            key={index}
            className="w-full flex justify-between"
            data-testid={`card-${card[key][0].name}`}
          >
            <div>
              <Typography>{card[key][0].name}</Typography>
              <Typography
                className="text-primary"
                variant="subtitle2"
                data-testid={`card-price-${card[key][0].name}`}
              >
                {card[key]
                  .reduce((prev, curr) => parseFloat(curr.price) + prev, 0)
                  .toFixed(2)}
                ₺
              </Typography>
            </div>
            <div className="w-fit flex justify-center items-center">
              <Button
                data-testid={`card-plus-${card[key][0].name}`}
                onClick={() => {
                  addCard(key);
                }}
              >
                <FaPlus />
              </Button>
              {card[key].length}
              <Button
                data-testid={`card-minus-${card[key][0].name}`}
                onClick={() => {
                  removeCard(key);
                }}
              >
                <FaMinus />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AddedCards;
