import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  position: relative;
`;

const Title = styled.h3`
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 15px;
  background-color: ${(props) => (props.cancel ? "#f44336" : "#007bff")};
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${(props) => (props.cancel ? "#d32f2f" : "#0056b3")};
    transform: scale(1.05);
  }
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const DiaryList = () => {
  const [diaries, setDiaries] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editState, setEditState] = useState({ title: "", content: "", emotion: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/list");
        setDiaries(response.data);
      } catch (error) {
        alert("일기 목록을 불러오는 데 실패했습니다.");
      }
    };

    fetchDiaries();
  }, []);

  const diaryDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`http://localhost:8080/list/${id}`);
      setDiaries((prevDiaries) => prevDiaries.filter((diary) => diary.id !== id));
      alert("삭제 완료!");
    } catch (error) {
      alert("삭제에 실패했습니다.");
    }
  };

  const handleEdit = (diary) => {
    setEditId(diary.id);
    setEditState({ title: diary.title, content: diary.content, emotion: diary.emotion });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8080/list/${editId}`, editState);
      setDiaries((prevDiaries) =>
        prevDiaries.map((diary) =>
          diary.id === editId ? { ...diary, ...editState } : diary
        )
      );
      setEditId(null);
      alert("수정 완료!");
    } catch (error) {
      alert("수정에 실패했습니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditState({ ...editState, [name]: value });
  };

  return (
    <Container>
      <BackButton onClick={() => navigate("/")}>뒤로가기</BackButton>
      <Title>나의 일기</Title>
      <List>
        {diaries.map((diary) => (
          <ListItem key={diary.id}>
            {editId === diary.id ? (
              <div>
                <Input
                  type="text"
                  name="title"
                  value={editState.title}
                  onChange={handleChange}
                />
                <Textarea
                  name="content"
                  value={editState.content}
                  onChange={handleChange}
                />
                <Select
                  name="emotion"
                  value={editState.emotion}
                  onChange={handleChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Select>
                <Button onClick={handleSaveEdit}>저장</Button>
                <Button cancel onClick={() => setEditId(null)}>취소</Button>
              </div>
            ) : (
              <div>
                <h4>{diary.title}</h4>
                <p>{diary.content}</p>
                <p>감정 점수: {diary.emotion}</p>
                <Button onClick={() => handleEdit(diary)}>수정</Button>
                <Button cancel onClick={() => diaryDelete(diary.id)}>삭제</Button>
              </div>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DiaryList;
