import Image from "next/image";
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/solid";
import CurrencyFormat from "react-currency-format";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const Product = ({ product }) => {
	const { id, title, price, description, category, image, rating } = product;
	const { rate, count } = rating;

	const dispatch = useDispatch()

	const [hasPrime, setIsPrimeEnabled] = useState(0);

	useEffect(() => {
		setIsPrimeEnabled(Math.random() < 0.5);
	}, []);

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
		dispatch(addToBasket(product))
	}

	return (
		<div className="relative flex flex-col m-5 bg-white z-30 p-10 shadow-sm rounded-sm">
			<p className="absolute top-2 right-2 text-xs italic text-gray-400">
				{category}
			</p>

			<Image
				src={image}
				height={200}
				width={200}
				style={{ margin: "auto", objectFit: "contain" }}
			/>

			<h4 className="my-3">{title}</h4>
			<div className="flex items-center">
				{Array.apply(null, { length: rate }).map((_, i) => (
					<StarIcon key={i} className="h-5 text-yellow-500" />
				))}
				<p className="text-sm text-gray-500">({count} reviews)</p>
			</div>

			<p className="text-xs my-2 line-clamp-2">{description}</p>

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

			<button onClick={addItemToBasket} className="mt-auto button">
				Add to Basket
			</button>
		</div>
	);
};

export default Product;
