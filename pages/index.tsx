import _ from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import NumberBox from '../component/NumberBox';
import SEO from '../component/SEO';
import Title from '../component/Title';
import { save_my_number, save_win_number } from '../store/Lotto';

type win = {
  number: number[];
  bonus: number | null;
};

export default function Home() {
  const dispatch = useDispatch();
  const [winNumber, setWinNumber] = useState<win>({
    number: [1, 2, 3, 4, 5, 6],
    bonus: 7,
  });
  const [myNumber, setMyNumber] = useState<win>({ number: [], bonus: null });
  const [goal, setGoal] = useState(3);

  //1~45 6개 + 보너스 1
  function createNumber(): win {
    let numberArray: number[] = [];
    let randomNumber: number;
    let bonusNumber: number | undefined;
    for (let i = 0; i < 7; i++) {
      do {
        randomNumber = Math.floor(Math.random() * 44 + 1);
      } while (_.includes(numberArray, randomNumber));
      numberArray.push(randomNumber);
    }

    bonusNumber = numberArray.pop();

    if (bonusNumber)
      return { number: _.sortBy(numberArray), bonus: bonusNumber };
    else return { number: [], bonus: -1 };
  }
  const isWinNumber = () => {
    const num: win = createNumber();
    setWinNumber(num);
    dispatch(save_win_number(num));
  };

  const autoPlay = () => {
    let whileCount = 0;
    while (true) {
      let tmp = createNumber();
      let count = 12 - _.union(winNumber.number, tmp.number).length;
      whileCount++;
      if (12 - _.union(winNumber.number, tmp.number).length >= goal) {
        setMyNumber(tmp);
        dispatch(save_my_number(tmp));
        console.log(`${whileCount}번째에서 찾았다! ${count}개 겹침`);
        return;
      }
    }
  };
  useEffect(() => {
    isWinNumber();
  }, []);
  return (
    <div>
      <SEO pageTitle="메인 페이지" />
      <main>
        <Wrapper>
          <Title TitleText="로또번호 자동 생성기" />
          <SubjectText>로또 당첨 번호</SubjectText>
          <NumberBox Number={winNumber.number} bonus={winNumber.bonus} />
          <CreateNumber onClick={isWinNumber}>
            당첨 로또 번호 생성하기
          </CreateNumber>
          목표 : {goal}개 맞추기!
          <SubjectText>당신의 로또 번호</SubjectText>
          <NumberBox Number={myNumber.number} bonus={myNumber.bonus} />
          <CreateNumber onClick={autoPlay}>
            나올때까지 돌려주는 버튼
          </CreateNumber>
          <ButtonWrapper>
            <Link
              href={{
                pathname: '/result',
                query: {
                  winNumber: JSON.stringify(winNumber),
                  myNumber: JSON.stringify(myNumber),
                },
              }}
              as={'/result'}
            >
              <LinkButton>등수 보러 이동하기</LinkButton>
            </Link>
            <AutoButton onClick={() => setGoal(3)}>목표 : 숫자 3개</AutoButton>
            <AutoButton onClick={() => setGoal(4)}>목표 : 숫자 4개</AutoButton>
            <AutoButton onClick={() => setGoal(5)}>목표 : 숫자 5개</AutoButton>
            <AutoButton onClick={() => setGoal(6)}>목표 : 숫자 6개</AutoButton>
          </ButtonWrapper>
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
  position: relative;
`;
const SubjectText = styled.h2`
  font-size: 2rem;
  padding: 10px 0;
`;
const CreateNumber = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  margin: 2rem 0;
  border-radius: 15px;
  border: 1px solid #888888;
  color: blue;
  :hover {
    background-color: #dddddd;
    cursor: pointer;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  position: fixed;
  right: 0;
  top: 0;
  font-size: 1rem;
  flex-direction: column;
  text-align: center;
  gap: 10px;
`;
const LinkButton = styled.a`
  color: yellow;
  padding: 1rem 2rem;
  border-radius: 50px;
  background-color: #89898988;
  :hover {
    cursor: pointer;
    background-color: #898989;
  }
`;
const AutoButton = styled.button`
  color: yellow;
  padding: 1rem;
  border-radius: 50px;
  background-color: #89898988;
  border: none;
  :hover {
    cursor: pointer;
    background-color: #898989;
  }
`;
