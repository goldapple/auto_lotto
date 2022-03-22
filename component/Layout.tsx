import React from 'react';
import styled from 'styled-components';

type AppLayoutProps = {
  children: React.ReactElement;
};

export default function Layout({ children }: AppLayoutProps) {
  return <Wrapper>{children}</Wrapper>;
}
const Wrapper = styled.div`
  background-color: #dddddd;
`;
