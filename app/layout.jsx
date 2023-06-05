import Nav from "@components/Nav";
import AuthProvider from "@context/AuthProvider";
import "@styles/globals.css";
import CustomThemeProvider from "@context/CustomThemeProvider";

export const metadata = {
  title: "Prompt Portal",
  description: "Discover & Share AI prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-black">
        <AuthProvider>
          <CustomThemeProvider>
            <main className="app">
              <Nav />
              {children}
            </main>
          </CustomThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
