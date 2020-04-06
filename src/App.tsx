import React from "react";
import EntriesList from "./components/EntriesList";
import EntryView from "./components/EntryView";
import styled from "styled-components";
import { slide as Menu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

function App() {
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });

  return (
    <AppContainer>
      {isTabletOrMobileDevice && (
        <Menu width={"400px"} noOverlay>
          <EntriesList />
        </Menu>
      )}

      {isDesktopOrLaptop && <EntriesList />}

      <EntryView />
    </AppContainer>
  );
}

export default App;
