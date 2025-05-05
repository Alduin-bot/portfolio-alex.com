import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

type Project = {
  id: string;
  title: string;
  created_at: string;
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('Projects').select('*');
      if (error) console.error(error);
      else setProjects(data || []);
    };
    fetchProjects();
  }, []);

  return (
    <ul className="p-4">
      {projects.map((project) => (
        <li key={project.id}>{project.title}</li>
      ))}
    </ul>
  );
}
