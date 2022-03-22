import styled from 'styled-components';

type TitleProps = {
  TitleText: string;
};

export default function Title({ TitleText }: TitleProps) {
  return (
    <Wrapper>
      <Text>{TitleText}</Text>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
`;
const Text = styled.h1`
  font-size: 3rem;
  color: #8abede;
`;
