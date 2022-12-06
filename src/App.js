import { GlobalStyle } from "./GlobalStyles.js";
import { ThemeProvider } from "styled-components";
import { Theme } from "./Theme.js";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import { Container } from "./App.styles.js";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <Container>{code ? <Dashboard code={code} /> : <Login />}</Container>
    </ThemeProvider>
  );
}

export default App;
