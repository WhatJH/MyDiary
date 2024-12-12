import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Join = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("전송 데이터:", formData); // 디버그용 로그
      const response = await axios.post("http://localhost:8080/api/join", formData);
      console.log("서버 응답:", response.data); // 디버그용 로그
      alert(response.data.message);
      window.location.href = "/login";
    } catch (error) {
      console.error("회원가입 오류:", error.response?.data || error.message);
      alert(error.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        <Input
          type="text"
          name="username"
          placeholder="아이디를 입력해주세요"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">가입하기</Button>
      </Form>
    </Container>
  );
};

export default Join;
