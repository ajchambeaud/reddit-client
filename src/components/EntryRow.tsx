import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import { CircleWithCross } from "@styled-icons/entypo/CircleWithCross";

import { Entry } from "../store/entries/types";
import VisitedCircle from "./VisitedCircle";
import Image from "./Image";
import theme from "../utils/theme";
import { dismissEntry, selectEntry } from "../store/entries/actions";

interface EntryRowProps {
  entry: Entry;
}

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  color: ${theme.defaultWhite};
  width: 100%;
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
`;

const Arrow = styled(ArrowIosForwardOutline)`
  color: ${theme.defaultWhite};
  width: 20px;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;

  .author {
    font-size: 1.2em;
    margin-left: 10px;
  }

  .created {
    font-size: 0.9em;
    margin-left: 10px;
    color: ${theme.defaultGray};
  }
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  cursor: pointer;

  p {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
  }
`;

const Footer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  p {
    color: ${theme.defaultOrange};
    padding: 0px;
    margin: 0;
  }
`;

const DismissButton = styled.button`
  padding: 0;
  margin: 0;
  background-color: ${theme.darkBlack};
  color: ${theme.defaultWhite};
  display: flex;
  align-items: center;
  border: none;
  font-size: 1em;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const Cross = styled(CircleWithCross)`
  color: ${theme.defaultOrange};
  width: 20px;
  margin-right: 5px;
`;

const Divider = styled.div`
  display: flex;
  color: #d1d1d1;
  background-color: ${theme.darkBlack};

  hr {
    width: 90%;
    border: 0.5px solid ${theme.defaultGray};
  }
`;

const Animated = styled.div`
  transition: all 0.5s;

  &.dismissed {
    transform: translate3d(-100%, 0, 0);
  }
`;

function EntryRow({ entry }: EntryRowProps) {
  const [dismissed, setDismissed] = useState(false);
  const dispatch = useDispatch();

  const onDismissCallback = useCallback(() => {
    setDismissed(true);
    setTimeout(() => dispatch(dismissEntry(entry.id)), 500);
  }, [dispatch, entry]);

  const onSelectCallback = useCallback(() => {
    dispatch(selectEntry(entry));
  }, [dispatch, entry]);

  return (
    <Animated className={dismissed ? "dismissed" : ""}>
      <RowContainer>
        <Container>
          <Header>
            <VisitedCircle
              visible={!entry.visited}
              colorVisible="#057afe"
              colorInvisible="black"
            />
            <div className="author">{entry.author}</div>
            <div className="created">
              {moment
                .unix(entry.created)
                .startOf("hour")
                .fromNow()}
            </div>
          </Header>
          <Body onClick={onSelectCallback}>
            <Image thumbnail={entry.thumbnail} />
            <p>{entry.title}</p>
          </Body>
          <Footer>
            <DismissButton onClick={onDismissCallback}>
              <Cross />
              Dismiss Post
            </DismissButton>
            <p>{entry.numComments} comments</p>
          </Footer>
        </Container>
        <ArrowContainer onClick={onSelectCallback}>
          <Arrow />
        </ArrowContainer>
      </RowContainer>
      <Divider>
        <hr />
      </Divider>
    </Animated>
  );
}

export default EntryRow;
