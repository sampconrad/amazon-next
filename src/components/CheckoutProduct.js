import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import CurrencyFormat from "react-currency-format";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({ product }) => {
	const { id, title, price, description, category, image, rating, hasPrime } = product;
  const { rate, count } = rating;

  const dispatch = useDispatch()
  
  const addItemToBasket = () => {
		const product = {
			id,
			title,
			price,
			description,
			category,
			image,
			rating,
			hasPrime,
		};

		// sending the product as an action payload to the redux store
		dispatch(addToBasket(product));
	}

  const removeItemFromBasket = () => {
    // remove the item from redux store
    dispatch(removeFromBasket({id}))
  }

	return (
		<div className="grid grid-cols-5">
			<Image
				src={image}
				height={200}
				width={200}
				style={{ objectFit: "contain" }}
				alt="product-image"
			/>

			<div className="col-span-3 mx-5">
				<p>{title}</p>

				<div className="flex items-center md:mt-2">
					{Array.apply(null, { length: rate }).map((_, i) => (
						<StarIcon key={i} className="h-5 text-yellow-500" />
					))}
					<p className="text-sm text-gray-500">({count} reviews)</p>
				</div>

				<p className="text-xs my-1 md:mt-3 line-clamp-2">{description}</p>

				<div className="mb-5">
					<CurrencyFormat
						value={price}
						displayType={"text"}
						thousandSeparator={true}
						prefix={"$"}
					/>
				</div>

				{hasPrime && (
					<div className="flex items-center space-x-2 -mt-5">
            <img
              loading="lazy"
							className="w-12"
							src="https://links.papareact.com/fdw"
							alt="prime"
						/>
						<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
					</div>
				)}
      </div>
      
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button">Add to Basket</button>
        <button onClick={removeItemFromBasket} className="button">Remove from Basket</button>
      </div>
		</div>
	);
};

export default CheckoutProduct;
