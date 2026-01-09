import React, { useState } from 'react';
import styles from './NewsletterForm.module.css';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);
    setLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail('');
      } else {
        setError(true);
        setMessage(data.message || 'Ocorreu um erro ao se inscrever.');
      }
    } catch (err) {
      setError(true);
      setMessage('Ocorreu um erro de rede. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.newsletterContainer}>
      <h3>Inscreva-se na nossa Newsletter!</h3>
      <p>Receba as últimas atualizações do blog diretamente na sua caixa de entrada.</p>
      <form onSubmit={handleSubmit} className={styles.newsletterForm}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.emailInput}
          disabled={loading}
        />
        <button type="submit" disabled={loading} className={styles.subscribeButton}>
          {loading ? 'Inscrevendo...' : 'Inscrever'}
        </button>
      </form>
      {message && (
        <p className={`${styles.message} ${error ? styles.errorMessage : styles.successMessage}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;
