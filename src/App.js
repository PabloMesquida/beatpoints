import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import AppContext from "./context/Context.js";
import { GlobalStyle } from "./GlobalStyles.js";
import { ThemeProvider } from "styled-components";
import { Theme } from "./Theme.js";
import { Container } from "./App.styles.js";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <AppContext>
        <Container>{code ? <Dashboard code={code} /> : <Login />}</Container>
      </AppContext>
    </ThemeProvider>
  );
}

export default App;
