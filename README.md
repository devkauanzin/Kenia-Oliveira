# Clínica Kênia Oliveira — Landing page

Landing page de tratamento de melasma (Método Raiz da Pele™). Site estático em HTML, CSS e JavaScript puros: não precisa de instalação nem de build.

## Estrutura

```
kenia-oliveira-site/
├── index.html          # página completa
├── css/styles.css      # estilos (cores e fonte nas variáveis do :root)
├── js/main.js          # menu móvel, dúvidas, animações e formulário → WhatsApp
├── assets/kenia-retrato.jpg
└── README.md
```

## Ver no computador

Abra o `index.html` no navegador (dois cliques no arquivo).

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo `kenia-oliveira-site`).
2. Envie todos os arquivos desta pasta para a raiz do repositório.
3. No repositório, vá em **Settings → Pages**, em *Source* escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`, e salve.
4. Em alguns minutos o site fica disponível em `https://SEU-USUARIO.github.io/kenia-oliveira-site/`.

## Onde editar

- **WhatsApp e link da agenda:** no topo de `js/main.js`, no objeto `CONFIG`.
- **Cores e fonte:** variáveis no início de `css/styles.css`.
- **Textos:** direto no `index.html`.

## Pendências (marcadas no site como [A CONFIRMAR])

- Endereço e horários de atendimento (rodapé e pergunta "Onde fica a clínica?").
- Trajetória e formações da Kênia (seção "Sobre").
- Confirmar a autorização de uso da foto `assets/kenia-retrato.jpg`.
- Depois de publicar, trocar `og:image` no `index.html` pelo endereço completo da imagem (ex.: `https://SEU-USUARIO.github.io/kenia-oliveira-site/assets/kenia-retrato.jpg`) para a prévia aparecer ao compartilhar o link.

## Formulário

O formulário não envia dados para nenhum servidor: ele valida nome, WhatsApp e autorização e abre uma conversa no WhatsApp da clínica com a mensagem pronta. Nada é armazenado no site.
