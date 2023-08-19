import styles from "./card.module.css";

interface CardProps {
  image: string;
  title: string;
  price: number;
}

export const Card = ({ image, title, price }: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>${price}</p>
      <button>Ver mas</button>
    </div>
  );
};
