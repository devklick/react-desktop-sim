import { create } from "zustand";
import { persist } from "zustand/middleware";

type FunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type Theme = Omit<
  SystemSettingState,
  FunctionPropertyNames<SystemSettingState>
>;

const defaultTheme: Theme = {
  mainColor: "#2e3440",
  primaryColor: "#5e81ac",
  secondaryColor: "#454e60",
  fontColor: "#ffffff",
  iconColor: "#9298b9",
  errorColor: "#bf616a",
  warningColor: "#ebcb8b",
  successColor: "#a3be8c",
  background: "https://regolith-linux.org/images/releases/nord-dark.png",
  opacity: 0.5,
  blur: 5,
};

export interface SystemSettingState {
  mainColor: string;
  primaryColor: string;
  secondaryColor: string;
  errorColor: string;
  warningColor: string;
  successColor: string;
  fontColor: string;
  iconColor: string;
  background: string;
  opacity: number;
  blur: number;
  setMainColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setFontColor: (color: string) => void;
  setIconColor: (color: string) => void;
  setBackground: (url: string) => void;
  restoreDefaultTheme: () => void;
  setOpacity: (opacity: number) => void;
  setBlur: (blur: number) => void;
}

export const useSystemSettings = create<SystemSettingState>()(
  persist(
    (set) => ({
      ...defaultTheme,
      setSecondaryColor(accentColor) {
        set({ secondaryColor: accentColor });
      },
      setMainColor(mainColor) {
        set({ mainColor });
      },
      setFontColor(fontColor) {
        set({ fontColor });
      },
      setIconColor(iconColor) {
        set({ iconColor });
      },
      setBackground(background) {
        set({ background });
      },
      restoreDefaultTheme() {
        set({ ...defaultTheme });
      },
      setBlur(blur) {
        set({ blur });
      },
      setOpacity(opacity) {
        set({ opacity });
      },
    }),
    {
      name: "system-settings",
    },
  ),
);

export default useSystemSettings;
