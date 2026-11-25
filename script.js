(() => {
  "use strict";

  const CFG = window.PROFILE_CONFIG || {};
  const root = document.documentElement;
  const body = document.body;

  // DOM References
  const enterScreen = document.getElementById("enter-screen");
  const bgVideo = document.getElementById("bg-video");
  const bgAudio = document.getElementById("bg-audio");
  const fxCanvas = document.getElementById("fx-canvas");
  const ctx = fxCanvas.getContext("2d", { alpha: true });

  const profileAvatar = document.getElementById("profile-avatar");
  const avatarWrapper = document.getElementById("avatar-wrapper");
  const statusBadge = document.getElementById("status-badge");
  const profileNameEl = document.getElementById("profile-name");
  const nameSparklesEl = document.getElementById("name-sparkles");
  const bioTextEl = document.getElementById("bio-text");
  const badgesRow = document.getElementById("badges-row");
  const profileLocationEl = document.getElementById("profile-location");
  const viewCountEl = document.getElementById("view-count");
  const socialsRow = document.getElementById("socials-row");
  const discordList = document.getElementById("discord-list");

  const trackCover = document.getElementById("track-cover");
  const trackTitle = document.getElementById("track-title");
  const trackArtist = document.getElementById("track-artist");
  const visualizerBars = Array.from(document.querySelectorAll("#visualizer span"));
  const progressTrack = document.getElementById("progress-track");
  const progressFill = document.getElementById("progress-fill");
  const timeCurrentEl = document.getElementById("time-current");
  const timeDurationEl = document.getElementById("time-duration");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const iconPlay = document.getElementById("icon-play");
  const iconPause = document.getElementById("icon-pause");

  const muteBtn = document.getElementById("mute-btn");
  const volIconOn = document.getElementById("vol-icon-on");
  const volIconOff = document.getElementById("vol-icon-off");
  const volumeSlider = document.getElementById("volume-slider");
  const italyClockEl = document.getElementById("italy-clock");
  const toastEl = document.getElementById("toast");

  const cursorCore = document.getElementById("cursor-core");
  const cursorRing = document.getElementById("cursor-ring");

  // =========================================================================
  // Inline SVG Icon Library (Crisp, Cohesive, Zero External Dependencies)
  // =========================================================================

  const BADGE_ICONS = {
    sparkle: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/></svg>`,
    verified: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.6 2.1 3.3-.3 1.2 3.1 2.9 1.6-.8 3.2.8 3.2-2.9 1.6-1.2 3.1-3.3-.3L12 22l-2.6-2.1-3.3.3-1.2-3.1-2.9-1.6.8-3.2-.8-3.2 2.9-1.6 1.2-3.1 3.3.3L12 2Z"/><path d="M9 12.2l2 2 4.2-4.2"/></svg>`,
    crown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18l-1.5-10-4.5 4-3-6-3 6-4.5-4L3 18Z"/><path d="M5 21h14"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    music: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`
  };

  const SOCIAL_ICONS = {
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z"/></svg>`,
    discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.61 1.25a18.27 18.27 0 0 0-5.49 0 12.64 12.64 0 0 0-.62-1.25.08.08 0 0 0-.08-.04A19.74 19.74 0 0 0 3.67 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.23-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.13c.13-.09.25-.19.37-.29a.08.08 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.08.08 0 0 1 .08.01c.12.1.25.2.37.29a.08.08 0 0 1-.01.13 12.3 12.3 0 0 1-1.87.9.08.08 0 0 0-.04.11c.36.7.77 1.37 1.22 2a.08.08 0 0 0 .08.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z"/></svg>`,
    spotify: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.59 14.42a.62.62 0 0 1-.85.21c-2.34-1.43-5.29-1.75-8.76-.96a.62.62 0 1 1-.28-1.22c3.8-.87 7.06-.5 9.68 1.11.29.18.38.57.21.86Zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.68-1.65-6.77-2.13-9.94-1.16a.78.78 0 1 1-.45-1.49c3.62-1.1 8.12-.57 11.2 1.33.36.22.48.7.26 1.06Zm.11-2.84C14.7 8.95 9.4 8.77 6.32 9.71a.94.94 0 1 1-.54-1.79c3.53-1.07 9.39-.86 13.09 1.34a.94.94 0 0 1-.95 1.6Z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 8.84 21.5c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>`,
    btc: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.65 11.45c1.12-.52 1.84-1.46 1.67-2.92-.22-1.86-1.69-2.55-3.68-2.74V3.5h-1.5v2.22h-1.2V3.5h-1.5v2.25H6.5v1.6h1.1c.54 0 .74.26.74.7v7.9c0 .44-.2.7-.74.7H6.5v1.6h2.94V20.5h1.5v-2.22h1.2v2.22h1.5v-2.26c2.53-.15 4.28-1.12 4.54-3.36.2-1.7-.64-2.85-2.53-3.43Zm-5.2-4.1h1.93c1.12 0 2.02.34 2.02 1.44 0 1.15-.9 1.54-2.02 1.54h-1.93V7.35Zm2.38 9.28h-2.38v-3.28h2.38c1.38 0 2.38.45 2.38 1.66 0 1.24-.98 1.62-2.38 1.62Z"/></svg>`,
    ltc: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.95 4h-3.1L7.8 11.72 6 12.38l-.52 1.98 1.8-.66L6.1 18.2h11.35l.65-2.55H10.5l.88-3.36 2.66-.96.52-1.98-2.66.96L12.95 4Z"/></svg>`,
    sol: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.62 15.86a.72.72 0 0 1 .51-.21h13.52c.32 0 .48.39.25.62l-2.37 2.37a.72.72 0 0 1-.51.21H3.5a.36.36 0 0 1-.25-.62l2.37-2.37Zm0-10.5a.72.72 0 0 1 .51-.21h13.52c.32 0 .48.39.25.62l-2.37 2.37a.72.72 0 0 1-.51.21H3.5a.36.36 0 0 1-.25-.62l2.37-2.37Zm12.01 5.23a.72.72 0 0 0-.51-.21H3.6a.36.36 0 0 0-.25.62l2.37 2.37c.13.13.32.21.51.21h13.52c.32 0 .48-.39.25-.62l-2.37-2.37Z"/></svg>`
  };

  // =========================================================================
  // State
  // =========================================================================

  let hasEntered = false;
  let isPlaying = false;
  let isMuted = false;
  let targetVolume = CFG.song?.defaultVolume ?? 0.45;
  let isDraggingProgress = false;

  // Web Audio API state
  let audioCtx = null;
  let analyser = null;
  let freqData = null;
  let useRealAudioAnalysis = false;

  // Smoothed audio metrics
  const audioMetrics = {
    bass: 0,
    mid: 0,
    energy: 0,
    beat: 0,
    avgBass: 0.16,
    lastBeatTime: 0,
    bars: new Float32Array(7)
  };

  // Toast timer
  let toastTimer = null;

  // =========================================================================
  // Utility Helpers
  // =========================================================================

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 2400);
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function copyToClipboard(text) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {
      // Ignore fallback errors
    }
    ta.remove();
  }

  function shortAddress(addr) {
    if (!addr || addr.length <= 16) return addr || "";
    return `${addr.slice(0, 8)}…${addr.slice(-5)}`;
  }

  // =========================================================================
  // 1. Hydrate Profile UI from config.js
  // =========================================================================

  function hydrateProfile() {
    if (CFG.name) profileNameEl.textContent = CFG.name;
    if (CFG.location) profileLocationEl.textContent = CFG.location;
    if (CFG.statusText) statusBadge.setAttribute("data-tooltip", CFG.statusText);

    if (CFG.assets) {
      if (CFG.assets.avatar) profileAvatar.src = CFG.assets.avatar;
      if (CFG.assets.cover) trackCover.src = CFG.assets.cover;
      if (CFG.assets.video && bgVideo.getAttribute("src") !== CFG.assets.video) {
        bgVideo.src = CFG.assets.video;
      }
      if (CFG.assets.audio && bgAudio.getAttribute("src") !== CFG.assets.audio) {
        bgAudio.src = CFG.assets.audio;
      }
    }

    if (CFG.song) {
      if (CFG.song.title) trackTitle.textContent = CFG.song.title;
      if (CFG.song.artist) trackArtist.textContent = CFG.song.artist;
    }

    // Render badges
    badgesRow.innerHTML = "";
    (CFG.badges || []).forEach((badge) => {
      const span = document.createElement("span");
      span.className = "badge-item";
      span.setAttribute("data-tooltip", badge.label);
      span.setAttribute("aria-label", badge.label);
      span.innerHTML = BADGE_ICONS[badge.icon] || BADGE_ICONS.sparkle;
      badgesRow.appendChild(span);
    });

    // Render social links & crypto wallets
    socialsRow.innerHTML = "";
    const socials = CFG.socials || [];
    const wallets = CFG.wallets || [];

    socials.forEach((item) => {
      const iconHtml = SOCIAL_ICONS[item.icon] || SOCIAL_ICONS.github;

      if (item.type === "copy") {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "social-btn";
        btn.setAttribute("data-tooltip", item.tooltip || `Copia ${item.name}`);
        btn.setAttribute("aria-label", item.name);
        btn.innerHTML = iconHtml;
        btn.addEventListener("click", (e) => {
          const val = item.value || "";
          copyToClipboard(val);
          showToast(`${item.name} copiato: ${val}`);
          const rect = btn.getBoundingClientRect();
          spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
          e.stopPropagation();
        });
        socialsRow.appendChild(btn);
      } else {
        const a = document.createElement("a");
        a.className = "social-btn";
        a.href = item.url || "#";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute("data-tooltip", item.tooltip || item.name);
        a.setAttribute("aria-label", item.name);
        a.innerHTML = iconHtml;
        socialsRow.appendChild(a);
      }
    });

    if (socials.length && wallets.length) {
      const sep = document.createElement("span");
      sep.className = "socials-sep";
      sep.setAttribute("aria-hidden", "true");
      socialsRow.appendChild(sep);
    }

    wallets.forEach((wallet) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `social-btn${wallet.accent ? ` accent-${wallet.accent}` : ""}`;
      btn.setAttribute("data-tooltip", wallet.tooltip || `Copia ${wallet.name}`);
      btn.setAttribute("aria-label", `Copia indirizzo ${wallet.name}`);
      btn.innerHTML = SOCIAL_ICONS[wallet.icon] || SOCIAL_ICONS.btc;
      btn.addEventListener("click", (e) => {
        copyToClipboard(wallet.address);
        showToast(`${wallet.name} copiato · ${shortAddress(wallet.address)}`);
        const rect = btn.getBoundingClientRect();
        spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
        e.stopPropagation();
      });
      socialsRow.appendChild(btn);
    });

    // Hydrate Discord cards (Main + Alt + Lanyard live)
    initDiscordWidgets();

    // Initialize Volume Slider
    volumeSlider.value = String(targetVolume);
    bgAudio.volume = targetVolume;
  }

  function initDiscordWidgets() {
    if (!discordList) return;
    const profiles = Array.isArray(CFG.discordProfiles) ? CFG.discordProfiles : [];
    discordList.innerHTML = "";
    if (!profiles.length) return;

    const cardMap = new Map();

    profiles.forEach((profile, index) => {
      const card = document.createElement("div");
      card.className = "discord-pill";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `Copia username Discord ${profile.username}`);

      const avatarSrc = CFG.assets?.avatar || "assets/avatar.jpg";
      const tagLabel = profile.tag || "Discord";

      card.innerHTML = `
        <div class="discord-avatar-wrap">
          <img class="discord-avatar-img" src="${avatarSrc}" alt="${profile.username}" draggable="false" />
          <span class="discord-status-dot status-default" aria-hidden="true"></span>
        </div>
        <div class="discord-meta">
          <div class="discord-top-line">
            <svg class="discord-mini-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.61 1.25a18.27 18.27 0 0 0-5.49 0 12.64 12.64 0 0 0-.62-1.25.08.08 0 0 0-.08-.04A19.74 19.74 0 0 0 3.67 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.23-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.13c.13-.09.25-.19.37-.29a.08.08 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.08.08 0 0 1 .08.01c.12.1.25.2.37.29a.08.08 0 0 1-.01.13 12.3 12.3 0 0 1-1.87.9.08.08 0 0 0-.04.11c.36.7.77 1.37 1.22 2a.08.08 0 0 0 .08.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z"/>
            </svg>
            <span class="discord-username">${profile.username}</span>
            <span class="discord-state-tag">${tagLabel}</span>
          </div>
          <p class="discord-activity">clicca per copiare il tag</p>
        </div>
        <div class="discord-actions">
          <a
            class="discord-action-btn"
            href="${profile.profileUrl || `https://discord.com/users/${profile.id}`}"
            target="_blank"
            rel="noopener noreferrer"
            data-tooltip="Apri profilo Discord"
            aria-label="Apri profilo Discord ${profile.username}"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      `;

      const handleCopy = (e) => {
        if (e.target && e.target.closest(".discord-action-btn")) return;
        const val = profile.username || profile.id;
        copyToClipboard(val);
        showToast(`Discord copiato: ${val}`);
        const rect = card.getBoundingClientRect();
        spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);
        e.stopPropagation();
      };

      card.addEventListener("click", handleCopy);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCopy(e);
        }
      });

      discordList.appendChild(card);

      if (profile.id) {
        cardMap.set(profile.id, {
          isPrimary: index === 0,
          defaultTag: tagLabel,
          defaultUsername: profile.username,
          avatarEl: card.querySelector(".discord-avatar-img"),
          statusDot: card.querySelector(".discord-status-dot"),
          usernameEl: card.querySelector(".discord-username"),
          stateTag: card.querySelector(".discord-state-tag"),
          activityEl: card.querySelector(".discord-activity")
        });
      }
    });

    const ids = Array.from(cardMap.keys());
    if (CFG.enableLanyard && ids.length && window.location.protocol !== "file:") {
      connectLanyardPresence(ids, cardMap);
    }
  }

  function connectLanyardPresence(userIds, cardMap) {
    let ws = null;
    let heartbeatTimer = null;

    function applyPresenceForUser(userId, d) {
      const refs = cardMap.get(userId);
      if (!refs || !d || !d.discord_user) return;
      const u = d.discord_user;

      if (u.username) {
        refs.usernameEl.textContent = u.username;
      }

      if (u.avatar) {
        const ext = u.avatar.startsWith("a_") ? "gif" : "png";
        refs.avatarEl.src = `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${ext}?size=128`;
      }

      const status = d.discord_status || "offline";
      const statusLabels = {
        online: "Online",
        idle: "Idle",
        dnd: "DND",
        offline: "Offline"
      };

      refs.statusDot.className = `discord-status-dot status-${status}`;
      refs.stateTag.textContent = `${refs.defaultTag} · ${statusLabels[status] || "Online"}`;

      if (refs.isPrimary) {
        statusBadge.setAttribute(
          "data-tooltip",
          `${u.username || refs.defaultUsername} · ${(statusLabels[status] || "online").toLowerCase()}`
        );
      }

      if (d.listening_to_spotify && d.spotify) {
        refs.activityEl.textContent = `Listening to ${d.spotify.song} — ${d.spotify.artist}`;
      } else if (Array.isArray(d.activities) && d.activities.length) {
        const custom = d.activities.find((a) => a.type === 4 && a.state);
        const game = d.activities.find((a) => a.type === 0 && a.name);
        if (game) {
          refs.activityEl.textContent = `Playing ${game.name}${game.details ? ` · ${game.details}` : ""}`;
        } else if (custom) {
          refs.activityEl.textContent = custom.state;
        } else {
          refs.activityEl.textContent = "clicca per copiare il tag";
        }
      } else {
        refs.activityEl.textContent = "clicca per copiare il tag";
      }
    }

    try {
      ws = new WebSocket("wss://api.lanyard.rest/socket");

      ws.addEventListener("message", (event) => {
        let msg;
        try {
          msg = JSON.parse(event.data);
        } catch {
          return;
        }

        if (msg.op === 1 && msg.d && msg.d.heartbeat_interval) {
          ws.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: userIds } }));
          clearInterval(heartbeatTimer);
          heartbeatTimer = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, msg.d.heartbeat_interval);
        } else if (msg.op === 0 && msg.t === "INIT_STATE" && msg.d) {
          Object.entries(msg.d).forEach(([uid, payload]) => {
            applyPresenceForUser(uid, payload);
          });
        } else if (msg.op === 0 && msg.t === "PRESENCE_UPDATE" && msg.d) {
          const uid = msg.d.user_id || msg.d.discord_user?.id;
          if (uid) applyPresenceForUser(uid, msg.d);
        }
      });

      ws.addEventListener("close", () => {
        clearInterval(heartbeatTimer);
      });

      ws.addEventListener("error", () => {
        clearInterval(heartbeatTimer);
      });
    } catch {
      // Silently fall back to static Discord cards
    }
  }

  // =========================================================================
  // 2. View Counter, Live Italy Clock & Dynamic Animated Tab Title
  // =========================================================================

  function initViewCounter() {
    const key = "crepuscolo_profile_views";
    const base = Number(CFG.baseViews) || 1337;
    let stored = Number(localStorage.getItem(key));
    if (!Number.isFinite(stored) || stored < base) {
      stored = base;
    } else {
      stored += 1;
    }
    localStorage.setItem(key, String(stored));

    // Smooth count-up animation
    const startVal = Math.max(0, stored - 42);
    const startTime = performance.now();
    const duration = 950;

    function tick(now) {
      const p = clamp((now - startTime) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(startVal + (stored - startVal) * eased);
      viewCountEl.textContent = val.toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initItalyClock() {
    const tz = CFG.timezone || "Europe/Rome";
    const fmt = new Intl.DateTimeFormat("it-IT", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });

    function update() {
      italyClockEl.textContent = fmt.format(new Date());
    }
    update();
    setInterval(update, 1000);
  }

  function initDynamicTabTitle() {
    const fullTitle = CFG.tabTitle || "! crepuscolo";
    let index = 1;
    let deleting = false;

    function step() {
      document.title = fullTitle.slice(0, index) || "✦";
      if (!deleting) {
        if (index < fullTitle.length) {
          index++;
          setTimeout(step, 190);
        } else {
          deleting = true;
          setTimeout(step, 2600);
        }
      } else {
        if (index > 1) {
          index--;
          setTimeout(step, 110);
        } else {
          deleting = false;
          setTimeout(step, 520);
        }
      }
    }
    setTimeout(step, 900);
  }

  // =========================================================================
  // 3. Typewriter Bio & guns.lol Username Floating Sparkles
  // =========================================================================

  function initTypewriter() {
    const lines =
      Array.isArray(CFG.bioLines) && CFG.bioLines.length
        ? CFG.bioLines
        : ["c'est la vie · italy"];

    let lineIdx = 0;
    let charIdx = 0;
    let erasing = false;

    function loop() {
      const current = lines[lineIdx];
      if (!erasing) {
        charIdx++;
        bioTextEl.textContent = current.slice(0, charIdx);
        if (charIdx >= current.length) {
          erasing = true;
          setTimeout(loop, 2400);
        } else {
          setTimeout(loop, 46 + Math.random() * 34);
        }
      } else {
        charIdx--;
        bioTextEl.textContent = current.slice(0, charIdx);
        if (charIdx <= 0) {
          erasing = false;
          lineIdx = (lineIdx + 1) % lines.length;
          setTimeout(loop, 420);
        } else {
          setTimeout(loop, 24);
        }
      }
    }

    setTimeout(loop, 350);
  }

  function initNameSparkles() {
    const colors = ["#ffffff", "#ffe4e8", "#ff8da0", "#f2526b"];

    function spawnOne() {
      if (document.hidden) return;
      const el = document.createElement("span");
      el.className = "name-sparkle";
      el.style.left = `${6 + Math.random() * 88}%`;
      el.style.top = `${10 + Math.random() * 80}%`;
      el.style.setProperty("--sz", `${7 + Math.random() * 6}px`);
      el.style.setProperty("--dur", `${1.5 + Math.random() * 1.1}s`);
      el.style.setProperty("--col", colors[Math.floor(Math.random() * colors.length)]);
      el.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L14.3 9.7L23 12L14.3 14.3L12 23L9.7 14.3L1 12L9.7 9.7L12 1Z"/></svg>`;
      nameSparklesEl.appendChild(el);
      setTimeout(() => el.remove(), 2700);
    }

    setInterval(spawnOne, 440);
  }

  // =========================================================================
  // 4. Web Audio API Analyser + Synced Video/Audio Player Engine
  // =========================================================================

  function setupAudioAnalyser() {
    // On file:// protocol, MediaElementSource can be silenced by browser CORS rules.
    // On http(s):// (GitHub Pages / localhost), hook real-time FFT AnalyserNode!
    if (window.location.protocol === "file:") {
      useRealAudioAnalysis = false;
      return;
    }

    try {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) return;

      audioCtx = new AudioContextCtor();
      const source = audioCtx.createMediaElementSource(bgAudio);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.78;

      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      freqData = new Uint8Array(analyser.frequencyBinCount);
      useRealAudioAnalysis = true;
    } catch {
      useRealAudioAnalysis = false;
    }
  }

  function fadeInAudio(targetVol, durationMs = 1100) {
    bgAudio.volume = 0;
    const start = performance.now();
    function step(now) {
      if (isMuted) {
        bgAudio.volume = 0;
        return;
      }
      const p = clamp((now - start) / durationMs, 0, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      bgAudio.volume = clamp(targetVol * eased, 0, 1);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function updatePlayUI(playing) {
    isPlaying = playing;
    iconPlay.classList.toggle("hidden", playing);
    iconPause.classList.toggle("hidden", !playing);
  }

  function updateVolumeUI() {
    const mutedState = isMuted || targetVolume <= 0.001;
    volIconOn.classList.toggle("hidden", mutedState);
    volIconOff.classList.toggle("hidden", !mutedState);
    volumeSlider.value = mutedState ? "0" : String(targetVolume);
  }

  async function enterExperience() {
    if (hasEntered) return;
    hasEntered = true;

    enterScreen.classList.add("is-hidden");
    body.classList.add("is-entered");
    initViewCounter();

    // Release entrance transition after spring-in so 3D tilt runs at 60fps
    setTimeout(() => {
      body.classList.add("tilt-ready");
      enterScreen.style.display = "none";
    }, 900);

    // Subtle celebration stardust from center
    spawnBurst(window.innerWidth / 2, window.innerHeight / 2, 22);

    // Setup Web Audio API
    setupAudioAnalyser();
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    // Lock both video & song from 0:00 for perfect videoclip sync!
    try {
      bgAudio.currentTime = 0;
      bgVideo.currentTime = 0;
    } catch {
      // Ignore if media isn't seekable yet
    }

    bgVideo.muted = true;
    const videoPromise = bgVideo.play();
    if (videoPromise) videoPromise.catch(() => {});

    try {
      await bgAudio.play();
      fadeInAudio(targetVolume, 1150);
      updatePlayUI(true);
    } catch {
      updatePlayUI(false);
    }
  }

  function togglePlayPause() {
    if (!hasEntered) {
      enterExperience();
      return;
    }

    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    if (bgAudio.paused) {
      syncVideoToAudio(true);
      bgAudio.play().then(() => {
        bgVideo.play().catch(() => {});
        updatePlayUI(true);
      }).catch(() => {});
    } else {
      bgAudio.pause();
      bgVideo.pause();
      updatePlayUI(false);
    }
  }

  function syncVideoToAudio(force = false) {
    if (!bgVideo.duration || !Number.isFinite(bgAudio.currentTime)) return;
    const targetTime = bgAudio.currentTime % bgVideo.duration;
    const drift = Math.abs(bgVideo.currentTime - targetTime);
    if (force || drift > 0.35) {
      try {
        bgVideo.currentTime = targetTime;
      } catch {
        // Ignore seek error while loading
      }
    }
  }

  function seekFromClientX(clientX) {
    const rect = progressTrack.getBoundingClientRect();
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const dur = bgAudio.duration || 186;
    const nextTime = ratio * dur;
    bgAudio.currentTime = nextTime;
    syncVideoToAudio(true);
    updateProgressUI();
  }

  function updateProgressUI() {
    const dur = bgAudio.duration || 0;
    const cur = bgAudio.currentTime || 0;
    const pct = dur > 0 ? clamp((cur / dur) * 100, 0, 100) : 0;
    progressFill.style.width = `${pct}%`;
    progressTrack.setAttribute("aria-valuenow", String(Math.round(pct)));
    timeCurrentEl.textContent = formatTime(cur);
    if (dur > 0) {
      timeDurationEl.textContent = formatTime(dur);
    }
  }

  function sampleAudioFrame(now) {
    let rawBass = 0;
    let rawMid = 0;
    let rawEnergy = 0;

    if (isPlaying && !bgAudio.paused) {
      if (useRealAudioAnalysis && analyser && freqData) {
        analyser.getByteFrequencyData(freqData);

        // Sub-bass & kick punch (bins 0..6)
        let bassSum = 0;
        for (let i = 0; i <= 6; i++) bassSum += freqData[i];
        rawBass = bassSum / (7 * 255);

        // Vocals & mids (bins 7..26)
        let midSum = 0;
        for (let i = 7; i <= 26; i++) midSum += freqData[i];
        rawMid = midSum / (20 * 255);

        // Overall energy (bins 0..55)
        let energySum = 0;
        for (let i = 0; i <= 55; i++) energySum += freqData[i];
        rawEnergy = energySum / (56 * 255);

        // Map 7 frequency slices to visualizer bars
        const bands = [
          [1, 3],
          [3, 6],
          [6, 10],
          [10, 16],
          [16, 24],
          [24, 36],
          [36, 52]
        ];
        for (let b = 0; b < 7; b++) {
          let sum = 0;
          const [start, end] = bands[b];
          for (let k = start; k < end; k++) sum += freqData[k];
          const avg = sum / ((end - start) * 255);
          audioMetrics.bars[b] = audioMetrics.bars[b] * 0.45 + avg * 0.55;
        }
      } else {
        // Smooth musical BPM envelope fallback (used only over file://)
        const bpm = CFG.song?.bpmFallback || 105;
        const beatPhase = ((bgAudio.currentTime || now * 0.001) * bpm) / 60;
        const frac = beatPhase % 1;
        const kick = Math.pow(Math.max(0, 1 - frac * 2.6), 2.2);
        const sway = 0.5 + 0.5 * Math.sin(beatPhase * Math.PI * 0.5);
        rawBass = clamp(0.18 + kick * 0.62, 0, 1);
        rawMid = clamp(0.22 + sway * 0.38, 0, 1);
        rawEnergy = clamp(0.24 + kick * 0.42 + sway * 0.16, 0, 1);

        for (let b = 0; b < 7; b++) {
          const wave = 0.5 + 0.5 * Math.sin(now * 0.0065 + b * 0.95);
          const v = clamp((b < 2 ? kick * 0.85 : wave * 0.65) + 0.12, 0.08, 1);
          audioMetrics.bars[b] = audioMetrics.bars[b] * 0.5 + v * 0.5;
        }
      }
    } else {
      for (let b = 0; b < 7; b++) {
        audioMetrics.bars[b] *= 0.86;
      }
    }

    // Smooth metrics for organic cinema feel
    const punchBass = Math.pow(clamp(rawBass, 0, 1), 1.35);
    audioMetrics.bass += (punchBass - audioMetrics.bass) * 0.24;
    audioMetrics.mid += (rawMid - audioMetrics.mid) * 0.2;
    audioMetrics.energy += (rawEnergy - audioMetrics.energy) * 0.18;

    // Adaptive beat onset detector
    audioMetrics.avgBass = audioMetrics.avgBass * 0.96 + punchBass * 0.04;
    const isBeatHit =
      isPlaying &&
      punchBass > Math.max(0.24, audioMetrics.avgBass * 1.24) &&
      now - audioMetrics.lastBeatTime > 260;

    if (isBeatHit) {
      audioMetrics.beat = 1;
      audioMetrics.lastBeatTime = now;
      spawnBeatRipple();
    } else {
      audioMetrics.beat *= 0.89;
      if (audioMetrics.beat < 0.005) audioMetrics.beat = 0;
    }

    // Push CSS vars for ultra-smooth GPU video/card/aura reactivity
    root.style.setProperty("--bass", audioMetrics.bass.toFixed(3));
    root.style.setProperty("--mid", audioMetrics.mid.toFixed(3));
    root.style.setProperty("--energy", audioMetrics.energy.toFixed(3));
    root.style.setProperty("--beat", audioMetrics.beat.toFixed(3));

    // Update live visualizer bars
    for (let i = 0; i < visualizerBars.length; i++) {
      const h = 3 + audioMetrics.bars[i] * 13;
      visualizerBars[i].style.height = `${h.toFixed(1)}px`;
    }
  }

  // =========================================================================
  // 5. Interactive FX Canvas (Twilight Embers, Cute Cursor Trail & Ripples)
  // =========================================================================

  let canvasW = 0;
  let canvasH = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  const ambientParticles = [];
  const trailParticles = [];
  const ripples = [];

  const mouse = {
    x: -200,
    y: -200,
    lastTrailX: -200,
    lastTrailY: -200,
    visible: false
  };

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;
    fxCanvas.width = Math.floor(canvasW * dpr);
    fxCanvas.height = Math.floor(canvasH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createAmbientParticle(randomY = true) {
    const palette = [
      "rgba(255, 240, 243,",
      "rgba(255, 168, 182,",
      "rgba(232, 74, 98,"
    ];
    return {
      x: Math.random() * canvasW,
      y: randomY ? Math.random() * canvasH : canvasH + 16,
      r: 0.9 + Math.random() * 2.1,
      vy: -(0.14 + Math.random() * 0.42),
      vx: (Math.random() - 0.5) * 0.22,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.006 + Math.random() * 0.012,
      alpha: 0.18 + Math.random() * 0.46,
      color: palette[Math.floor(Math.random() * palette.length)],
      isStar: Math.random() < 0.28
    };
  }

  function initAmbientParticles() {
    ambientParticles.length = 0;
    const count = canvasW < 640 ? 22 : 44;
    for (let i = 0; i < count; i++) {
      ambientParticles.push(createAmbientParticle(true));
    }
  }

  function spawnTrailParticle(x, y, forceKind = null) {
    if (trailParticles.length > 95) return;
    const r = Math.random();
    const kind = forceKind || (r < 0.22 ? "heart" : r < 0.62 ? "star" : "dot");
    const colors = ["#fff5f7", "#ffb3c0", "#f2526b"];
    trailParticles.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.75,
      vy: 0.25 + Math.random() * 0.65,
      size: kind === "heart" ? 5.2 + Math.random() * 2.4 : kind === "star" ? 4.2 + Math.random() * 3.2 : 1.8 + Math.random() * 1.8,
      life: 1,
      decay: 0.02 + Math.random() * 0.015,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.08,
      kind,
      color: kind === "heart" ? "#ff6f87" : colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function spawnBurst(x, y, count = 14) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 1.1 + Math.random() * 2.8;
      const kind = i % 5 === 0 ? "heart" : i % 2 === 0 ? "star" : "dot";
      trailParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3,
        size: kind === "heart" ? 6.5 : kind === "star" ? 5.2 : 2.3,
        life: 1,
        decay: 0.022 + Math.random() * 0.014,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.14,
        kind,
        color: kind === "heart" ? "#ff5c77" : i % 3 === 0 ? "#ffb6c3" : "#fff5f7"
      });
    }

    ripples.push({
      x,
      y,
      r: 4,
      maxR: 62,
      alpha: 0.55,
      lineWidth: 1.3,
      color: "255, 196, 206"
    });
  }

  function spawnBeatRipple() {
    if (ripples.length > 5) return;
    ripples.push({
      x: canvasW / 2,
      y: canvasH / 2,
      r: Math.min(canvasW, canvasH) * 0.16,
      maxR: Math.max(canvasW, canvasH) * 0.52,
      alpha: 0.22,
      lineWidth: 1.2,
      color: "232, 74, 98"
    });
  }

  function drawFourPointStar(x, y, size, rot, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = "rgba(242, 82, 107, 0.75)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    const inner = size * 0.28;
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      ctx.lineTo(Math.cos(a) * size, Math.sin(a) * size);
      ctx.lineTo(Math.cos(a + Math.PI / 4) * inner, Math.sin(a + Math.PI / 4) * inner);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawMiniHeart(x, y, size, rot, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot * 0.25);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = "rgba(242, 82, 107, 0.8)";
    ctx.shadowBlur = 7;
    const s = size * 0.55;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.45);
    ctx.bezierCurveTo(-s * 1.15, -s * 0.4, -s * 0.65, -s * 1.4, 0, -s * 0.55);
    ctx.bezierCurveTo(s * 0.65, -s * 1.4, s * 1.15, -s * 0.4, 0, s * 0.45);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function renderCanvas() {
    ctx.clearRect(0, 0, canvasW, canvasH);

    const bassBoost = 1 + audioMetrics.bass * 2.2;

    // 1. Ambient twilight dust & floating stars
    for (let i = 0; i < ambientParticles.length; i++) {
      const p = ambientParticles[i];
      p.swayPhase += p.swaySpeed;
      p.x += p.vx + Math.sin(p.swayPhase) * 0.22;
      p.y += p.vy * bassBoost;

      // Subtle gentle mouse repulsion
      if (mouse.visible) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 11000 && distSq > 1) {
          const force = (1 - Math.sqrt(distSq) / 105) * 0.65;
          p.x += (dx / Math.sqrt(distSq)) * force;
          p.y += (dy / Math.sqrt(distSq)) * force;
        }
      }

      if (p.y < -18 || p.x < -24 || p.x > canvasW + 24) {
        Object.assign(p, createAmbientParticle(false));
      }

      const twinkle = 0.65 + 0.35 * Math.sin(p.swayPhase * 2.2);
      const a = clamp(p.alpha * twinkle + audioMetrics.beat * 0.16, 0, 0.9);

      if (p.isStar) {
        drawFourPointStar(p.x, p.y, p.r * 2.2, p.swayPhase * 0.5, `${p.color}${a})`, a);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${a.toFixed(3)})`;
        ctx.fill();
      }
    }

    // 2. Expanding twilight ripples (click & bass drops)
    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += (rp.maxR - rp.r) * 0.085 + 1.2;
      rp.alpha *= 0.92;
      if (rp.alpha < 0.01 || rp.r >= rp.maxR) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rp.color}, ${rp.alpha.toFixed(3)})`;
      ctx.lineWidth = rp.lineWidth;
      ctx.stroke();
      ctx.restore();
    }

    // 3. Cute cursor stardust & heart trail particles
    for (let i = trailParticles.length - 1; i >= 0; i--) {
      const tp = trailParticles[i];
      tp.x += tp.vx;
      tp.y += tp.vy;
      tp.vx *= 0.97;
      tp.vy += 0.015;
      tp.rot += tp.vrot;
      tp.life -= tp.decay;

      if (tp.life <= 0) {
        trailParticles.splice(i, 1);
        continue;
      }

      const alpha = clamp(tp.life, 0, 1);
      const sz = tp.size * (0.45 + 0.55 * alpha);
      if (tp.kind === "star") {
        drawFourPointStar(tp.x, tp.y, sz, tp.rot, tp.color, alpha);
      } else if (tp.kind === "heart") {
        drawMiniHeart(tp.x, tp.y, sz, tp.rot, tp.color, alpha);
      } else {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = tp.color;
        ctx.shadowColor = "rgba(242, 82, 107, 0.7)";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(tp.x, tp.y, sz, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // =========================================================================
  // 6. Custom Zero-Lag Cute Cursor & Trailing Orbit Ring
  // =========================================================================

  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let ringX = -200;
  let ringY = -200;
  let ringAngle = 0;
  let isHoverInteractive = false;

  const INTERACTIVE_SELECTOR =
    'a, button, input, [role="button"], [role="slider"], .avatar-wrapper, .badge-item, .glass-pill, .discord-pill';

  function initCustomCursor() {
    if (!isFinePointer) return;

    window.addEventListener(
      "pointermove",
      (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        if (!mouse.visible) {
          mouse.visible = true;
          ringX = e.clientX;
          ringY = e.clientY;
          cursorCore.style.opacity = "1";
          cursorRing.style.opacity = "1";
        }

        // Zero-lag primary pointer positioning
        cursorCore.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

        // Spawn cute stardust trail every ~15px moved
        const dist = Math.hypot(e.clientX - mouse.lastTrailX, e.clientY - mouse.lastTrailY);
        if (dist > 15) {
          mouse.lastTrailX = e.clientX;
          mouse.lastTrailY = e.clientY;
          spawnTrailParticle(e.clientX + 6, e.clientY + 8);
        }

        // Hover target detection
        const target = e.target;
        const hovering = !!(target && target.closest && target.closest(INTERACTIVE_SELECTOR));
        if (hovering !== isHoverInteractive) {
          isHoverInteractive = hovering;
          cursorCore.classList.toggle("is-hover", hovering);
          cursorRing.classList.toggle("is-hover", hovering);
        }
      },
      { passive: true }
    );

    window.addEventListener("pointerdown", (e) => {
      cursorCore.classList.add("is-down");
      cursorRing.classList.add("is-down");
      spawnBurst(e.clientX, e.clientY, 10);
    });

    window.addEventListener("pointerup", () => {
      cursorCore.classList.remove("is-down");
      cursorRing.classList.remove("is-down");
    });

    document.addEventListener("mouseleave", () => {
      mouse.visible = false;
      cursorCore.style.opacity = "0";
      cursorRing.style.opacity = "0";
    });
  }

  function updateCursorRing() {
    if (!isFinePointer || !mouse.visible) return;
    ringX += (mouse.x - ringX) * 0.24;
    ringY += (mouse.y - ringY) * 0.24;
    ringAngle = (ringAngle + (isHoverInteractive ? 1.6 : 0.6)) % 360;
    cursorRing.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0) rotate(${ringAngle.toFixed(1)}deg)`;
  }

  // =========================================================================
  // 7. Interactive 3D Card Tilt & Dynamic Mouse Spotlight
  // =========================================================================

  const tiltCards = Array.from(document.querySelectorAll(".tilt-card")).map((el, idx) => ({
    el,
    maxTilt: idx === 0 ? 6.5 : 4.2,
    targetRx: 0,
    targetRy: 0,
    rx: 0,
    ry: 0,
    active: false
  }));

  function initCardTilt() {
    if (!isFinePointer) return;

    tiltCards.forEach((card) => {
      card.el.addEventListener("pointermove", (e) => {
        const rect = card.el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        card.el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        card.el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);

        card.targetRy = (px - 0.5) * card.maxTilt * 2;
        card.targetRx = (0.5 - py) * card.maxTilt * 2;
        card.active = true;
      });

      card.el.addEventListener("pointerleave", () => {
        card.targetRx = 0;
        card.targetRy = 0;
        card.active = false;
      });
    });
  }

  function updateCardTilt() {
    if (!isFinePointer || !body.classList.contains("tilt-ready")) return;

    for (let i = 0; i < tiltCards.length; i++) {
      const c = tiltCards[i];
      c.rx += (c.targetRx - c.rx) * 0.11;
      c.ry += (c.targetRy - c.ry) * 0.11;

      if (Math.abs(c.rx) > 0.01 || Math.abs(c.ry) > 0.01 || c.active) {
        c.el.style.transform = `rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
      } else {
        c.el.style.transform = "";
      }
    }
  }

  // =========================================================================
  // 8. Event Listeners & Controls Wiring
  // =========================================================================

  function bindEvents() {
    // Enter splash
    enterScreen.addEventListener("click", enterExperience);
    enterScreen.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        enterExperience();
      }
    });

    // Play / Pause
    playPauseBtn.addEventListener("click", togglePlayPause);

    // Progress bar scrub (pointer + keyboard)
    progressTrack.addEventListener("pointerdown", (e) => {
      isDraggingProgress = true;
      progressTrack.classList.add("is-dragging");
      progressTrack.setPointerCapture(e.pointerId);
      seekFromClientX(e.clientX);
    });

    progressTrack.addEventListener("pointermove", (e) => {
      if (!isDraggingProgress) return;
      seekFromClientX(e.clientX);
    });

    const endDrag = () => {
      if (!isDraggingProgress) return;
      isDraggingProgress = false;
      progressTrack.classList.remove("is-dragging");
    };
    progressTrack.addEventListener("pointerup", endDrag);
    progressTrack.addEventListener("pointercancel", endDrag);

    progressTrack.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        bgAudio.currentTime = Math.min(bgAudio.duration || 0, bgAudio.currentTime + 5);
        syncVideoToAudio(true);
      } else if (e.key === "ArrowLeft") {
        bgAudio.currentTime = Math.max(0, bgAudio.currentTime - 5);
        syncVideoToAudio(true);
      }
    });

    // Audio metadata & sync updates
    bgAudio.addEventListener("loadedmetadata", updateProgressUI);
    bgAudio.addEventListener("timeupdate", () => {
      if (!isDraggingProgress) updateProgressUI();
      if (isPlaying) syncVideoToAudio(false);
    });

    // Mute / Volume slider
    muteBtn.addEventListener("click", () => {
      isMuted = !isMuted;
      if (!isMuted && targetVolume <= 0.01) {
        targetVolume = 0.45;
      }
      bgAudio.volume = isMuted ? 0 : targetVolume;
      updateVolumeUI();
    });

    volumeSlider.addEventListener("input", () => {
      const val = parseFloat(volumeSlider.value);
      targetVolume = clamp(val, 0, 1);
      isMuted = targetVolume <= 0.001;
      bgAudio.volume = isMuted ? 0 : targetVolume;
      updateVolumeUI();
    });

    // Cute interactive burst when clicking profile avatar
    avatarWrapper.addEventListener("click", (e) => {
      const rect = avatarWrapper.getBoundingClientRect();
      spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 18);
      e.stopPropagation();
    });

    // Global keyboard shortcuts (Space = play/pause, M = mute)
    window.addEventListener("keydown", (e) => {
      if (!hasEntered) return;
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key.toLowerCase() === "m") {
        muteBtn.click();
      }
    });

    window.addEventListener("resize", () => {
      resizeCanvas();
      initAmbientParticles();
    });
  }

  // =========================================================================
  // 9. Master 60fps Animation Loop
  // =========================================================================

  function animate(now) {
    sampleAudioFrame(now);
    renderCanvas();
    updateCursorRing();
    updateCardTilt();
    requestAnimationFrame(animate);
  }

  // =========================================================================
  // Bootstrap
  // =========================================================================

  hydrateProfile();
  resizeCanvas();
  initAmbientParticles();
  initCustomCursor();
  initCardTilt();
  initItalyClock();
  initTypewriter();
  initNameSparkles();
  initDynamicTabTitle();
  updateVolumeUI();
  bindEvents();

  // Gently preview muted video behind frosted splash screen
  bgVideo.muted = true;
  const previewPlay = bgVideo.play();
  if (previewPlay) previewPlay.catch(() => {});

  requestAnimationFrame(animate);
})();
