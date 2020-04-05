import React, { useEffect, useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";

import { fetchEntries, dismissAll } from "../store/entries/actions";
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
  overflow: auto;
  transition: all 0.5s;

  &.dismissed {
    transform: translate3d(-100%, -100%, 0);
  }
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

  &:disabled {
    color: ${theme.defaultGray};
    cursor: not-allowed;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${theme.darkBlack};
`;

function EntriesList() {
  const dispatch = useDispatch();
  const [dismissed, setDismissed] = useState(false);
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
    if (afterRef.current !== after && entries.list.length !== 0) {
      afterRef.current = after;
      dispatch(fetchEntries(after));
    }
  }, [afterRef, dispatch, after, entries]);

  const onScrollCallback = useInfinityScroll(onInfinityScroll);

  const onDismissAllCallback = useCallback(() => {
    setDismissed(true);
    setTimeout(() => {
      dispatch(dismissAll());
      setDismissed(false);
    }, 500);
  }, [dispatch, setDismissed]);

  const onContainerClickCallback = useCallback(() => {
    if (entries.status !== "Pending" && entries.list.length === 0) {
      dispatch(fetchEntries());
    }
  }, [dispatch, entries]);

  return (
    <Container>
      <Header>
        <h1>Reddit Posts</h1>
      </Header>

      <EntriesListContainer
        onScroll={onScrollCallback}
        onClick={onContainerClickCallback}
        className={dismissed ? "dismissed" : ""}
      >
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
        <Button
          onClick={onDismissAllCallback}
          disabled={entries.status === "Pending" || entries.list.length === 0}
        >
          Dismiss All
        </Button>
      </Footer>
    </Container>
  );
}

export default EntriesList;
