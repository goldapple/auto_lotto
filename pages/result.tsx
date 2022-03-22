import _ from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import NumberBox from '../component/NumberBox';
import SEO from '../component/SEO';
import Title from '../component/Title';

type LottoNumber = {
  number: number[];
  bonus: number | null;
};

type initType = {
  win: LottoNumber;
  my: LottoNumber;
};

export default function result() {
  const winNum: LottoNumber = useSelector((state: initType) => state.win);
  const myNum: LottoNumber = useSelector((state: initType) => state.my);
  const [rank, setRank] = useState(0);

  const checkRank = () => {
    const uniqValue: number = _.union(winNum.number, myNum.number).length;
    switch (12 - uniqValue) {
      case 6:
        return setRank(1);
      case 5: {
        if (winNum.bonus === myNum.bonus) return setRank(2);
        else return setRank(3);
      }
      case 4:
        return setRank(4);
      case 3:
        return setRank(5);
      default:
        return setRank(0);
    }
  };
  useEffect(() => checkRank(), []);

  return (
    <div>
      <SEO pageTitle="결과 페이지" />
      <main>
        <Wrapper>
          <SubjectText>로또 금액 표</SubjectText>
          <BoxWrapper>
            <Row>
              <RowItem>순위</RowItem>
              <RowItem>당첨 내용</RowItem>
              <RowItem>당첨 확률</RowItem>
              <RowItem>당첨금 배분 비율</RowItem>
              <RowItem>기대 당첨금</RowItem>
            </Row>
            <Row>
              <RowItem> 1</RowItem>

              <RowItem>6개 번호 모두 일치</RowItem>

              <RowItem>1/8,145,060</RowItem>

              <RowItem>총 당첨금 중 4등과 5등 금액을 제외한 금액의 75%</RowItem>

              <RowItem>1,952,160,000원</RowItem>
            </Row>
            <Row>
              <RowItem> 2</RowItem>
              <RowItem>
                5개 번호 일치 <br />+ 나머지 1개가 보너스 번호 일치
              </RowItem>
              <RowItem>1/1,357,510</RowItem>
              <RowItem>
                총 당첨금 중 4등과 5등 금액을 제외한 금액의 12.5%
              </RowItem>
              <RowItem>54,226,666원 </RowItem>
            </Row>
            <Row>
              <RowItem>3</RowItem>
              <RowItem>5개 번호 일치</RowItem>
              <RowItem>1/35,724</RowItem>
              <RowItem>
                총 당첨금 중 4등과 5등 금액을 제외한 금액의 12.5%
              </RowItem>
              <RowItem>1,427,017원 </RowItem>
            </Row>
            <Row>
              <RowItem>4</RowItem>
              <RowItem>4개 번호 일치</RowItem>
              <RowItem>1/733</RowItem>
              <RowItem>50,000원</RowItem>
              <RowItem>50,000원</RowItem>
            </Row>
            <Row>
              <RowItem>5</RowItem>
              <RowItem>3개 번호 일치</RowItem>
              <RowItem>1/45</RowItem>
              <RowItem>5,000원</RowItem>
              <RowItem>5,000원</RowItem>
            </Row>
          </BoxWrapper>

          <SubjectText>로또 당첨 번호</SubjectText>
          <NumberBox Number={winNum.number} bonus={winNum.bonus} />

          <SubjectText>당신의 로또 번호</SubjectText>
          <NumberBox Number={myNum.number} bonus={myNum.bonus} />
          <SubjectText>
            {rank === 0
              ? '아쉽지만 당첨되지 못하였습니다'
              : `당신의 로또 순위는 ${rank}위 입니다!`}
          </SubjectText>

          <Link href="/">
            <LinkButton>돌아가기</LinkButton>
          </Link>
        </Wrapper>
      </main>
    </div>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SubjectText = styled.h2`
  font-size: 2rem;
  padding: 10px 0;
`;
const BoxWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1px;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 1px;
`;
const RowItem = styled.div`
  flex-basis: 100px;
  flex-grow: 1;
  text-align: center;
  border: 1px solid #ffffff;
`;
const LinkButton = styled.a`
  position: fixed;
  font-size: 1rem;
  color: yellow;
  right: 2rem;
  top: 2rem;
  padding: 2rem;
  border-radius: 50px;
  background-color: #89898988;
  :hover {
    cursor: pointer;
    background-color: #898989;
  }
`;
