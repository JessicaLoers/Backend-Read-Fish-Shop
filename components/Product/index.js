import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`);

  if (!data) {
    return;
  }

  const { name, description, price, currency, reviews } = data;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ProductCard>
      <h2>{name}</h2>
      <p>Description: {description}</p>
      <p>
        Price: {price} {currency}
      </p>

      {reviews &&
        reviews.map((review) => (
          <article key={review._id}>
            <h3>{review.title}</h3>
            <p>{review.text}</p>
            <p>Rating: {review.rating}</p>
          </article>
        ))}

      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
