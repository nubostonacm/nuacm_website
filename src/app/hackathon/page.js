'use client';

import { useState } from 'react';
import { Forminit } from 'forminit';

export default function HackathonSection() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const proxyUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/api/forminit`
      : '/api/forminit';

  const forminit = new Forminit({ proxyUrl });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());

    // Map keys to exactly match Forminit field names
    const payload = {
      'fi-sender-email': formData['fi-sender-email'] || '',
      'fi-sender-firstName': formData['fi-sender-firstName'] || '',
      'fi-sender-lastName': formData['fi-sender-lastName'] || '',
      'fi-text-school': formData['fi-text-school'] || '',
      'fi-text-questions': formData['fi-text-questions'] || '',
      'fi-select-strength': formData['fi-select-strength'] || '',
    };

    console.log('Submitting mapped form data:', payload);

    try {
      const { data, error: submitError } = await forminit.submit(
        '5c3az6ly4ga', // Your Forminit form ID
        payload
      );

      console.log('Forminit response:', { data, submitError });

      if (submitError) {
        setStatus('error');
        setError(submitError.message);
        return;
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      console.error('Form submission failed:', err);
      setStatus('error');
      setError(err.message || 'Unknown error');
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-celestial-blue py-20">
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