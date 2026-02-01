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
}

function AppSideBar({ items }: AppSideBarProps) {
  const [buttonFontColor, buttonColor] = useSystemSettings((s) => [
    s.fontColor,
    s.mainColor,
  ]);
  return (
    <StyledSideBar>
      <StyledItemContainer>
        {items.map((item) => (
          <Button
            padding={"6px 10px"}
            group="vertical"
            onClick={item.onClick}
            color={buttonFontColor}
            backgroundColor={buttonColor}
            active={item.isActive ?? false}
          >
            {item.title}
          </Button>
        ))}
      </StyledItemContainer>
    </StyledSideBar>
  );
}

export default AppSideBar;
