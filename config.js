/**
 * Configurazione del profilo — ! crepuscolo
 * Modifica facilmente nome, bio, profili Discord, link social e wallet crypto qui sotto.
 */
window.PROFILE_CONFIG = {
  // Identità profilo
  name: "! crepuscolo",
  handle: "@crepuscolo",
  statusText: "crepuscoloabuse · online",
  location: "Italy",
  timezone: "Europe/Rome",

  // Profili Discord (primo profilo + secondo profilo, con presenza live automatica via Lanyard)
  discordProfiles: [
    {
      id: "981621521745334282",
      username: "crepuscoloabuse",
      tag: "Main",
      profileUrl: "https://discord.com/users/981621521745334282"
    },
    {
      id: "570089897671524363",
      username: "conto_bancario",
      tag: "Alt",
      profileUrl: "https://discord.com/users/570089897671524363"
    }
  ],
  enableLanyard: true,

  // Frasi bio con effetto macchina da scrivere
  bioLines: [
    "prima il futuro era nero, l'ho colorato io il cielo.",
    "c'est la vie · lost in twilight",
    "silenzio, stile e luci soffuse."
  ],

  // Assets locali (relativi per funzionare perfettamente su GitHub Pages)
  assets: {
    avatar: "assets/avatar.jpg",
    video: "assets/videoclip.mp4",
    audio: "assets/song.mp3",
    cover: "assets/cover.jpg"
  },

  // Dettagli brano
  song: {
    title: "C'est la vie",
    artist: "Capo Plaza",
    defaultVolume: 0.45,
    bpmFallback: 105 // usato solo se aperto localmente via file://
  },

  // Titolo animato della scheda del browser
  tabTitle: "! crepuscolo",

  // Visualizzazioni base (si aggiorna localmente ad ogni visita)
  baseViews: 1337,

  // Badge stile guns.lol (solo musica)
  badges: [
    { id: "music", label: "C'est la vie", icon: "music" }
  ],

  // Link social
  socials: [
    {
      name: "Discord",
      icon: "discord",
      type: "copy",
      value: "crepuscoloabuse",
      tooltip: "Copia Discord · crepuscoloabuse"
    },
    {
      name: "TikTok",
      icon: "tiktok",
      type: "link",
      url: "https://tiktok.com/@crepuscolarismoh",
      tooltip: "TikTok · @crepuscolarismoh"
    },
    {
      name: "GitHub",
      icon: "github",
      type: "link",
      url: "https://github.com/crepuscoloh",
      tooltip: "GitHub · crepuscoloh"
    }
  ],

  // Wallet Crypto (clicca per copiare l'indirizzo completo)
  wallets: [
    {
      name: "BTC",
      icon: "btc",
      address: "bc1qg4p89pzupfh3vrrg9ccdk5jskewkk80zqg5wn2",
      tooltip: "Copia indirizzo BTC",
      accent: "btc"
    },
    {
      name: "LTC",
      icon: "ltc",
      address: "ltc1ql85fselgzp3yvnyqeys08afscn0nfljjagrvv4",
      tooltip: "Copia indirizzo LTC",
      accent: "ltc"
    },
    {
      name: "SOL",
      icon: "sol",
      address: "FfBp6KUbvZMQJDMwytAXo2woFUHZTJPAHj6jiM9ozgHp",
      tooltip: "Copia indirizzo Solana",
      accent: "sol"
    }
  ]
};
