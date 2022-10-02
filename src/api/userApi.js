async function registerUser(user) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: user.name,
    email: user.email,
    password: user.password,
    age: 34,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api-nodejs-todolist.herokuapp.com/user/register`,
    requestOptions
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

async function login(user) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: user.email,
    password: user.password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api-nodejs-todolist.herokuapp.com/user/login`,
    requestOptions
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

function getUser() {
  return user;
}

const user = {
  name: "Muhammad Nur Ali",
  email: "egoksg@gmail.com",
  password: "12345678",
  token: "",
};

try {
  await registerUser(user);
} catch (e) {
  console.error(e);
} finally {
  const auth = await login(user);
  console.log("로그인 성공");
  user.token = auth.token;
}

export default {
  registerUser,
  login,
  getUser,
};
