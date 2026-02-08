export async function generateSummary(content: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Extract first 100 chars as summary
  const summary = content.length > 100 
    ? content.substring(0, 100) + '...' 
    : content;
  
  return `Summary: ${summary}`;
}

export async function generateTags(title: string, content: string): Promise<string[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Simple keyword extraction
  const text = (title + ' ' + content).toLowerCase();
  const words = text.split(/\s+/);
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'is', 'it', 'this', 'that']);
  
  const tags = words
    .filter(w => w.length > 4 && !commonWords.has(w))
    .filter((w, i, arr) => arr.indexOf(w) === i) // unique
    .slice(0, 5);
  
  return tags.length > 0 ? tags : ['knowledge', 'note', 'information'];
}