# JuniorTechBlog

Uma plataforma de blog dinâmica construída com React, Vite e Firebase, projetada para compartilhar e interagir com conteúdo de tecnologia. As funcionalidades incluem autenticação de usuário, gerenciamento de posts, comentários, curtidas e um painel de usuário personalizado.

## Principais Funcionalidades

*   **Autenticação de Usuário:** Funcionalidades de registro, login e logout.
*   **Gerenciamento de Posts:** Criar, Ler, Atualizar e Excluir (CRUD) posts de blog.
*   **Sistema de Comentários:** Usuários podem comentar nas postagens.
*   **Funcionalidade de Curtir:** Expresse apreço pelas postagens.
*   **Painel e Perfil do Usuário:** Gerencie suas postagens e visualize seu perfil.
*   **Funcionalidade de Busca:** Encontre facilmente postagens por título ou tags.
*   **Design Responsivo:** Otimizado para vários tamanhos de tela.
*   **Integração com Firebase:** Utiliza Firebase para Autenticação, Banco de Dados Firestore e Analytics.

## Tecnologias Utilizadas

*   **Frontend:** React, Vite
*   **Estilização:** CSS Modules
*   **Gerenciamento de Estado:** React Context API (AuthContext, ThemeContext)
*   **Backend/Banco de Dados:** Firebase (Autenticação, Firestore)
*   **Roteamento:** React Router DOM
*   **Análise de Código:** ESLint

## Instalação

Para ter uma cópia local funcionando, siga estes passos simples.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/juniorTechBlog.git # Substitua pela URL real do seu repositório
    cd juniorTechBlog
    ```
2.  **Instale os pacotes NPM:**
    ```bash
    npm install
    ```
3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto. Copie o conteúdo do `.env.example` e preencha com as credenciais do seu projeto Firebase.
    Exemplo de conteúdo `.env`:
    ```
    VITE_FIREBASE_API_KEY="SUA_CHAVE_API_FIREBASE"
    VITE_FIREBASE_AUTH_DOMAIN="SEU_DOMINIO_AUTH_FIREBASE"
    VITE_FIREBASE_PROJECT_ID="SEU_ID_PROJETO_FIREBASE"
    VITE_FIREBASE_STORAGE_BUCKET="SEU_BUCKET_STORAGE_FIREBASE"
    VITE_FIREBASE_MESSAGING_SENDER_ID="SEU_ID_MENSAGEIRO_FIREBASE"
    VITE_FIREBASE_APP_ID="SEU_ID_APP_FIREBASE"
    VITE_FIREBASE_MEASUREMENT_ID="SEU_ID_MEDICAO_FIREBASE"
    ```
    *Certifique-se de que este arquivo `.env` esteja no seu `.gitignore` e nunca seja enviado para o controle de versão.*

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

## Contribuindo

Contribuições são o que tornam a comunidade open-source um lugar tão incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer é **muito apreciada**.

Por favor, consulte o arquivo `CONTRIBUTING.md` para diretrizes detalhadas sobre como contribuir para este projeto.

## Licença

Distribuído sob a Licença MIT. Consulte `LICENSE` para mais informações.

## Contato

Seu Nome - seu_email@example.com
Link do Projeto: [https://github.com/seu-usuario/juniorTechBlog](https://github.com/seu-usuario/juniorTechBlog) # Substitua pela URL real do seu repositório