import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #007bff;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1.2rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;

export const MainScreen = () => {
  const destroyLogin = () => {
    console.log("???");
    document.cookie = "user" + "=" + "";
    window.location.reload(true);
  };

  return (
    <Container>
      <Title>환영합니다!</Title>
      <LinkContainer>
        <StyledLink href="/diarylist">나의 일기 보러 가기</StyledLink>
        <StyledLink href="/create">일기 작성하러 가기</StyledLink>
      </LinkContainer>
      <LogoutButton onClick={destroyLogin}>로그아웃</LogoutButton>
    </Container>
  );
};

export default MainScreen;
