/**
 * 주어진 텍스트에서 검색어를 하이라이트 처리합니다.
 * @param text 원본 텍스트
 * @param searchTerm 검색어
 * @returns 하이라이트된 HTML 문자열
 */
export const highlightText = (text: string, searchTerm: string): string => {
  if (!searchTerm || !text) return text;
  
  // 검색어를 공백으로 분리하여 각 단어를 배열로 만듭니다
  const searchTerms = searchTerm.split(/\s+/).filter(term => term.length > 0);
  
  // 각 검색어에 대해 하이라이트를 적용합니다
  let highlightedText = text;
  searchTerms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi');
    highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  });
  
  return highlightedText;
}; 