import React, { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const Section = styled.section`
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 600px;
`;

const BackButtonStyled = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ScoreArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const DiaryEditor = () => {
  const titleInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    title: "",
    content: "",
    emotion: 1,
  });

  const ChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const Submit = async () => {
    if (state.title.trim().length < 1) {
      alert("제목을 입력해주세요.");
      titleInput.current.focus();
      return;
    }

    if (state.content.trim().length < 3) {
      alert("내용을 입력해주세요.");
      contentInput.current.focus();
      return;
    }

    try {
      await axios.post("http://localhost:8080/create", {
        title: state.title,
        content: state.content,
        emotion: parseInt(state.emotion, 10),
      });
      alert("일기 저장 완료!");
      setState({
        title: "",
        content: "",
        emotion: 1,
      });
    } catch (error) {
      console.error("Error saving diary:", error);
      alert("일기 저장 실패");
    }
  };

  return (
    <Section>
      <BackButtonStyled onClick={() => window.history.back()}>뒤로가기</BackButtonStyled>
      <h2>오늘의 일기</h2>
      <Inner>
        <div>
          <Input
            ref={titleInput}
            name="title"
            value={state.title}
            onChange={ChangeState}
            placeholder="제목"
          />
        </div>
        <div>
          <Textarea
            ref={contentInput}
            name="content"
            value={state.content}
            onChange={ChangeState}
            placeholder="내용을 입력하세요."
          />
        </div>
        <ScoreArea>
          <Label>오늘의 감정 점수:</Label>
          <Select
            name="emotion"
            value={state.emotion}
            onChange={ChangeState}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
        </ScoreArea>
        <div>
          <Button onClick={Submit}>일기 저장하기</Button>
        </div>
      </Inner>
    </Section>
  );
};

export default DiaryEditor;
