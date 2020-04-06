import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import theme from "../utils/theme";
import { RootState } from "../store";
import Image from "./Image";

const Placeholder = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: ${theme.darkBlack};
  font-size: 2em;
`;

const Container = styled.div`
  color: ${theme.darkBlack};
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 3.5em;
  align-items: center;
  overflow: auto;
`;

const UserName = styled.h1`
  font-size: 2em;
`;

const Title = styled.p`
  width: 50%;
  font-size: 1.2em;
`;

function EntryView() {
  const entries = useSelector((state: RootState) => state.entries);

  if (!entries.selected) {
    return <Placeholder>No post selected</Placeholder>;
  }

  return (
    <Container>
      <UserName>{entries.selected.author}</UserName>
      <Image thumbnail={entries.selected.thumbnail} height="200" />
      <Title>{entries.selected.title}</Title>
    </Container>
  );
}

export default EntryView;
