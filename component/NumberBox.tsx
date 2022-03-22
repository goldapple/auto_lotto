import styled from 'styled-components';

type NumberBoxProps = {
  Number: number[];
  bonus: number | null;
};

export default function NumberBox({ Number, bonus }: NumberBoxProps) {
  return (
    <Wrapper>
      {Number.map((number) => (
        <Box key={number}>{number}</Box>
      ))}
      {bonus ? (
        <>
          <Box>+</Box>
          <Box>{bonus}</Box>
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #333333;
  padding: 2rem;
`;
const Box = styled.div`
  font-size: 2rem;
`;
