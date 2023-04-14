import { Link } from "@remix-run/react";
import { Product } from "~/types/productPage";

export const ProductCard = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-8 mx-auto gap-5 py-10">
      {products.map((product: Product, index: number) => (
        <div
          key={index}
          className="bg-white shadow col-span-2 mx-auto rounded-md overflow-hidden"
        >
          <div className="py-3">
            <img className="w-56 h-56" src={product.image} alt="photo.title" />
          </div>
          <div className="p-2 bg-primary py-10">
            <h3 className="text-lg font-semibold text-gray-700">
              {product.title.slice(0, 20)}
            </h3>
            <p className="py-3">{product.description.substring(0, 50)}</p>
            <div className="py-2">
              <Link
                prefetch="render"
                className="secondaryButton"
                to={`/products/${product.id}`}
              >
                View Details
              </Link>
            </div>
            <div className="py-2">
              <Link
                prefetch="render"
                className="whiteButton"
                state={{ product }}
                to={`/products/quickview/${product.id}`}
              >
                Quick View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
