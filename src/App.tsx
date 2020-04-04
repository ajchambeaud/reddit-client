import React from "react";
import EntriesList from "./components/EntriesList";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

function App() {
  return (
    <AppContainer>
      <EntriesList />
    </AppContainer>
  );
}

export default App;
