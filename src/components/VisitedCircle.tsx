import React from "react";
import styled from "styled-components";

interface EntryRowProps {
  colorVisible?: string;
  colorInvisible?: string;
  visible: boolean;
}

const Container = styled.div`
  display: flex;
  width: 10px;
  height: 10px;
  justify-content: center;
`;

function VisitedCircle({
  colorVisible = "red",
  colorInvisible = "white",
  visible
}: EntryRowProps) {
  const color = visible ? colorVisible : colorInvisible;

  return (
    <Container>
      <svg>
        <circle cx={5} cy={5} r={5} fill={color} />
      </svg>
    </Container>
  );
}

export default VisitedCircle;
