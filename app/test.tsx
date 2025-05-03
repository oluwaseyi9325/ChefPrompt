'use client';

import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const genAI = new GoogleGenAI({
  apiKey: 'AIzaSyCd8FpjuU8meNDv-mJaN1jM_QVbWMHcasM',
});

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [category, setCategory] = useState('');
  const [recipeLength, setRecipeLength] = useState('short');
  const [recipeText, setRecipeText] = useState('');
  const [groceryList, setGroceryList] = useState('');
  const [typing, setTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const generateRecipes = async () => {
    setTyping(true);
    setRecipeText('');
    setGroceryList('');
    setErrorMessage('');

    const prompt = `
      I have the following ingredients: ${ingredients}.
      My dietary preferences are: ${preferences || 'none'}.
      My category is: ${category || 'general'}.
      Suggest 3 creative recipe ideas with:
      - A title
      - A short description (limit to ${recipeLength})
    `;

    try {
      const result = await genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      let text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No recipe found.';

      // Remove lines with "Link:" or "[Placeholder"
      text = text
        .split('\n')
        .filter(line => !line.trim().toLowerCase().startsWith('* **link:**') && !line.includes('placeholder'))
        .join('\n');

      let index = 0;
      const interval = setInterval(() => {
        setRecipeText((prev) => prev + text.charAt(index));
        index++;
        if (index >= text.length) {
          clearInterval(interval);
          setTyping(false);
        }
      }, 20);

      setGroceryList(`🛒 Grocery List: ${ingredients.split(',').map(i => i.trim()).join(', ')}`);
      setIngredients('');
      setPreferences('');
      setCategory('');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message?.includes('503')
        ? '⚠️ App is overloaded. Please try again later.'
        : '❌ Failed to generate recipe.');
      setTyping(false);
    }
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(`${recipeText}\n\n${groceryList}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-gray-800 px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-green-700">🍽️ TasteGPT 🍽️</h1>

        <div className="relative bg-[#F0FFF4] rounded-lg p-6 shadow-md border border-green-300 text-sm max-h-96 overflow-y-auto">
          {errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <>
              {recipeText ? (
                <p className="whitespace-pre-wrap">{recipeText}</p>
              ) : (
                <p className="text-gray-400">Your generated recipe will appear here...</p>
              )}
            </>
          )}

          {(recipeText || groceryList) && (
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-md hover:bg-green-500 transition"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}

          {groceryList && (
            <div className="absolute bottom-3 left-6 right-6 text-green-600 font-medium bg-[#F0FFF4] pt-2">
              {groceryList}
            </div>
          )}

          {typing && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="animate-spin border-t-2 border-b-2 border-green-400 w-6 h-6 rounded-full"></div>
            </div>
          )}
        </div>

        <div className="grid gap-4">
          <textarea
            placeholder="Enter ingredients (e.g. tomato, rice)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white placeholder-gray-400 text-gray-800 resize-none"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={3}
          />
          <textarea
            placeholder="Dietary preferences (e.g. vegetarian)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white placeholder-gray-400 text-gray-800 resize-none"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800"
            >
              <option value="">Select category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
            </select>
            <select
              value={recipeLength}
              onChange={(e) => setRecipeLength(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800"
            >
              <option value="short">Short</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateRecipes}
          disabled={typing}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {typing ? 'Generating...' : 'Generate Recipes'}
        </button>
      </div>
    </div>
  );
};

export default RecipeGenerator;

