import "./category-item.styles.scss";

export const CategoryItem = ({ title, imageUrl }) => {
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className="category-body-container">
        <h2 className="">{title}</h2>
        <p className="">Shop Now</p>
      </div>
    </div>
  );
};
