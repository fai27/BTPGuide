// Service analisis teks komposisi & pencocokan istilah BTP
// Memisahkan bahan pangan umum dari Bahan Tambahan Pangan (BTP)
// Berdasarkan data referensi BPOM No. 11 Tahun 2019

import { BTP_ADDITIVES } from '../data/additives.js';

// Daftar bahan pangan biasa (non-BTP) untuk klasifikasi cerdas
const COMMON_FOOD_INGREDIENTS = [
  'air', 'gula', 'gula pasir', 'garam', 'tepung terigu', 'minyak kelapa sawit', 'minyak nabati',
  'minyak olein', 'kentang', 'singkong', 'jagung', 'pati jagung', 'tepung tapioka',
  'susu bubuk', 'susu sapi', 'susu skim', 'lemak kakao', 'massa kakao', 'kakao bubuk',
  'kacang tanah', 'kacang mete', 'bubuk bawang merah', 'bubuk bawang putih', 'lada',
  'cabai', 'ekstrak teh', 'daun teh', 'kelapa kering', 'mentega', 'keju bubuk',
  'kopi instan', 'krimer nabati', 'maltodekstrin', 'ragi', 'beras krispi', 'kedelai'
];

export function analyzeCompositionText(text) {
  if (!text || typeof text !== 'string') {
    return {
      rawText: '',
      detectedAdditives: [],
      regularIngredients: [],
      unverifiedTerms: [],
      highlightedHtml: '',
      summary: { totalAdditives: 0, totalRegular: 0 }
    };
  }

  const cleanText = text.trim();
  const lowerText = cleanText.toLowerCase();

  const detectedAdditives = [];
  const foundAdditiveIds = new Set();
  const matchedSpans = []; // { start, end, additiveId, term }

  // 1. Pencarian kecocokan BTP dalam teks
  for (const additive of BTP_ADDITIVES) {
    // Cari nama resmi
    let searchTerms = [additive.name, ...additive.alternativeNames, ...additive.searchKeywords];
    // Jika ada kode INS/E
    if (additive.insOrECode) {
      searchTerms.push(additive.insOrECode);
      const eMatch = additive.insOrECode.match(/E\d+/i);
      if (eMatch) searchTerms.push(eMatch[0]);
      const insMatch = additive.insOrECode.match(/INS\s*\d+/i);
      if (insMatch) searchTerms.push(insMatch[0]);
    }

    // Urutkan kata terpanjang terlebih dahulu agar pencocokan spesifik menang
    searchTerms = [...new Set(searchTerms)].filter(t => t.length > 2);
    searchTerms.sort((a, b) => b.length - a.length);

    for (const term of searchTerms) {
      const termLower = term.toLowerCase();
      // Gunakan regex boundary atau indexOf jika huruf/angka
      let pos = lowerText.indexOf(termLower);
      while (pos !== -1) {
        // Cek overlap dengan span yang sudah ada
        const end = pos + termLower.length;
        const overlaps = matchedSpans.some(span => (pos < span.end && end > span.start));
        if (!overlaps) {
          matchedSpans.push({
            start: pos,
            end: end,
            additiveId: additive.id,
            matchedTerm: cleanText.substring(pos, end),
            additiveName: additive.name
          });

          if (!foundAdditiveIds.has(additive.id)) {
            foundAdditiveIds.add(additive.id);
            detectedAdditives.push({
              ...additive,
              matchedTerm: cleanText.substring(pos, end),
              status: 'terdeteksi'
            });
          }
        }
        pos = lowerText.indexOf(termLower, pos + 1);
      }
    }
  }

  // 2. Pencarian bahan pangan umum
  const regularIngredients = [];
  for (const food of COMMON_FOOD_INGREDIENTS) {
    if (lowerText.includes(food)) {
      regularIngredients.push(food);
    }
  }

  // 3. Deteksi istilah yang mencurigakan atau perlu verifikasi
  // (misal kata "perisa", "pewarna", "penstabil" tanpa nama spesifik)
  const genericKeywords = ['perisa', 'pewarna', 'penstabil', 'pengemulsi', 'pengatur keasaman', 'anti kempal', 'pengembang'];
  const unverifiedTerms = [];
  for (const generic of genericKeywords) {
    if (lowerText.includes(generic)) {
      // Periksa apakah sudah ter-cover oleh span spesifik
      const idx = lowerText.indexOf(generic);
      const alreadyCovered = matchedSpans.some(span => idx >= span.start && idx < span.end);
      if (!alreadyCovered && !unverifiedTerms.includes(generic)) {
        unverifiedTerms.push(generic);
      }
    }
  }

  // 4. Buat teks bertanda highlight (HTML)
  matchedSpans.sort((a, b) => a.start - b.start);
  let highlightedHtml = '';
  let lastIndex = 0;

  for (const span of matchedSpans) {
    // Teks sebelum highlight
    if (span.start > lastIndex) {
      highlightedHtml += escapeHtml(cleanText.substring(lastIndex, span.start));
    }
    // Tag highlight BTP
    const matchedSubstring = escapeHtml(cleanText.substring(span.start, span.end));
    highlightedHtml += `<mark class="btp-highlight" data-additive-id="${span.additiveId}" title="BTP: ${escapeHtml(span.additiveName)}">${matchedSubstring}</mark>`;
    lastIndex = span.end;
  }
  // Sisa teks
  if (lastIndex < cleanText.length) {
    highlightedHtml += escapeHtml(cleanText.substring(lastIndex));
  }

  return {
    rawText: cleanText,
    detectedAdditives,
    regularIngredients: [...new Set(regularIngredients)],
    unverifiedTerms,
    highlightedHtml,
    summary: {
      totalAdditives: detectedAdditives.length,
      totalRegular: regularIngredients.length,
      hasUnverified: unverifiedTerms.length > 0
    }
  };
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
