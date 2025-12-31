// we have to import provider from react-redux we have to install dependencies for react-redux also other wise it shows error
import { Provider } from "react-redux";
//import function for store from src/store/store.ts
import store from "./store/store";
import "./App.css";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    // have to provide store to the app component
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center">
          Habit Tracker
        </Typography>
      </Container>
    </Provider>
  );
}

export default App;
