import { useNavigate } from "react-router-dom";
import { DirectoryItemContainer, Body, BackgroundImage } from "./directory-item.styles";
import { DirectoryItemType } from "../directory/directory.component";

type DirectoryItemProps = {
  category: DirectoryItemType;
};

export const DirectoryItem = ({ category }: DirectoryItemProps) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => {
    console.log(route);
    navigate(route);
  };
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};
