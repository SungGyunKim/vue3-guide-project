import userApi from "./userApi.js";

export async function addTask(task) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userApi.getUser().token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(task);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api-nodejs-todolist.herokuapp.com/task`,
    requestOptions
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

export async function getAllTask() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userApi.getUser().token}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api-nodejs-todolist.herokuapp.com/task`,
    requestOptions
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

export async function getTaskById(taskId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userApi.getUser().token}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api-nodejs-todolist.herokuapp.com/task/${taskId}`,
    requestOptions
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

export async function getTaskByCompleted(completed) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userApi.getUser().token}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api-nodejs-todolist.herokuapp.com/task?completed=${completed}`,
    requestOptions
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

export async function getTaskByPagination(limit, skip) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userApi.getUser().token}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api-nodejs-todolist.herokuapp.com/task?limit=${limit}&skip=${skip}`,
    requestOptions
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

export async function updateTaskById(task) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userApi.getUser().token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(task);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api-nodejs-todolist.herokuapp.com/task/${task.id}`,
    requestOptions
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

export async function deleteTaskById(taskId) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userApi.getUser().token}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `https://api-nodejs-todolist.herokuapp.com/task/${taskId}`,
    requestOptions
  );
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw Error(data);
  }
}

export default {
  addTask,
  getAllTask,
  getTaskById,
  getTaskByCompleted,
  getTaskByPagination,
  updateTaskById,
  deleteTaskById,
};
