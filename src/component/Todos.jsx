import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdDeleteForever, MdError } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { FaPenSquare } from "react-icons/fa";
const Todos = () => {
  const [reload, setReload] = useState(true);

  // todos
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:3003/todo").then((res) => setData(res?.data));
  }, [reload]);
  // add todo

  const date = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPut, setIsModalOpenPut] = useState(false);
  const toggleModalPut = () => {
    setIsModalOpenPut(!isModalOpenPut);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // create todo
  const handleChangePost = (e) => {
    function oyningNomi(date) {
      switch (date.getMonth()) {
        case 0:
          return "Yanvar";
        case 1:
          return "Fevral";
        case 2:
          return "Mart";
        case 3:
          return "Aprel";
        case 4:
          return "May";
        case 5:
          return "Iyun";
        case 6:
          return "Iyul";
        case 7:
          return "Avgust";
        case 8:
          return "Sentyabr";
        case 9:
          return "Oktyabr";
        case 10:
          return "Noyabr";
        case 11:
          return "Dekabr";
        default:
          return "Noma’lum oy";
      }
    }
    e.preventDefault();
    const formData = new FormData(e.target);
    const post = Object.fromEntries(formData);
    const body = {
      ...post,
      time: `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`,
      date: `${date.getDay()}-${oyningNomi(date)}`,
      todos: false,
    };
    axios.post("http://localhost:3003/todo", body).then((res) => {
      console.log(res);
      e.target.reset();
      setReload((prev) => !prev);
      setIsModalOpen(!isModalOpen);
    });
  };
  // delete Todo
  const handleDeletePost = (id) => {
    axios.delete(`http://localhost:3003/todo/${id}`).then((res) => {
      console.log(res);
      setReload((prev) => !prev);
    });
  };
  const handleTo = (id, body) => {
    axios
      .put(`http://localhost:3003/todo/${id}`, {
        ...body,
        todos: !body.todos,
      })
      .then((res) => {
        console.log(res);
        setReload((prev) => !prev);
      });
  };
  // put element
  const handleUpdatePost = (body) => {
    return body;
  };
  const UpdatePost = (e) => {
    e.preventDefault();

    console.log(handleUpdatePost());
  };
  // post element
  const todos = data?.map((todo) => (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
      }}
      className="flex justify-between w-[900px] mx-auto mt-4 border-[2px] border-slate-400 py-2 px-2 rounded-xl"
      key={todo.id}
    >
      <div className="flex gap-5">
        <button
          className="text-purple-600 text-3xl"
          onClick={() => handleTo(todo.id, todo)}
        >
          {todo.todos ? <IoCheckmarkDoneCircle /> : <MdError />}
        </button>
        <p>
          {todo.title}{" "}
          {todo.todos && (
            <sub className="text-purple-700 font-bold">Bajarildi</sub>
          )}
        </p>
      </div>
      <div className="flex">
        <p>{todo.date}</p>
        <p>{todo.time}</p>
        <button
          onClick={() => handleDeletePost(todo.id)}
          className="text-purple-600 text-3xl"
        >
          <MdDeleteForever />
        </button>
        <button
          onClick={() => {
            toggleModalPut();
            handleUpdatePost(todo);
          }}
          className="text-purple-600 text-3xl"
        >
          <FaPenSquare />
        </button>
      </div>
    </div>
  ));
  return (
    <>
      <div className="mt-10">{todos}</div>;
      <div>
        {/* Add Todo Button */}
        <button
          onClick={toggleModal}
          className="text-[60px] text-purple-600 cursor-pointer mt-11 hover:text-purple-800"
        >
          <IoMdAddCircle />
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
              <form onSubmit={handleChangePost}>
                <textarea
                  name="title"
                  placeholder="Description"
                  className="w-full p-2 border rounded-md mb-4"
                  required
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md"
                  >
                    Add Todo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Change Post */}
      <div>
        {/* Modal */}
        {isModalOpenPut && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4">Update Todo</h2>
              <form onSubmit={UpdatePost}>
                <textarea
                  name="title"
                  placeholder="Description"
                  className="w-full p-2 border rounded-md mb-4"
                  required
                ></textarea>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                    onClick={toggleModalPut}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Todos;
