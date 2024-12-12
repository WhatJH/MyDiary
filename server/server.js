const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const router = express.Router();

// 미들웨어 설정
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, 
};

app.use(
  session({
    secret: "45678()(*&*&",
    resave: false,
    saveUninitialized: true,
    cookie: { user: "" },
  })
);

app.use(cors(corsOptions));
app.use(express.json());

let users = [
  { username: "123", password: "123" }
];

let diaries = [];

router.post("/join", (req, res) => {
  const { username, password } = req.body;

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "이미 존재하는 사용자명입니다." });
  }

  users.push({ username, password });
  res.status(201).json({ message: "회원가입 성공!" });
});


app.post("/api/login", (req, res) => {
  const { username, password } = req.body;


  const user = users.find((user) => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: "아이디 또는 비밀번호가 잘못되었습니다." });
  }

  req.session.user = username;
  res.status(200).json({ message: "로그인 성공!", username });
});



router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "로그아웃 실패" });
    res.status(200).json({ message: "로그아웃 성공!" });
  });
});

app.use("/api", router);


app.post("/create", (req, res) => {
  const { title, content, emotion } = req.body;

  if (!title || !content || emotion == null) {
    return res.status(400).json({ message: "필수 항목을 입력해주세요." });
  }

  const newDiary = {
    id: diaries.length + 1, 
    title,
    content,
    emotion,
    createdAt: new Date(),
  };

  diaries.push(newDiary);
  console.log("새 일기 데이터:", newDiary);

  res.status(201).send({ message: "일기 저장 성공", diary: newDiary });
});



app.get("/list", (req, res) => {
  res.status(200).json(diaries);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("서버가 http://localhost:8080 에서 실행 중입니다.");
});



app.delete("/list/:id", (req, res) => {
  const { id } = req.params;
  const diaryIndex = diaries.findIndex((diary) => diary.id === parseInt(id, 10));
  

  if (diaryIndex === -1) {
    return res.status(404).json({ message: "일기를 찾을 수 없습니다." });
  }

  diaries.splice(diaryIndex, 1);
  res.status(200).json({ message: "일기 삭제 성공!" });
});

app.get("/list", (req, res) => {
  res.status(200).json(diaries);
});

app.put("/list/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, emotion } = req.body;

  const diary = diaries.find((diary) => diary.id === parseInt(id, 10));
  if (!diary) {
    return res.status(404).json({ message: "일기를 찾을 수 없습니다." });
  }

  if (title !== undefined) diary.title = title;
  if (content !== undefined) diary.content = content;
  if (emotion !== undefined) diary.emotion = emotion;

  console.log("수정된 일기 데이터:", diary);

  res.status(200).json({ message: "일기 수정 성공!", diary });
});



app.post("/api/join", (req, res) => {
  const { username, password } = req.body;

  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ message: "이미 존재하는 사용자명입니다." });
  }

  users.push({ username, password });
  console.log("저장된 사용자:", users);
  res.status(201).json({ message: "회원가입 성공!" });
});
