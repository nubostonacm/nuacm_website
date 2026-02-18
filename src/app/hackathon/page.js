'use client';
import { useState } from 'react';

export default function HackathonSection() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const FORM_ID = '5c3az6ly4ga';

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const fields = {
      'fi-sender-firstName': formData.get('fi-sender-firstName'),
      'fi-sender-lastName': formData.get('fi-sender-lastName'),
      'fi-sender-email': formData.get('fi-sender-email'),
      'fi-text-school': formData.get('fi-text-school'),
      'fi-select-strength': formData.get('fi-select-strength'),
      'fi-text-questions': formData.get('fi-text-questions') || '',
    };

    try {
      const response = await fetch('/api/forminit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: FORM_ID,
          fields: fields,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setStatus('idle');
        setError(result.error || 'Submission failed');
        return;
      }

      setStatus('success');
      formElement.reset();
      setTimeout(() => setStatus('idle'), 5000);

    } catch (err) {
      setStatus('idle');
      setError('An unexpected error occurred');
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-celestial-blue py-20">
      <div className="bg-gunmetal bg-opacity-50 rounded-xl p-12 max-w-3xl text-center flex flex-col items-center gap-6">
        <h2 className="text-4xl font-bold text-white mb-2">
          NUACM Hackathon — mid-March
        </h2>
        <p className="text-lg text-white leading-relaxed">
          Build something amazing in 24 hours. Meet students across disciplines,
          learn new tech, and compete for prizes. Open to all experience levels.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            name="fi-sender-firstName"
            placeholder="First Name"
            className="input"
            required
          />
          <input
            type="text"
            name="fi-sender-lastName"
            placeholder="Last Name"
            className="input"
            required
          />
          <input
            type="email"
            name="fi-sender-email"
            placeholder="School Email"
            className="input"
            required
          />
          <input
            type="text"
            name="fi-text-school"
            placeholder="School"
            className="input"
            required
          />
          <select name="fi-select-strength" className="input" required>
            <option value="">Select Strength</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="ML">ML</option>
          </select>
          <select name="fi-select-track" className="input" required>
          <option value="">Which Track?</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Physical Health">Physical Health</option>
          </select>
          <textarea
            name="fi-text-questions"
            placeholder="Any questions?"
            className="input"
            rows={3}
          />

          {error && (
            <p className="text-red-400 bg-red-900/20 p-3 rounded">
              {error}
            </p>
          )}
          {status === 'success' && (
            <p className="text-green-400 bg-green-900/20 p-3 rounded">
              Registration submitted successfully! ✓
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-tiffany-blue text-gunmetal font-bold px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </section>
  );
}