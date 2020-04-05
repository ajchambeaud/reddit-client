import React, { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";

import { fetchEntries } from "../store/entries/actions";
import { RootState } from "../store";
import useInfinityScroll from "../hooks/useInfinityScroll";
import EntryRow from "./EntryRow";
import theme from "../utils/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 250px;
  height: 100vh;
  background-color: ${theme.darkBlack};
`;

const EntriesListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const Header = styled.div`
  display: flex;
  background-color: ${theme.lightBlack};
  color: #d1d1d1;
  justify-content: center;

  h1 {
    font-size: 1.1em;
  }
`;

const Footer = styled.div`
  display: flex;
  background-color: ${theme.lightBlack};
`;

const Button = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0.6em;
  font-size: 0.8em;
  font-weight: bolder;
  color: ${theme.defaultOrange};
  background: ${theme.lightBlack};
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${theme.darkBlack};
`;

function EntriesList() {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entries);

  const after =
    entries.list.length > 0
      ? entries.list[entries.list.length - 1].id
      : undefined;

  const afterRef = useRef(after);

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  const onInfinityScroll = useCallback(() => {
    if (afterRef.current !== after) {
      afterRef.current = after;
      dispatch(fetchEntries(after));
    }
  }, [afterRef, dispatch, after]);

  const onScrollCallback = useInfinityScroll(onInfinityScroll);

  return (
    <Container>
      <Header>
        <h1>Reddit Posts</h1>
      </Header>
      <EntriesListContainer onScroll={onScrollCallback}>
        {entries.list.map(entry => (
          <EntryRow key={entry.id} entry={entry} />
        ))}

        {entries.status === "Failure" && (
          <div>There was an error fetching the entries</div>
        )}

        {entries.status === "Pending" && (
          <SpinnerContainer>
            <PulseLoader color="#ff9800" />
          </SpinnerContainer>
        )}
      </EntriesListContainer>
      <Footer>
        <Button onClick={() => {}}>Dismiss All</Button>
      </Footer>
    </Container>
  );
}

export default EntriesList;
