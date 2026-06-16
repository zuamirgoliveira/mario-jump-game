# 🎮 Super Mario Jump

![Mario Jump Game](https://img.shields.io/badge/version-1.0.0-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

Um jogo endless runner inspirado no clássico Super Mario, desenvolvido com HTML, CSS e JavaScript puro. Pule sobre os canos e acumule a maior pontuação possível!

## 🎯 Demo

[Live Demo](https://seu-demo-aqui.netlify.app) <!-- Adicione o link após o deploy -->

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Como Jogar](#como-jogar)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Roadmap](#roadmap)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎮 Sobre o Projeto

**Super Mario Jump** é um jogo endless runner onde você controla o Mario em uma aventura infinita. O objetivo é simples: pular sobre os canos que aparecem e sobreviver o máximo de tempo possível para acumular pontos.

### ✨ Características

- 🏃‍♂️ **Gameplay fluido** com animações suaves
- 📱 **Responsivo** e compatível com dispositivos móveis
- 🏆 **Sistema de High Score** com localStorage
- 🎨 **Design nostálgico** inspirado nos clássicos jogos Mario
- ⚡ **Performance otimizada** com requestAnimationFrame

## 🛠️ Tecnologias

- **HTML5** - Estrutura do jogo
- **CSS3** - Estilização e animações
- **JavaScript (ES6)** - Lógica do jogo e interatividade
- **LocalStorage** - Persistência de recordes

## 🎯 Funcionalidades

### Atuais
- ✅ Controles por teclado (Espaço) e toque (mobile)
- ✅ Sistema de pontuação em tempo real
- ✅ High Score persistente
- ✅ Animações de pulo e game over
- ✅ Nuvens e cenário em movimento
- ✅ Reinício rápido sem recarregar página

### Em Desenvolvimento
- 🔄 Dificuldade progressiva
- 🔄 Novos tipos de obstáculos
- 🔄 Efeitos sonoros
- 🔄 Power-ups e itens coletáveis

## 🎮 Como Jogar

### Controles

| Ação | Teclado | Mobile |
|------|---------|--------|
| Pular | `Espaço` | Toque na tela |

### Regras

1. O jogo começa automaticamente ao carregar
2. Pule sobre os canos para evitar colisão
3. Cada cano ultrapassado = 1 ponto
4. Se colidir com um cano, o jogo termina
5. Seu recorde é salvo automaticamente

### Dicas
- ⏱️ **Timing é tudo**: Pule no momento certo para passar pelos canos
- 📈 **Mantenha o foco**: Quanto mais tempo, maior a pontuação
- 📱 **Jogue em qualquer lugar**: Suporte total para dispositivos móveis

## 📦 Instalação

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- (Opcional) Servidor local para desenvolvimento

### Passos

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/super-mario-jump.git
cd super-mario-jump
```
2. Abra o arquivo index.html no seu navegador
3. Divirta-se! 🎉

📁 Estrutura do Projeto
super-mario-jump/
├── index.html              # Página principal do jogo
├── css/
│   └── style.css          # Estilos e animações
├── js/
│   └── script.js          # Lógica do jogo
├── images/                 # Assets do jogo
│   ├── mario-sprint.gif   # Sprite do Mario correndo
│   ├── mario-jump.svg     # Sprite do Mario pulando
│   ├── mario-pipe.png     # Obstáculo (cano)
│   ├── mario-grass.png    # Chão
│   ├── mario-game-over.png # Estado game over
│   ├── game_over.svg      # Tela de game over
│   ├── super-mario-bros-cloud*.png # Cenário (nuvens)
│   └── icons8-repeat-40.png # Ícone de reiniciar
├── README.md              # Documentação
└── LICENSE                # Licença (opcional)

🗺️ Roadmap
Sprint 1 - Bug Fixes ✅
Sistema de reinício sem reload

Correção de múltiplos pulos

Score para no game over

High Score com localStorage

Sprint 2 - Gameplay
Dificuldade progressiva (velocidade aumenta)

Novos tipos de obstáculos (pássaros, blocos)

Sistema de vidas (3 vidas)

Power-ups (escudo, ímã, etc.)

Sprint 3 - Experiência
Efeitos sonoros (Web Audio API)

Animações melhoradas

Partículas ao colidir

Transições suaves

Sprint 4 - Social
Tabela de líderes global

Compartilhar pontuação

Desafios diários

Conquistas/Medalhas

🤝 Contribuição
Contribuições são bem-vindas! Siga os passos abaixo:

Fork o projeto

Crie sua branch de feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

Diretrizes
Mantenha o código limpo e bem comentado

Teste antes de enviar

Atualize a documentação se necessário

Siga o padrão de commits semânticos

🐛 Reportar Bugs
Encontrou um bug? Abra uma issue com:

Descrição do problema

Passos para reproduzir

Comportamento esperado vs atual

Screenshots (se possível)

📄 Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.

🙏 Agradecimentos
Nintendo - Pela inspiração

Icons8 - Pelos ícones

Comunidade open-source por recursos e ferramentas

📊 Status do Projeto
https://img.shields.io/badge/status-em%2520desenvolvimento-yellow
https://img.shields.io/github/issues/seu-usuario/super-mario-jump
https://img.shields.io/github/stars/seu-usuario/super-mario-jump

Feito com ❤️ e muitos cafés ☕

⬆ Voltar ao topo
