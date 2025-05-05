import { useState } from 'react';
import { supabase } from '../supabase';

export default function ProjectForm() {
  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      alert('Veuillez vous connecter');
      return;
    }

    const { error } = await supabase.from('Projects').insert({
      title,
      user_id: user.id,
    });

    if (error) alert('Erreur : ' + error.message);
    else alert('Projet ajouté avec succès !');
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 mr-2"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nom du projet"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">
        Ajouter
      </button>
    </div>
  );
}
