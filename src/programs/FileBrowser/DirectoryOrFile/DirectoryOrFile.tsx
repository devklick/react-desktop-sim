import React, { useRef, useState } from "react";
import useLocalFS, {
  FSDirectory,
  FSObject,
  isFSDirectory,
} from "../../../stores/localFS";
import ContextMenu from "../../../components/ContextMenu/ContextMenu";
import { ContextMenuAction, getFSObjectContextMenu } from "../contextMenus";

import useBindKeyToAction from "../../../hooks/useBindKeyToAction";
import AppPopup from "../../../components/AppPopup";
import HeaderBar from "../../../components/HeaderBar";
import Box from "../../../components/Box";
import InputField from "../../../components/InputField";
import Row from "../../../components/Row";
import Button from "../../../components/Button";
import { StyledFolderIcon, StyledItem, StyledItemName } from "./styles";
import useSystemSettings from "../../../stores/systemSettingsStore";

interface DirectoryOrFileProps {
  fsObject: FSObject;
  selected: boolean;
  openFSObject: (fsObject: FSObject) => void;
  setSelected: (path: string) => void;
  appRef: React.RefObject<HTMLDivElement>;
  currentDirectory: FSDirectory;
}

function DirectoryOrFile({
  fsObject,
  openFSObject,
  selected,
  setSelected,
  appRef,
  currentDirectory,
}: DirectoryOrFileProps) {
  const clickPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [contextAction, setContextAction] = useState<ContextMenuAction | null>(
    null,
  );
  const settings = useSystemSettings();
  const fs = useLocalFS();

  function handleRightClick(event: React.MouseEvent) {
    clickPosition.current = { x: event.clientX, y: event.clientY };
    event.stopPropagation();
    event.preventDefault();
    setContextMenuOpen(true);
  }

  function handleClick(event: React.MouseEvent) {
    setSelected(fsObject.path);
    event.stopPropagation();
    event.preventDefault();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      openFSObject(fsObject);
    }
  }

  return (
    <StyledItem
      selected={selected}
      selectedColor={settings.secondaryColor}
      onDoubleClick={() => openFSObject(fsObject)}
      onClick={handleClick}
      key={fsObject.path}
      onContextMenu={handleRightClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      onFocus={() => setSelected(fsObject.path)}
    >
      {contextMenuOpen && (
        <ContextMenu
          position={clickPosition.current}
          items={getFSObjectContextMenu(
            fsObject,
            fs,
            setContextAction,
            setContextMenuOpen,
          )}
          close={() => setContextMenuOpen(!contextMenuOpen)}
        />
      )}
      {contextAction === "rename" && (
        <RenamePopup
          appRef={appRef}
          close={() => setContextAction(null)}
          currentDirectory={currentDirectory}
          fsObject={fsObject}
        />
      )}
      {contextAction === "delete" && (
        <DeletePopup
          appRef={appRef}
          close={() => setContextAction(null)}
          currentDirectory={currentDirectory}
          fsObject={fsObject}
        />
      )}
      {isFSDirectory(fsObject) ? (
        <StyledFolderIcon fill={settings.iconColor} />
      ) : null}
      <StyledItemName>{fsObject.name}</StyledItemName>
    </StyledItem>
  );
}

interface RenamePopupProps {
  fsObject: FSObject;
  appRef: React.RefObject<HTMLDivElement>;
  currentDirectory: FSDirectory;
  close: () => void;
}

function RenamePopup({
  appRef,
  fsObject,
  currentDirectory,
  close,
}: RenamePopupProps) {
  const valueRef = useRef("");
  const fs = useLocalFS();
  const [error, setError] = useState(fs.validateFSObjectName(""));
  const [primaryColor, fontColor, cancelColor] = useSystemSettings((s) => [
    s.primaryColor,
    s.fontColor,
    s.errorColor,
  ]);

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
    fs.rename(currentDirectory, fsObject, valueRef.current);
    close();
  }

  return (
    <AppPopup appRef={appRef} close={close}>
      <HeaderBar header={`Rename ${fsObject.type}`} />
      <Box>
        <InputField
          name="Name"
          type="string"
          onChange={handleValueChange}
          error={error}
        />

        <Row gap={0}>
          <Button
            group="horizontal"
            onClick={close}
            backgroundColor={cancelColor}
            color={fontColor}
          >
            Cancel
          </Button>
          <Button
            group="horizontal"
            onClick={handleClickConfirm}
            disabled={!!error}
            backgroundColor={primaryColor}
            color={fontColor}
          >
            Confrm
          </Button>
        </Row>
      </Box>
    </AppPopup>
  );
}

interface DeletePopupProps {
  appRef: React.RefObject<HTMLDivElement>;
  fsObject: FSObject;
  currentDirectory: FSDirectory;
  close: () => void;
}

function DeletePopup({
  appRef,
  fsObject,
  currentDirectory,
  close,
}: DeletePopupProps) {
  const fs = useLocalFS();
  const [primaryColor, fontColor, cancelColor] = useSystemSettings((s) => [
    s.primaryColor,
    s.fontColor,
    s.errorColor,
  ]);

  function handleClickConfirm() {
    fs.delete(currentDirectory, fsObject);
  }

  return (
    <AppPopup appRef={appRef} close={close}>
      <HeaderBar header={`Delete ${fsObject.type}?`} />
      <Box>
        <Row gap={0}>
          <Button
            onClick={close}
            group="horizontal"
            backgroundColor={cancelColor}
            color={fontColor}
          >
            Cancel
          </Button>
          <Button
            onClick={handleClickConfirm}
            group="horizontal"
            backgroundColor={primaryColor}
            color={fontColor}
          >
            Confirm
          </Button>
        </Row>
      </Box>
    </AppPopup>
  );
}

export default DirectoryOrFile;
