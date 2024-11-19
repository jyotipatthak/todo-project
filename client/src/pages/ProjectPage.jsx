import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createProject, getProjects } from "../utils/api";
import ProjectCard from "../components/ProjectCard";

const ProjectPage = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) {
        setProjects([]);
        return;
      }
      try {
        const data = await getProjects(user.token);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = { title, description };
      const newProject = await createProject(projectData, user.token);
      setProjects((prevProjects) => [newProject, ...prevProjects]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.response?.data?.message || "Project creation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      {/* Create Project Section */}
      <section className="bg-blue-100 shadow-lg rounded-lg max-w-4xl mx-auto mt-16 p-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">Create a New Project</h2>
        <p className="text-gray-600 text-sm mt-2 mb-6">
          Start organizing your tasks with a brand-new project.
        </p>
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project Description"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition"
            >
              Create Project
            </button>
          </form>
        ) : (
          <p className="text-red-500 mt-4">Please log in to create a project.</p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </section>

      {/* Divider */}
      <div className="my-16 w-full border-t border-gray-300"></div>

      {/* Project Cards Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Your Projects
        </h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No projects found. Start by creating one!</p>
        )}
      </section>
    </div>
  );
};

export default ProjectPage;
