import { useRef, useState } from "react";
import useLocalFS, {
  FSDirectory,
  FSObject,
  FSObjectType,
} from "../../../stores/localFS";
import { getMainContentContextItems } from "../contextMenus";
import AppPopup from "../../../components/AppPopup";
import ContextMenu from "../../../components/ContextMenu/ContextMenu";
import DirectoryOrFile from "../DirectoryOrFile";
import HeaderBar from "../../../components/HeaderBar";
import Box from "../../../components/Box";
import InputField from "../../../components/InputField";
import Row from "../../../components/Row";
import Button from "../../../components/Button";
import useBindKeyToAction from "../../../hooks/useBindKeyToAction";
import { StyledMainContent } from "./styles";

interface MainContentProps {
  currentDirectory: FSDirectory;
  openFSObject: (fsObject: FSObject) => void;
  appRef: React.RefObject<HTMLDivElement>;
}

function MainContent({
  currentDirectory,
  openFSObject,
  appRef,
}: MainContentProps) {
  const [selected, setSelected] = useState<string>("");
  const clickPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [promptFor, setPromptFor] = useState<FSObjectType | null>(null);

  function handleRightClick(e: React.MouseEvent) {
    clickPosition.current = { x: e.clientX, y: e.clientY };
    e.stopPropagation();
    e.preventDefault();
    setContextMenuOpen(true);
  }

  function getFSObjects() {
    const objects = Object.values<FSObject>(currentDirectory.contents).sort(
      (a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      }
    );

    return objects;
  }

  return (
    <StyledMainContent onContextMenu={handleRightClick}>
      {contextMenuOpen && (
        <ContextMenu
          position={clickPosition.current}
          items={getMainContentContextItems(setPromptFor, setContextMenuOpen)}
          close={() => setContextMenuOpen(!contextMenuOpen)}
        />
      )}
      {promptFor && (
        <CreateFSObjectPopup
          appRef={appRef}
          fsObjectType={promptFor}
          currentDirectory={currentDirectory}
          close={() => setPromptFor(null)}
        />
      )}
      {getFSObjects().map((fsObject) => (
        <DirectoryOrFile
          fsObject={fsObject}
          openFSObject={openFSObject}
          selected={selected === fsObject.path}
          setSelected={setSelected}
          key={fsObject.path}
          appRef={appRef}
          currentDirectory={currentDirectory}
        />
      ))}
    </StyledMainContent>
  );
}

interface CreateFSObjectPopupProps {
  fsObjectType: FSObjectType;
  appRef: React.RefObject<HTMLDivElement>;
  currentDirectory: FSDirectory;
  close: () => void;
}

function CreateFSObjectPopup({
  appRef,
  fsObjectType,
  currentDirectory,
  close,
}: CreateFSObjectPopupProps) {
  const valueRef = useRef("");
  const fs = useLocalFS();
  const [error, setError] = useState(fs.validateFSObjectName(""));

  useBindKeyToAction({
    keys: ["Escape"],
    action: close,
  });
  useBindKeyToAction({
    keys: ["Enter", "NumpadEnter"],
    action: handleClickConfirm,
  });

  function handleValueChange(value: string) {
    valueRef.current = value;

    const invalid = fs.validateFSObjectName(value);
    if (invalid) {
      setError(invalid);
      return;
    }

    const available = fs.fsObjectNameIsAvailable(value, currentDirectory);
    if (!available) {
      setError(`${value} already exists`);
      return;
    }

    setError(null);
  }

  function handleClickConfirm() {
    if (error) return;
    fs.create(fsObjectType, valueRef.current, currentDirectory);
    close();
  }

  return (
    <AppPopup appRef={appRef} close={close}>
      <HeaderBar header={`Create ${fsObjectType}`} />
      <Box>
        <InputField
          name="Name"
          type="string"
          onChange={handleValueChange}
          error={error}
        />

        <Row>
          <Button name="Cancel" onClick={close} />
          <Button
            name="Confirm"
            onClick={handleClickConfirm}
            disabled={!!error}
          />
        </Row>
      </Box>
    </AppPopup>
  );
}

export default MainContent;
