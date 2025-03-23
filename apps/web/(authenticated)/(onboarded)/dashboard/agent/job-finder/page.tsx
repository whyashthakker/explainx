const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();

  if (status !== 'authenticated') {
    setError('Please sign in to create a search');
    return;
  }

  setLoading(true);
  setError(null);

  const formData = new FormData(e.currentTarget);
  const skillsValue = formData.get('skills') as string;
  
  const data = {
    job_title: formData.get('job_title') as string,
    location: formData.get('location') as string,
    experience_years: formData.get('experience_years') as string,
    skills: skillsValue ? skillsValue.split(',').map(skill => skill.trim()) : [],
    job_category: formData.get('job_category') as string
  };

  // ... rest of the existing code ...
}; 