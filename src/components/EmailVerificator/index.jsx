import { useAuthValue } from '../../context/AuthContext';

import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";

const EmailVerificationBanner = () => {
  const { user } = useAuthValue();
  const [message, setMessage] = useState("");

  const resendEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        setMessage("E-mail reenviado! Verifique sua caixa de entrada e sua caixa de spam.");
      } catch (error) {
        console.error(error);
        setMessage("Erro ao reenviar. Tente novamente mais tarde.");
      }
    }
  };

  if (user && !user.emailVerified) {
    return (
      <div className="email-warning">
        <p>Seu e-mail ainda não foi verificado.</p>
        
        {!message && (
          <button onClick={resendEmail}>Reenviar E-mail de Verificação</button>
        )}
        
        {message && <span>{message}</span>}

        <button onClick={() => window.location.reload()}>
          Já verifiquei (Atualizar)
        </button>
      </div>
    );
  }

  return null;
};

export default EmailVerificationBanner;