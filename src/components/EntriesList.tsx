import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { fetchEntries } from "../store/entries/actions";
import { RootState } from "../store";

const EntriesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const EntryContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
  margin: 2px;
  background-color: darkgray;
  color: white;
`;

function EntriesList() {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entries);
  const after =
    entries.list.length > 0
      ? entries.list[entries.list.length - 1].id
      : undefined;

  const fetchCallback = useCallback(() => {
    dispatch(fetchEntries(after));
  }, [after, dispatch]);

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  return (
    <EntriesListContainer>
      {entries.list.map(entry => (
        <EntryContainer key={entry.title}>{entry.title}</EntryContainer>
      ))}

      {entries.status === "Failure" && (
        <div>There was an error fetching the entries</div>
      )}

      {entries.status === "Pending" && <div>Loading</div>}

      <button onClick={fetchCallback}>Load more</button>
    </EntriesListContainer>
  );
}

export default EntriesList;
