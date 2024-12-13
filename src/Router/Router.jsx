import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import TodoList from "../component/TodoList";
import Users from "../component/Users";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="/todoList" element={<TodoList />} />
      </Routes>
    </>
  );
};

export default Router;
