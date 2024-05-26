import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CardSet, selectCard } from "@/redux/slices/card";
import { IProduct } from "@/types/products/detail";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Props = {
  product: IProduct;
};

function Product({ product }: Props) {
  const navigate = useNavigate();
  const card = useAppSelector(selectCard);
  const dispatch = useAppDispatch();

  const handleClick = (id: string) => {
    navigate(id);
  };

  const addToCard = () => {
    dispatch(
      CardSet({ ...card, [product.id]: [...(card[product.id] ?? []), product] })
    );
  };

  return (
    <div className="col-span-3" data-testid="product">
      <Card className="cursor-pointer" onClick={() => handleClick(product.id)}>
        <CardMedia
          sx={{ height: 140 }}
          image={product.image}
          title="green iguana"
        />
        <CardContent>
          <div className="flex flex-col gap-4">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="line-clamp-1"
              data-tesid={`${product.name}`}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="line-clamp-3"
            >
              {product.description}
            </Typography>
            <div className="flex flex-col gap-2">
              <div>
                Model :&nbsp;
                <Chip label={product.model} className="w-fit" />
              </div>
              <div>
                Brand :&nbsp;
                <Chip label={product.brand} className="w-fit" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <div className="w-full flex justify-between p-2">
            <Button
              startIcon={<FaShoppingCart />}
              size="small"
              data-testid={`add-coad-${product.name}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCard();
              }}
            >
              <Typography variant="subtitle2" className="fon">
                Add To Card
              </Typography>
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default Product;
