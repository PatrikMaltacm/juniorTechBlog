import { useAuthentication } from "../../hooks/useAuthentication"
import styles from "./Register.module.css"
import { useState, useEffect } from "react"

const Register = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [condfirmPassword, setCondfirmPassword] = useState('')

  const [error, setError] = useState("")

  const { createUser, error: authError, loading } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user = {
      displayName,
      email,
      password
    }

    if(password !== condfirmPassword){
      setError("A senhas devem ser iguais!")
      return
    }

    const res = await createUser(user)
  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para compartilhar</h1>
      <p>Junte-se a nossa comunidade</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome de Usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail de Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirme a senha</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            value={condfirmPassword}
            onChange={(e) => setCondfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn" type="submit">Cadastrar</button>}
        {loading && <button className="btn" type="submit" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register