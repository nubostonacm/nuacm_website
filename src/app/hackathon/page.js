'use client';

import { useState } from 'react';
import { Forminit } from 'forminit';

export default function HackathonSection() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const forminit = new Forminit({ proxyUrl: '/api/forminit' });

  async function handleSubmit(e) { // <-- remove ": React.FormEvent<HTMLFormElement>"
    e.preventDefault();
    setStatus('loading');
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { data, error: submitError } = await forminit.submit('oitj3mgx4iv', formData);

    if (submitError) {
      setStatus('error');
      setError(submitError.message);
      return;
    }

    setStatus('success');
    form.reset();
  }

  return (
    <section
      id="hackathon"
      className="min-h-screen flex items-center justify-center bg-celestial-blue py-20"
    >
      <div className="bg-gunmetal bg-opacity-50 rounded-xl p-12 max-w-3xl text-center flex flex-col items-center gap-6">
        <h2 className="text-4xl font-bold text-gunmetal mb-2">
          NUA Hackathon — March 14–15
        </h2>
        <p className="text-lg text-white leading-relaxed">
          Build something amazing in 24 hours. Meet students across disciplines,
          learn new tech, and compete for prizes. Open to all experience levels.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input type="text" name="fi-sender-firstName" placeholder="First Name" className="input" required />
          <input type="text" name="fi-sender-lastName" placeholder="Last Name" className="input" required />
          <input type="email" name="fi-sender-email" placeholder="Email" className="input" required />
          <input type="text" name="fi-text-school" placeholder="School" className="input" required />
          
          <select name="fi-select-strength" className="input" required>
            <option value="">Select Strength</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="ML">ML</option>
          </select>

          <textarea name="fi-text-questions" placeholder="Any questions?" className="input" />

          {status === 'error' && <p className="text-red-500">{error}</p>}
          {status === 'success' && <p className="text-green-500">Registration submitted!</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-tiffany-blue text-gunmetal font-bold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            {status === 'loading' ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </section>
  );
}