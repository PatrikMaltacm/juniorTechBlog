import { app } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const auth = getAuth(app);

  const createUser = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, { displayName: data.displayName });
      
      await sendEmailVerification(user);

      setLoading(false);
      return user;
    } catch (error) {
      let systemErrorMessage;
      switch (error.code) {
        case "auth/weak-password":
          systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
          break;
        case "auth/email-already-in-use":
          systemErrorMessage = "E-mail já cadastrado.";
          break;
        default:
          systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const login = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          systemErrorMessage = "Usuário não encontrado.";
          break;
        case "auth/wrong-password":
          systemErrorMessage = "Senha incorreta.";
          break;
        case "auth/invalid-credential":
          systemErrorMessage = "Verifique seus dados e tente novamente!";
          break;
        case "auth/too-many-requests":
          systemErrorMessage = "Muitas tentativas, tente novamente mais tarde!";
          break;
        default:
          systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};