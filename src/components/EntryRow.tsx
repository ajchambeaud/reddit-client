import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Entry } from "../store/entries/types";
import VisitedCircle from "./VisitedCircle";
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline";
import { CircleWithCross } from "@styled-icons/entypo/CircleWithCross";
import theme from "../utils/theme";

interface EntryRowProps {
  entry: Entry;
}

interface ImageProps {
  thumbnail: string;
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

  p {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
  }
`;

const Image = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("${(props: ImageProps) => props.thumbnail}");
  background-color: ${theme.defaultGray};
  margin-right: 10px;
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

const Arrow = styled(ArrowIosForwardOutline)`
  color: ${theme.defaultWhite};
  width: 20px;
`;

function EntryRow({ entry }: EntryRowProps) {
  console.log({ entry });

  return (
    <>
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
          <Body>
            <Image thumbnail={entry.thumbnail} />
            <p>{entry.title}</p>
          </Body>
          <Footer>
            <DismissButton>
              <Cross />
              Dismiss Post
            </DismissButton>
            <p>{entry.numComments} comments</p>
          </Footer>
        </Container>
        <ArrowContainer>
          <Arrow />
        </ArrowContainer>
      </RowContainer>
      <Divider>
        <hr />
      </Divider>
    </>
  );
}

export default EntryRow;
