import { Question } from '../types';
import { RAW_KEYS, RAW_QUESTIONS } from './raw-data';

export function parseQuestions(): Question[] {
  const normalized = RAW_QUESTIONS.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  const questions: Question[] = [];

  for (let i = 1; i <= 100; i++) {
    const qStartStr = `${i}. `;
    const nextQStartStr = `${i + 1}. `;

    const startIdx = normalized.indexOf(qStartStr);
    if (startIdx === -1) {
      console.warn(`Could not find question ${i}`);
      continue;
    }

    let endIdx = -1;
    if (i < 100) {
      endIdx = normalized.indexOf(nextQStartStr, startIdx);
      if (endIdx === -1) endIdx = normalized.length;
    } else {
      endIdx = normalized.length;
    }

    const qStr = normalized.substring(startIdx, endIdx);

    const aIdx = qStr.indexOf(' A) ');
    const bIdx = qStr.indexOf(' B) ');
    const cIdx = qStr.indexOf(' C) ');
    const dIdx = qStr.indexOf(' D) ');

    const text = qStr.substring(qStartStr.length, aIdx).trim();

    const getStr = (start: number, end: number) => 
      start !== -1 
        ? qStr.substring(start + 4, end !== -1 ? end : qStr.length).trim() 
        : "";

    const optionA = getStr(aIdx, bIdx);
    const optionB = getStr(bIdx, cIdx);
    const optionC = getStr(cIdx, dIdx);
    const optionD = getStr(dIdx, -1);

    questions.push({
      id: i,
      text,
      options: [
        { id: 'A', text: optionA },
        { id: 'B', text: optionB },
        { id: 'C', text: optionC },
        { id: 'D', text: optionD }
      ],
      correctAnswer: 'A' // placeholder, to be filled below
    });
  }

  // Parse answer key
  const answers: Record<number, string> = {};
  const answerMatches = RAW_KEYS.matchAll(/\*\*(\d+)\*\*\s+\|\s+([A-D])/g);
  for (const match of answerMatches) {
    answers[parseInt(match[1], 10)] = match[2];
  }

  return questions.map(q => ({
    ...q,
    correctAnswer: answers[q.id] || 'A'
  }));
}

// Prefetch and export
export const ALL_QUESTIONS = parseQuestions();
