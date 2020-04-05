import React, { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";

import { fetchEntries } from "../store/entries/actions";
import { RootState } from "../store";
import useInfinityScroll from "../hooks/useInfinityScroll";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100vh;
`;

const EntriesListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const EntryContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 2px;
  background-color: darkgray;
  color: white;
`;

const Header = styled.div`
  display: flex;
  background-color: #0f0f0f;
  color: #d1d1d1;
  justify-content: center;

  h1 {
    font-size: 1.1em;
  }
`;

const Footer = styled.div`
  display: flex;
  background-color: #0f0f0f;
  color: #d1d1d1;
`;

const Button = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0.6em;
  font-size: 0.8em;
  font-weight: bolder;
  color: #ff9800;
  background: #0e0e0e;

  &:focus {
    outline: 0;
  }

  &:hover {
    color: #ff98008c;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
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
          <EntryContainer key={entry.id}>{entry.title}</EntryContainer>
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
