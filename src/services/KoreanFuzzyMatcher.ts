const CHOSUNG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const JUNGSUNG = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];

const JONGSUNG = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// Decompose compound batchim (겹받침) so typing spillover (연타/오타) matches seamlessly
const COMPOUND_JONGSUNG: Record<string, string> = {
  ㄳ: "ㄱㅅ",
  ㄵ: "ㄴㅈ",
  ㄶ: "ㄴㅎ",
  ㄺ: "ㄹㄱ",
  ㄻ: "ㄹㅁ",
  ㄼ: "ㄹㅂ",
  ㄽ: "ㄹㅅ",
  ㄾ: "ㄹㅌ",
  ㄿ: "ㄹㅍ",
  ㅀ: "ㄹㅎ",
  ㅄ: "ㅂㅅ",
};

const COMPOUND_JUNGSUNG: Record<string, string> = {
  ㅘ: "ㅗㅏ",
  ㅙ: "ㅗㅐ",
  ㅚ: "ㅗㅣ",
  ㅝ: "ㅜㅓ",
  ㅞ: "ㅜㅔ",
  ㅟ: "ㅜㅣ",
  ㅢ: "ㅡㅣ",
};

export interface SizeModifierResult {
  cleanWord: string;
  scaleMultiplier: number;
  sizeTag?: "giant" | "tiny";
}

export class KoreanFuzzyMatcher {
  /**
   * Extracts size prefixes like "왕코끼리", "대형 바위", "큰 상자", "미니 사과", "작은 공"
   * so players can intentionally summon giant or tiny versions for size-based puzzles!
   */
  static extractSizeModifier(raw: string): SizeModifierResult {
    const trimmed = raw.trim();
    // Ordered longest-first so "거대한 바위" matches "거대한" instead of "거대"
    const giantPrefixes = [
      "엄청 큰",
      "엄청큰",
      "아주 큰",
      "아주큰",
      "초대형",
      "특대형",
      "거대한",
      "커다란",
      "자이언트",
      "대형",
      "거대",
      "슈퍼",
      "특대",
      "메가",
      "빅",
      "큰",
      "왕",
      "giant ",
      "huge ",
      "big ",
      "large ",
      "mega ",
    ];
    const tinyPrefixes = [
      "엄청 작은",
      "엄청작은",
      "아주 작은",
      "아주작은",
      "조그마한",
      "조그만",
      "작디작은",
      "초소형",
      "초미니",
      "미니",
      "작은",
      "소형",
      "아기",
      "꼬마",
      "쁘띠",
      "tiny ",
      "mini ",
      "small ",
      "little ",
    ];

    const lowerTrimmed = trimmed.toLowerCase();

    for (const prefix of giantPrefixes) {
      if (
        lowerTrimmed.length > prefix.length &&
        lowerTrimmed.startsWith(prefix)
      ) {
        const rest = trimmed.slice(prefix.length).trim();
        if (rest.length >= 1) {
          return { cleanWord: rest, scaleMultiplier: 1.65, sizeTag: "giant" };
        }
      }
    }

    for (const prefix of tinyPrefixes) {
      if (
        lowerTrimmed.length > prefix.length &&
        lowerTrimmed.startsWith(prefix)
      ) {
        const rest = trimmed.slice(prefix.length).trim();
        if (rest.length >= 1) {
          return { cleanWord: rest, scaleMultiplier: 0.44, sizeTag: "tiny" };
        }
      }
    }

    return { cleanWord: trimmed, scaleMultiplier: 1.0 };
  }

  /**
   * Decomposes Hangul text into a flat Jamo stroke stream.
   * Example: "콖ㅣ리" -> "ㅋㅗㄲㅣㄹㅣ", "코끼리" -> "ㅋㅗㄲㅣㄹㅣ" (100% identical!)
   */
  static decomposeJamo(str: string): string {
    let out = "";
    for (const ch of str.toLowerCase()) {
      if (ch === " ") continue;
      const code = ch.charCodeAt(0);
      if (code >= 0xac00 && code <= 0xd7a3) {
        const offset = code - 0xac00;
        const cho = CHOSUNG[Math.floor(offset / 588)];
        const jung = JUNGSUNG[Math.floor((offset % 588) / 28)];
        const jong = JONGSUNG[offset % 28];

        out += cho;
        out += COMPOUND_JUNGSUNG[jung] ?? jung;
        if (jong) {
          out += COMPOUND_JONGSUNG[jong] ?? jong;
        }
      } else {
        out += COMPOUND_JONGSUNG[ch] ?? COMPOUND_JUNGSUNG[ch] ?? ch;
      }
    }
    return out;
  }

  /**
   * Extracts only Chosung consonants from a word.
   * Example: "코끼리" -> "ㅋㄲㄹ", "트램펄린" -> "ㅌㄹㅍㄹ"
   */
  static extractChosung(str: string): string {
    let out = "";
    for (const ch of str) {
      if (ch === " ") continue;
      const code = ch.charCodeAt(0);
      if (code >= 0xac00 && code <= 0xd7a3) {
        out += CHOSUNG[Math.floor((code - 0xac00) / 588)];
      } else if (CHOSUNG.includes(ch)) {
        out += ch;
      }
    }
    return out;
  }

  /**
   * Checks if input string consists purely of Hangul Chosung consonants (e.g. "ㅋㄲㄹ", "ㅅㄷㄹ")
   */
  static isChosungOnly(str: string): boolean {
    const clean = str.replace(/\s+/g, "");
    if (clean.length === 0) return false;
    for (const ch of clean) {
      if (!CHOSUNG.includes(ch)) return false;
    }
    return true;
  }

  /**
   * Normalizes tense/aspirated consonants and similar vowels for typo tolerance.
   * Example: "코키리" / "꼬기리" -> same phonetic skeleton as "코끼리"
   */
  static normalizePhoneticJamo(jamo: string): string {
    return jamo
      .replace(/[ㄲㅋ]/g, "ㄱ")
      .replace(/[ㄸㅌ]/g, "ㄷ")
      .replace(/[ㅃㅍ]/g, "ㅂ")
      .replace(/[ㅆ]/g, "ㅅ")
      .replace(/[ㅉㅊ]/g, "ㅈ")
      .replace(/[ㅐㅔㅒㅖ]/g, "ㅐ");
  }

  /**
   * Computes similarity score [0.0 ~ 1.0] between user query and a target keyword.
   */
  static scoreSimilarity(query: string, target: string): number {
    const q = query.trim().toLowerCase();
    const t = target.trim().toLowerCase();
    if (!q || !t) return 0;

    // 1. Exact match
    if (q === t) return 1.0;

    // 2. Jamo stroke exact match (handles "콖ㅣ리" === "코끼리", "사다ㄹㅣ" === "사다리")
    const qJamo = this.decomposeJamo(q);
    const tJamo = this.decomposeJamo(t);
    if (qJamo === tJamo) return 0.99;

    // 3. Chosung match (only for 2+ character Chosung inputs like "ㅋㄲㄹ" === "코끼리")
    if (this.isChosungOnly(q)) {
      if (q.length < 2) return 0;
      const tCho = this.extractChosung(t);
      if (q === tCho) return 0.96;
      if (
        this.normalizePhoneticJamo(q) === this.normalizePhoneticJamo(tCho)
      ) {
        return 0.88;
      }
      return 0;
    }

    // Single-character words (e.g. "점", "공", "돌", "집", "절") must NEVER fuzzy-match
    // a different word, because 1 Jamo difference completely changes the noun!
    if (q.length === 1 || t.length === 1) {
      return 0;
    }

    // 4. Substring containment when query includes a 2+ char target keyword (e.g. "빨간사과" -> "사과")
    if (q.length >= 3 && t.length >= 2 && q.includes(t)) {
      return 0.84;
    }

    // Do not fuzzy-match words whose character lengths differ by more than 1
    if (Math.abs(q.length - t.length) > 1) {
      return 0;
    }

    // For 2-syllable words (e.g. "구슬" vs "구름"), require identical syllable length
    // and matching initial consonant so unrelated 2-char words never collide.
    if (q.length === 2 || t.length === 2) {
      if (q.length !== t.length) return 0;
      const qCho = this.extractChosung(q);
      const tCho = this.extractChosung(t);
      if (
        this.normalizePhoneticJamo(qCho) !== this.normalizePhoneticJamo(tCho)
      ) {
        return 0;
      }
    }

    // 5. Jamo Levenshtein similarity
    const jamoDist = this.levenshtein(qJamo, tJamo);
    const maxJamoLen = Math.max(qJamo.length, tJamo.length);
    const exactJamoSim = maxJamoLen > 0 ? 1 - jamoDist / maxJamoLen : 0;

    // 6. Phonetic Jamo Levenshtein similarity (tolerates ㅐ/ㅔ, ㄲ/ㅋ/ㄱ typos)
    const qPhon = this.normalizePhoneticJamo(qJamo);
    const tPhon = this.normalizePhoneticJamo(tJamo);
    const phonDist = this.levenshtein(qPhon, tPhon);
    const phonSim = maxJamoLen > 0 ? 1 - phonDist / maxJamoLen : 0;

    const rawSim = Math.max(exactJamoSim, phonSim * 0.95);
    // Require higher similarity (0.82+) for 2-char words, 0.76+ for 3+ char words
    const minThreshold = q.length <= 2 ? 0.82 : 0.76;
    return rawSim >= minThreshold ? rawSim : 0;
  }

  private static levRow = new Int32Array(128);

  private static levenshtein(a: string, b: string): number {
    const m = a.length;
    const n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;

    if (this.levRow.length < n + 1) {
      this.levRow = new Int32Array(n + 1);
    }
    const row = this.levRow;
    for (let j = 0; j <= n; j++) row[j] = j;

    for (let i = 1; i <= m; i++) {
      let prevDiag = row[0];
      row[0] = i;
      const ca = a.charCodeAt(i - 1);
      for (let j = 1; j <= n; j++) {
        const temp = row[j];
        const cost = ca === b.charCodeAt(j - 1) ? 0 : 1;
        const del = row[j] + 1;
        const ins = row[j - 1] + 1;
        const sub = prevDiag + cost;
        row[j] = del < ins ? (del < sub ? del : sub) : ins < sub ? ins : sub;
        prevDiag = temp;
      }
    }
    return row[n];
  }
}

