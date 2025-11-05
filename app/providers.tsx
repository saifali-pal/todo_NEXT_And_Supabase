//empty

// "use client";

// import {
//   ReactNode,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type Theme = "dark" | "light" | "system";

// type ThemeProviderProps = {
//   children: ReactNode;
//   defaultTheme?: Theme;
//   storageKey?: string;
// };

// type ThemeContextType = {
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
// };

// const initialState: ThemeContextType = {
//   theme: "system",
//   setTheme: () => null,
// };

// const ThemeContext = createContext<ThemeContextType>(initialState);

// export function ThemeProvider({
//   children,
//   defaultTheme = "system",
//   storageKey = "ui-theme",
//   ...props
// }: ThemeProviderProps) {
//   const [theme, setTheme] = useState<Theme>(() => {
//     if (typeof window !== "undefined") {
//       return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
//     }
//     return defaultTheme;
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove("light", "dark");

//     if (theme === "system") {
//       const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
//         .matches
//         ? "dark"
//         : "light";
//       root.classList.add(systemTheme);
//       return;
//     }

//     root.classList.add(theme);
//   }, [theme]);

//   const value = {
//     theme,
//     setTheme: (theme: Theme) => {
//       if (typeof window !== "undefined") {
//         localStorage.setItem(storageKey, theme);
//       }
//       setTheme(theme);
//     },
//   };

//   return (
//     <ThemeContext.Provider {...props} value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// };

// interface ProvidersProps {
//   children: ReactNode;
// }

// export function Providers({ children }: ProvidersProps) {
//   return (
//     <ThemeProvider storageKey="ui-theme" defaultTheme="system">
//       {children}
//     </ThemeProvider>
//   );
// }



