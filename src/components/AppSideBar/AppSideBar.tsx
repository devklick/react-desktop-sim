import { adjustLuminance } from "../../common/utils/colorUtils";
import useSystemSettings from "../../stores/systemSettingsStore";
import Button from "../Button";
import { StyledItemContainer, StyledSideBar } from "./styles";

interface SideBarItem {
  title: string;
  onClick: () => void;
  isActive?: boolean;
}

interface AppSideBarProps {
  items: Array<SideBarItem>;
  itemSeparators?: boolean;
  itemSeparatorColor?: string;
}

function AppSideBar({
  items,
  itemSeparators,
  itemSeparatorColor,
}: AppSideBarProps) {
  const [fontColor, buttonColor] = useSystemSettings((s) => [
    s.fontColor,
    s.mainColor,
    s.secondaryColor,
  ]);
  return (
    <StyledSideBar>
      <StyledItemContainer>
        {items.map((item) => (
          <Button
            padding={"6px 10px"}
            group="vertical"
            onClick={item.onClick}
            color={fontColor}
            backgroundColor={"transparent"}
            backgroundColorHover={adjustLuminance(0.1, buttonColor)}
            backgroundColorActive={adjustLuminance(0.2, buttonColor)}
            active={item.isActive ?? false}
            justifyContent="start"
            key={item.title}
            separators={itemSeparators}
            separatorColor={itemSeparatorColor}
          >
            {item.title}
          </Button>
        ))}
      </StyledItemContainer>
    </StyledSideBar>
  );
}

export default AppSideBar;
