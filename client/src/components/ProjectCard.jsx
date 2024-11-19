import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const completedTodos = project.todos.filter((todo) => todo.completed).length;
  const totalTodos = project.todos.length;
  const createdDate = new Date(project.createdAt);
  const formattedDate = createdDate.toLocaleDateString();

  return (
    <div className="bg-blue-100 shadow-md rounded-xl p-6 hover:shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
      <p className="text-sm text-gray-500 mb-4">Created on: {formattedDate}</p>
      <p className="text-sm text-gray-600 mb-6">
        <span className="font-semibold text-green-600">{completedTodos}</span> / {totalTodos} Todos Completed
      </p>
      <div className="flex justify-center">
        <Link
          to={`/projects/${project._id}`}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
