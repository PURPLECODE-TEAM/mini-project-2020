import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ContentContainer from '../containers/test/ContentContainer';
import ContentNav from '../components/test/ContentNav';
import leftTree from '../../public/img/tree_left.png';
import rightTree from '../../public/img/tree_right.png';
import media from '../lib/styles/media';
import GrassBackground from '../components/common/GrassBackground';
import CloudBackground from '../components/common/CloudBackground';
import grassImg from '../../public/img/ground.png';
import cloudImg from '../../public/img/cloud.png';
import rabbit from '../../public/img/rabbit.png';
import useLoadData from '../lib/hooks/useLoadData';

const MainWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  background-color: #c5f1fc;
  overflow: hidden;
`;

const RightTree = styled.img`
  @media (max-width: ${media.laptopM}px) {
    right: -12rem;
  }
  @media (max-width: ${media.laptop}px) {
    display: none;
  }
  position: absolute;
  right: -7rem;
  top: -1rem;
  height: 110vh;
  object-fit: contain;
  z-index: 10;
`;

const LeftTree = styled.img`
  @media (max-width: ${media.laptopM}px) {
    left: -12rem;
  }
  @media (max-width: ${media.laptop}px) {
    display: none;
  }
  position: absolute;
  left: -7rem;
  top: -1rem;
  height: 110vh;
  object-fit: contain;
  z-index: 10;
`;

const Container = styled.div`
  @media (min-width: ${media.desktop}px) {
    width: 50%;
    bottom: 35%;
  }
  @media (max-width: ${media.tablet}px) {
    width: 450px;
    position: absolute;
    left: 50%;
    bottom: 27%;
    transform: translateX(-50%);
  }
  @media (max-width: ${media.mobileL}px) {
    width: 90%;
  }
  width: 450px;
  position: absolute;
  left: 50%;
  bottom: 27%;
  transform: translateX(-50%);
  height: 350px;
  padding: 20px 0;
  text-align: center;
  font-family: 'hannaPro', sans-serif;
  background-color: white;
  border-radius: 50px;
  z-index: 12;
  box-shadow: #afafaf 5px 5px 20px;
`;

const ContentTitle = styled.div`
  margin: 20px 0;
  font-size: 25px;
  color: #ff9c9c;
`;

const ContentWrap = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const SmallCharacter = styled.img`
  position: absolute;
  bottom: 110px;
  right: 20%;
  width: 110px;
  z-index:99;
  @media (max-width: ${media.tablet}px) {
    bottom: 40px;
    width: 70px;
  }
`;

const Test = ({ history }) => {
  const { type } = useParams();
  const [count, setCount] = useState(1);
  const [currentData, setCurrentData] = useState({});
  const [data, setData] = useState([]);

  const job = type === 'designer' ? '디자이너' : '개발자';
  const match = type === 'designer' ? 'designData' : 'developData';
  const [dataState] = useLoadData(match, null);

  useEffect(() => {
    if(dataState.data){
      setData(Object.values(dataState.data));
      setCurrentData(Object.values(dataState.data)[0]);
    }
  },[dataState]);

  const nextSlide = useCallback(() => {
    setCount(count + 1);
    setCurrentData(data[count]);
  });

  return (
    <MainWrapper>
      <RightTree src={rightTree} alt="Right tree" />
      <LeftTree src={leftTree} alt="Left tree" />
      <Container>
        <ContentTitle>{job}</ContentTitle>
        <ContentWrap>
          <ContentContainer
            nextSlide={nextSlide}
            data={currentData}
            count={count}
            history={history}
          />
        </ContentWrap>
        <ContentNav count={count} />
      </Container>
      <CloudBackground
        role="img"
        ariaLabel="clouds background"
        img={cloudImg}
      />
      <SmallCharacter src={rabbit} alt="rabbit" />
      <GrassBackground role="img" ariaLabel="grass background" img={grassImg} />
    </MainWrapper>
  );
};


export default Test;
