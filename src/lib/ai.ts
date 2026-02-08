const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Using Hugging Face's free inference API
const SUMMARIZATION_MODEL = 'facebook/bart-large-cnn';

async function callHuggingFace(model: string, inputs: any): Promise<any> {
  if (!HF_API_KEY) {
    throw new Error('HUGGINGFACE_API_KEY not configured');
  }

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Hugging Face API error:', errorText);
    
    // Model might be loading
    if (errorText.includes('loading')) {
      throw new Error('MODEL_LOADING');
    }
    
    throw new Error(`HF API failed: ${response.status}`);
  }

  return await response.json();
}

export async function generateSummary(content: string): Promise<string> {
  try {
    // Truncate content if too long (max ~1024 tokens for BART)
    const maxLength = 1000;
    const truncatedContent = content.length > maxLength 
      ? content.substring(0, maxLength) 
      : content;

    const result = await callHuggingFace(SUMMARIZATION_MODEL, {
      inputs: truncatedContent,
      parameters: {
        max_length: 100,
        min_length: 30,
        do_sample: false,
      },
    });

    let summary = '';
    
    // Handle different response formats
    if (Array.isArray(result)) {
      summary = result[0]?.summary_text || result[0]?.generated_text || '';
    } else if (result.summary_text) {
      summary = result.summary_text;
    } else if (result.generated_text) {
      summary = result.generated_text;
    }

    // Clean up
    summary = summary.trim();
    
    if (!summary) {
      throw new Error('Empty summary received');
    }

    // Capitalize first letter
    summary = summary.charAt(0).toUpperCase() + summary.slice(1);
    
    // Ensure proper ending
    if (!summary.endsWith('.') && !summary.endsWith('!') && !summary.endsWith('?')) {
      summary += '.';
    }
    
    return summary;
  } catch (error) {
    console.error('Error generating summary:', error);
    
    // Use improved fallback for any error
    return fallbackSummary(content);
  }
}

export async function generateTags(title: string, content: string): Promise<string[]> {
  try {
    // Extract keywords using simple NLP
    const tags = extractKeywords(title, content);
    
    return tags.length > 0 ? tags : ['knowledge'];
  } catch (error) {
    console.error('Error generating tags:', error);
    return fallbackTags(title, content);
  }
}

// Helper: Extract keywords for tags
function extractKeywords(title: string, content: string): string[] {
  const text = (title + ' ' + title + ' ' + content).toLowerCase(); // Weight title
  const words = text.match(/\b[a-z]{4,}\b/g) || [];
  
  const stopWords = new Set([
    'this', 'that', 'with', 'from', 'have', 'been', 'were',
    'their', 'about', 'which', 'these', 'those', 'would',
    'could', 'should', 'there', 'where', 'when', 'what',
    'them', 'they', 'then', 'than', 'some', 'such', 'into',
    'just', 'like', 'also', 'more', 'very', 'only', 'over',
    'other', 'make', 'made', 'much', 'many', 'most', 'being',
    'heat', 'cook', 'till', 'done', 'well', 'using', 'optional'
  ]);
  
  // Count word frequency
  const wordFreq = new Map<string, number>();
  words.forEach(word => {
    if (!stopWords.has(word) && word.length >= 4) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  });
  
  // Get top 5 most frequent words as tags
  return Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word);
}

// IMPROVED FALLBACK: Creates actual summaries instead of just copying text
function fallbackSummary(content: string): string {
  // If content is very short, just return it
  if (content.length < 100) {
    return content;
  }

  // Try to intelligently extract key information
  const lowerContent = content.toLowerCase();
  
  // For recipes: extract main ingredient and cooking method
  if (lowerContent.includes('tbsp') || lowerContent.includes('tsp') || 
      lowerContent.includes('heat') || lowerContent.includes('cook')) {
    
    // Extract main nouns (likely ingredients/dishes)
    const words = content.split(/\s+/);
    const mainWords = words.filter(w => 
      w.length > 4 && 
      /^[A-Z]/.test(w) && 
      !['Heat', 'Cook', 'Warm', 'Turn', 'Squeeze'].includes(w)
    ).slice(0, 3);
    
    // Check for cooking actions
    const hasSauteing = lowerContent.includes('sauté') || lowerContent.includes('saute');
    const hasAssembly = lowerContent.includes('assemble') || lowerContent.includes('taco') || lowerContent.includes('tortilla');
    
    if (mainWords.length > 0 && hasAssembly) {
      return `A recipe for making ${mainWords[0].toLowerCase()}s with filling, toppings, and assembly instructions.`;
    } else if (hasSauteing) {
      return `Cooking instructions involving sautéing ingredients with spices and seasonings.`;
    }
  }
  
  // For general content: extract first meaningful sentence
  const sentences = content
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 30 && s.length < 200); // Meaningful sentences
  
  if (sentences.length > 0) {
    // Take first sentence and make it shorter if needed
    let summary = sentences[0];
    
    // If still too long, extract key phrase
    if (summary.length > 150) {
      const words = summary.split(' ');
      summary = words.slice(0, 20).join(' ') + '...';
    }
    
    return summary + (summary.endsWith('.') ? '' : '.');
  }
  
  // Last resort: take first 150 chars
  return content.substring(0, 150).trim() + '...';
}

function fallbackTags(title: string, content: string): string[] {
  return extractKeywords(title, content);
}