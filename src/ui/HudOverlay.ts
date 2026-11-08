import { AIMode, settingsStore } from "../config/settings";
import { StageConfig } from "../levels/LevelTypes";
import { STAGE_CHAPTERS, STAGES } from "../levels/stages";
import { AIService } from "../services/AIService";
import { cacheService } from "../services/CacheService";

export interface HudCallbacks {
  onSummonWord: (word: string) => void;
  onSelectStage: (stageId: number) => void;
  onRestartStage: () => void;
  onClearObjects: () => void;
  onToggleDebug: (enabled: boolean) => void;
  onBackToTitle: () => void;
}

const CHAPTER_ACCENTS: Record<number, string> = {
  1: "#10b981",
  2: "#f59e0b",
  3: "#38bdf8",
  4: "#a855f7",
};

export class HudOverlay {
  private root: HTMLElement;
  private callbacks: HudCallbacks;
  private inputEl!: HTMLInputElement;
  private spawnCountEl!: HTMLElement;
  private settingsModal!: HTMLElement;
  private stageModal!: HTMLElement;
  private clearModal!: HTMLElement;
  private currentStage: StageConfig = STAGES[0];
  private activeChapterTab = 1;
  private isLoading = false;
  private keydownHandler?: (e: KeyboardEvent) => void;

  constructor(callbacks: HudCallbacks) {
    this.callbacks = callbacks;
    const existing = document.getElementById("hud-overlay-root");
    if (existing) existing.remove();

    this.root = document.createElement("div");
    this.root.id = "hud-overlay-root";
    document.body.appendChild(this.root);

    this.render();
    this.bindGlobalShortcuts();
  }

  private render() {
    const s = settingsStore.get();

    this.root.innerHTML = `
      <div class="sd-hud-bar">
        <div class="sd-hud-left">
          <button id="sd-btn-home" class="sd-icon-btn" title="타이틀로">🏠</button>
          <button id="sd-btn-stage-modal" class="sd-stage-trigger-btn" title="스테이지 선택">
            <span id="sd-stage-trigger-num" class="sd-stage-trigger-badge">1-1</span>
            <span id="sd-stage-trigger-sub" class="sd-stage-trigger-title">실루엣 징검다리</span>
            <span class="sd-stage-trigger-caret">▾</span>
          </button>
          <button id="sd-btn-restart" class="sd-icon-btn" title="스테이지 다시 시작">🔄</button>
        </div>

        <form id="sd-word-form" class="sd-word-form" autocomplete="off">
          <input
            id="sd-word-input"
            type="text"
            placeholder="단어 입력..."
            maxlength="24"
          />
          <button type="submit" id="sd-summon-btn" class="sd-primary-btn">
            소환
          </button>
        </form>

        <div class="sd-hud-right">
          <span id="sd-spawn-count" class="sd-badge">★★★</span>
          <button id="sd-btn-debug" class="sd-icon-btn ${
            s.debugPhysics ? "active" : ""
          }" title="폴리곤 충돌체 보기 (F2)">
            📐
          </button>
          <button id="sd-btn-clear" class="sd-icon-btn" title="소환 사물 모두 제거">
            🧹
          </button>
          <button id="sd-btn-settings" class="sd-icon-btn" title="AI 서버 설정">
            ⚙️
          </button>
        </div>
      </div>

      <!-- Stage Select Modal -->
      <div id="sd-stage-modal" class="sd-modal-backdrop hidden">
        <div class="sd-modal sd-stage-select-modal">
          <div class="sd-modal-header">
            <div class="sd-stage-modal-title-wrap">
              <h3>🗺️ 스테이지 선택</h3>
              <span id="sd-stage-total-stars" class="sd-stage-total-stars">★ 0 / 144</span>
            </div>
            <button id="sd-stage-modal-close" class="sd-icon-btn">✕</button>
          </div>
          <div id="sd-stage-tabs" class="sd-stage-tabs"></div>
          <div id="sd-stage-grid" class="sd-stage-grid"></div>
        </div>
      </div>

      <!-- AI Settings Modal -->
      <div id="sd-settings-modal" class="sd-modal-backdrop hidden">
        <div class="sd-modal">
          <div class="sd-modal-header">
            <h3>⚙️ AI 서버 설정</h3>
            <button id="sd-modal-close" class="sd-icon-btn">✕</button>
          </div>
          <div class="sd-modal-body">
            <label class="sd-field">
              <span>동작 모드</span>
              <select id="sd-cfg-mode">
                <option value="auto" ${
                  s.aiMode === "auto" ? "selected" : ""
                }>Auto (Windows PC 연결 ➔ 미연결 시 로컬 폴백)</option>
                <option value="lan" ${
                  s.aiMode === "lan" ? "selected" : ""
                }>LAN AI (Windows PC Ollama + SD)</option>
                <option value="offline" ${
                  s.aiMode === "offline" ? "selected" : ""
                }>Offline (내장 즉시 생성)</option>
              </select>
            </label>

            <div class="sd-field-row">
              <label class="sd-field">
                <span>Ollama 주소</span>
                <input id="sd-cfg-ollama" type="text" value="${
                  s.ollamaUrl
                }" placeholder="http://192.168.0.x:11434" />
              </label>
              <label class="sd-field" style="max-width: 160px;">
                <span>모델명</span>
                <input id="sd-cfg-model" type="text" value="${
                  s.ollamaModel
                }" placeholder="gemma4:e4b" />
              </label>
            </div>

            <label class="sd-field">
              <span>Stable Diffusion 주소</span>
              <input id="sd-cfg-sd" type="text" value="${
                s.sdUrl
              }" placeholder="http://192.168.0.x:7860" />
            </label>

            <label class="sd-field">
              <span>U2Net 주소 (선택)</span>
              <input id="sd-cfg-u2net" type="text" value="${
                s.u2netUrl
              }" placeholder="비워두면 자동 배경 투명화" />
            </label>

            <label class="sd-checkbox">
              <input id="sd-cfg-cache" type="checkbox" ${
                s.useCache ? "checked" : ""
              } />
              <span>생성 결과 캐시 사용</span>
            </label>

            <div id="sd-test-result" class="sd-test-box">
              연결 테스트 버튼으로 Windows PC 상태를 확인할 수 있습니다.
            </div>
          </div>
          <div class="sd-modal-footer">
            <button id="sd-btn-test-conn" class="sd-ghost-btn">연결 테스트</button>
            <button id="sd-btn-clear-cache" class="sd-ghost-btn">캐시 삭제</button>
            <button id="sd-btn-save-cfg" class="sd-primary-btn">저장</button>
          </div>
        </div>
      </div>

      <!-- Stage Clear Modal -->
      <div id="sd-clear-modal" class="sd-modal-backdrop hidden">
        <div id="sd-clear-card" class="sd-modal sd-clear-card">
          <div id="sd-clear-stage-pill" class="sd-clear-stage-pill">STAGE 1-1</div>
          <h2 id="sd-clear-title" class="sd-clear-heading">STAGE CLEAR!</h2>
          <div id="sd-clear-desc" class="sd-clear-body"></div>
          <div class="sd-clear-actions">
            <button id="sd-btn-retry" class="sd-clear-btn sd-clear-btn-retry">
              <span class="sd-btn-icon">↻</span>
              <span>다시 도전</span>
            </button>
            <button id="sd-btn-next-stage" class="sd-clear-btn sd-clear-btn-next">
              <span>다음 스테이지</span>
              <span class="sd-btn-arrow">➔</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.inputEl = this.root.querySelector("#sd-word-input") as HTMLInputElement;
    this.spawnCountEl = this.root.querySelector(
      "#sd-spawn-count"
    ) as HTMLElement;
    this.settingsModal = this.root.querySelector(
      "#sd-settings-modal"
    ) as HTMLElement;
    this.stageModal = this.root.querySelector("#sd-stage-modal") as HTMLElement;
    this.clearModal = this.root.querySelector("#sd-clear-modal") as HTMLElement;

    this.root.querySelector("#sd-btn-home")?.addEventListener("click", () => {
      this.callbacks.onBackToTitle();
    });

    this.root
      .querySelector("#sd-btn-restart")
      ?.addEventListener("click", (e) => {
        (e.currentTarget as HTMLButtonElement).blur();
        this.callbacks.onRestartStage();
      });

    this.root
      .querySelector("#sd-btn-stage-modal")
      ?.addEventListener("click", () => {
        this.activeChapterTab = this.currentStage.chapter;
        this.renderStageSelectModal();
        this.stageModal.classList.remove("hidden");
      });

    this.root
      .querySelector("#sd-stage-modal-close")
      ?.addEventListener("click", () => {
        this.stageModal.classList.add("hidden");
      });

    this.stageModal.addEventListener("click", (e) => {
      if (e.target === this.stageModal) {
        this.stageModal.classList.add("hidden");
      }
    });

    this.settingsModal.addEventListener("click", (e) => {
      if (e.target === this.settingsModal) {
        this.settingsModal.classList.add("hidden");
      }
    });

    const form = this.root.querySelector("#sd-word-form") as HTMLFormElement;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.isLoading) return;
      const word = this.inputEl.value.trim();
      if (!word) return;
      this.inputEl.value = "";
      this.inputEl.blur();
      this.callbacks.onSummonWord(word);
    });

    const debugBtn = this.root.querySelector(
      "#sd-btn-debug"
    ) as HTMLButtonElement;
    debugBtn.addEventListener("click", () => {
      const next = !settingsStore.get().debugPhysics;
      settingsStore.update({ debugPhysics: next });
      debugBtn.classList.toggle("active", next);
      this.callbacks.onToggleDebug(next);
    });

    this.root.querySelector("#sd-btn-clear")?.addEventListener("click", () => {
      this.callbacks.onClearObjects();
    });

    this.root
      .querySelector("#sd-btn-settings")
      ?.addEventListener("click", () => {
        this.settingsModal.classList.remove("hidden");
      });

    this.root.querySelector("#sd-modal-close")?.addEventListener("click", () => {
      this.settingsModal.classList.add("hidden");
    });

    // Apply mode change immediately even if the user closes the modal without clicking "저장"
    const modeSelect = this.root.querySelector(
      "#sd-cfg-mode"
    ) as HTMLSelectElement | null;
    modeSelect?.addEventListener("change", () => {
      settingsStore.update({ aiMode: modeSelect.value as AIMode });
      AIService.resetHealthCache();
    });

    this.root
      .querySelector("#sd-btn-save-cfg")
      ?.addEventListener("click", () => {
        const aiMode = (
          this.root.querySelector("#sd-cfg-mode") as HTMLSelectElement
        ).value as AIMode;
        const ollamaUrl = (
          this.root.querySelector("#sd-cfg-ollama") as HTMLInputElement
        ).value.trim();
        const ollamaModel = (
          this.root.querySelector("#sd-cfg-model") as HTMLInputElement
        ).value.trim();
        const sdUrl = (
          this.root.querySelector("#sd-cfg-sd") as HTMLInputElement
        ).value.trim();
        const u2netUrl = (
          this.root.querySelector("#sd-cfg-u2net") as HTMLInputElement
        ).value.trim();
        const useCache = (
          this.root.querySelector("#sd-cfg-cache") as HTMLInputElement
        ).checked;

        settingsStore.update({
          aiMode,
          ollamaUrl,
          ollamaModel,
          sdUrl,
          u2netUrl,
          useCache,
        });
        AIService.resetHealthCache();
        this.settingsModal.classList.add("hidden");
      });

    this.root
      .querySelector("#sd-btn-test-conn")
      ?.addEventListener("click", async () => {
        const testBox = this.root.querySelector("#sd-test-result") as HTMLElement;
        const ollamaUrl = (
          this.root.querySelector("#sd-cfg-ollama") as HTMLInputElement
        ).value.trim();
        const sdUrl = (
          this.root.querySelector("#sd-cfg-sd") as HTMLInputElement
        ).value.trim();

        const modelInput = this.root.querySelector(
          "#sd-cfg-model"
        ) as HTMLInputElement;
        testBox.textContent = "⏳ 연결 확인 중...";
        const res = await AIService.testConnection(ollamaUrl, sdUrl);
        if (res.detectedModel && modelInput) {
          modelInput.value = res.detectedModel;
        }
        testBox.innerHTML = `
          <div>• <b>Ollama:</b> ${res.ollamaOk ? "🟢" : "🔴"} ${
          res.ollamaMessage
        }</div>
          <div>• <b>Stable Diffusion:</b> ${res.sdOk ? "🟢" : "🔴"} ${
          res.sdMessage
        }</div>
        `;
      });

    this.root
      .querySelector("#sd-btn-clear-cache")
      ?.addEventListener("click", async () => {
        await cacheService.clear();
        const testBox = this.root.querySelector("#sd-test-result") as HTMLElement;
        testBox.textContent = "✅ 캐시 삭제 완료";
      });
  }

  private renderStageSelectModal() {
    const totalStarsEl = this.root.querySelector(
      "#sd-stage-total-stars"
    ) as HTMLElement;
    const tabsEl = this.root.querySelector("#sd-stage-tabs") as HTMLElement;
    const gridEl = this.root.querySelector("#sd-stage-grid") as HTMLElement;
    if (!tabsEl || !gridEl) return;

    const totalEarned = STAGES.reduce(
      (sum, st) => sum + settingsStore.getStageStars(st.id),
      0
    );
    const totalMax = STAGES.length * 3;
    if (totalStarsEl) {
      totalStarsEl.textContent = `★ ${totalEarned} / ${totalMax}`;
    }

    tabsEl.innerHTML = STAGE_CHAPTERS.map((ch) => {
      const chStages = STAGES.filter((st) => st.chapter === ch.chapter);
      const chEarned = chStages.reduce(
        (sum, st) => sum + settingsStore.getStageStars(st.id),
        0
      );
      const chMax = chStages.length * 3;
      const isActive = ch.chapter === this.activeChapterTab;
      const accent = CHAPTER_ACCENTS[ch.chapter] || "#38bdf8";

      return `
        <button
          type="button"
          class="sd-stage-tab ${isActive ? "active" : ""}"
          data-chapter="${ch.chapter}"
          style="--tab-accent: ${accent};"
        >
          <div class="sd-stage-tab-top">
            <span class="sd-stage-tab-name">${ch.name}</span>
            <span class="sd-stage-tab-stars">★ ${chEarned}/${chMax}</span>
          </div>
          <div class="sd-stage-tab-sub">${ch.subtitle}</div>
        </button>
      `;
    }).join("");

    tabsEl.querySelectorAll<HTMLButtonElement>(".sd-stage-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.activeChapterTab = Number(btn.dataset.chapter);
        this.renderStageSelectModal();
      });
    });

    const accent = CHAPTER_ACCENTS[this.activeChapterTab] || "#38bdf8";
    const chapterStages = STAGES.filter(
      (st) => st.chapter === this.activeChapterTab
    );

    gridEl.innerHTML = chapterStages
      .map((st) => {
        const stars = settingsStore.getStageStars(st.id);
        const isCurrent = st.id === this.currentStage.id;
        const isCleared = stars > 0;
        const isPerfect = stars === 3;

        const starsMarkup = [0, 1, 2]
          .map(
            (i) =>
              `<span class="sd-card-star ${
                i < stars ? "earned" : "empty"
              }">★</span>`
          )
          .join("");

        return `
          <button
            type="button"
            class="sd-stage-card ${isCurrent ? "is-current" : ""} ${
          isCleared ? "is-cleared" : ""
        } ${isPerfect ? "is-perfect" : ""}"
            data-stage-id="${st.id}"
            style="--card-accent: ${accent};"
          >
            <div class="sd-stage-card-head">
              <span class="sd-stage-card-num">${st.title}</span>
              <span class="sd-stage-card-stars">${starsMarkup}</span>
            </div>
            <div class="sd-stage-card-title">${st.subtitle}</div>
            ${
              isCurrent
                ? `<span class="sd-stage-card-current-tag">진행 중</span>`
                : ""
            }
          </button>
        `;
      })
      .join("");

    gridEl
      .querySelectorAll<HTMLButtonElement>(".sd-stage-card")
      .forEach((card) => {
        card.addEventListener("click", () => {
          const stageId = Number(card.dataset.stageId);
          this.stageModal.classList.add("hidden");
          this.callbacks.onSelectStage(stageId);
        });
      });
  }

  private bindGlobalShortcuts() {
    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        this.stageModal.classList.add("hidden");
        this.settingsModal.classList.add("hidden");
      } else if (e.key === "F2") {
        e.preventDefault();
        const debugBtn = this.root.querySelector(
          "#sd-btn-debug"
        ) as HTMLButtonElement;
        debugBtn?.click();
      } else if (
        e.key === "Enter" &&
        document.activeElement !== this.inputEl &&
        this.settingsModal.classList.contains("hidden") &&
        this.stageModal.classList.contains("hidden") &&
        this.clearModal.classList.contains("hidden")
      ) {
        this.inputEl.focus();
      }
    };
    window.addEventListener("keydown", this.keydownHandler);
  }

  setStageInfo(stage: StageConfig, spawnCount: number) {
    this.currentStage = stage;
    this.activeChapterTab = stage.chapter;

    const numEl = this.root.querySelector(
      "#sd-stage-trigger-num"
    ) as HTMLElement;
    const subEl = this.root.querySelector(
      "#sd-stage-trigger-sub"
    ) as HTMLElement;
    if (numEl) numEl.textContent = stage.title;
    if (subEl) subEl.textContent = stage.subtitle;

    this.updateSpawnCount(spawnCount, stage.threeStarLimit);
    this.clearModal.classList.add("hidden");
  }

  updateSpawnCount(count: number, threeStarLimit: number) {
    const stars =
      count <= threeStarLimit
        ? "★★★"
        : count <= threeStarLimit + 2
        ? "★★☆"
        : "★☆☆";
    this.spawnCountEl.textContent = `${stars}`;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
    const btn = this.root.querySelector("#sd-summon-btn") as HTMLButtonElement;
    if (btn) {
      btn.disabled = loading;
      btn.textContent = loading ? "..." : "소환";
    }
  }

  private buildStarSvg(earned: boolean, index: number, isPerfect: boolean): string {
    const gradId = `sd-star-grad-${index}-${earned ? "on" : "off"}`;
    const size = index === 1 ? 74 : 58;
    const delayMs = 110 + index * 150;
    const cls = [
      "sd-star-item",
      index === 1 ? "sd-star-center" : "sd-star-side",
      earned ? "earned" : "empty",
      isPerfect ? "perfect" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `
      <div class="${cls}" style="animation-delay: ${delayMs}ms;">
        <svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="${gradId}" x1="12" y1="6" x2="52" y2="58" gradientUnits="userSpaceOnUse">
              ${
                earned
                  ? `<stop offset="0%" stop-color="#FFFBEB"/>
                     <stop offset="35%" stop-color="#FDE047"/>
                     <stop offset="75%" stop-color="#F59E0B"/>
                     <stop offset="100%" stop-color="#D97706"/>`
                  : `<stop offset="0%" stop-color="#334155"/>
                     <stop offset="100%" stop-color="#0F172A"/>`
              }
            </linearGradient>
          </defs>
          <path
            d="M32 5L39.9 21.1L57.7 23.7L44.8 36.2L47.9 53.9L32 45.5L16.1 53.9L19.2 36.2L6.3 23.7L24.1 21.1L32 5Z"
            fill="url(#${gradId})"
            stroke="${earned ? "#FEF08A" : "#475569"}"
            stroke-width="${earned ? "2.8" : "2"}"
            stroke-linejoin="round"
          />
          ${
            earned
              ? `<path d="M32 10L37.8 22.1L50.5 23.9L41.2 32.8" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" opacity="0.75"/>`
              : ""
          }
        </svg>
      </div>
    `;
  }

  showStageClear(
    stage: StageConfig,
    spawnCount: number,
    onRetry: () => void,
    onNext: () => void
  ) {
    const starCount =
      spawnCount <= stage.threeStarLimit
        ? 3
        : spawnCount <= stage.threeStarLimit + 2
        ? 2
        : 1;
    settingsStore.recordStageClear(stage.id, starCount);
    const isPerfect = starCount === 3;

    const cardEl = this.root.querySelector("#sd-clear-card") as HTMLElement;
    const pillEl = this.root.querySelector("#sd-clear-stage-pill") as HTMLElement;
    const titleEl = this.root.querySelector("#sd-clear-title") as HTMLElement;
    const descEl = this.root.querySelector("#sd-clear-desc") as HTMLElement;

    cardEl.classList.toggle("is-perfect", isPerfect);
    pillEl.textContent = `STAGE ${stage.title} · ${stage.subtitle}`;
    titleEl.textContent = isPerfect ? "PERFECT CLEAR!" : "STAGE CLEAR!";

    const starsHtml = [0, 1, 2]
      .map((i) => this.buildStarSvg(i < starCount, i, isPerfect))
      .join("");

    const perfectRibbon = isPerfect
      ? `<div class="sd-perfect-ribbon">✨ 최고 등급 ★★★ 달성! ✨</div>`
      : `<div class="sd-retry-hint">💡 ${stage.threeStarLimit}회 이하로 소환하면 ★★★ 달성!</div>`;

    descEl.innerHTML = `
      <div class="sd-stars-stage ${isPerfect ? "perfect" : ""}">
        ${isPerfect ? `<div class="sd-sunburst"></div>` : ""}
        <div class="sd-stars-row">
          ${starsHtml}
        </div>
      </div>
      ${perfectRibbon}
      <div class="sd-clear-stats">
        <div class="sd-stat-item">
          <span class="sd-stat-label">소환 횟수</span>
          <span class="sd-stat-value ${isPerfect ? "gold" : ""}">${spawnCount}회</span>
        </div>
        <div class="sd-stat-divider"></div>
        <div class="sd-stat-item">
          <span class="sd-stat-label">★★★ 목표</span>
          <span class="sd-stat-value">${stage.threeStarLimit}회 이하</span>
        </div>
      </div>
    `;

    const retryBtn = this.root.querySelector(
      "#sd-btn-retry"
    ) as HTMLButtonElement;
    const nextBtn = this.root.querySelector(
      "#sd-btn-next-stage"
    ) as HTMLButtonElement;

    retryBtn.onclick = () => {
      this.clearModal.classList.add("hidden");
      onRetry();
    };
    nextBtn.onclick = () => {
      this.clearModal.classList.add("hidden");
      onNext();
    };

    this.clearModal.classList.remove("hidden");
  }

  destroy() {
    if (this.keydownHandler) {
      window.removeEventListener("keydown", this.keydownHandler);
      this.keydownHandler = undefined;
    }
    this.root.remove();
  }
}
