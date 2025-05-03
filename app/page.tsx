'use client';

import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const genAI = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
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
        <h1 className="text-4xl font-bold text-center text-green-700">
          🍽️ MealMind 🍽️
          <Dialog>
            <DialogTrigger asChild>
              <span className="block mt-1 text-xs text-gray-500 underline cursor-pointer">
                Testing version
              </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-green-700 text-base">🚀 Coming Soon in MealMind</DialogTitle>
                <DialogDescription className="text-sm text-gray-700 mt-1">
                  Here's a sneak peek of what's coming:
                </DialogDescription>
              </DialogHeader>
              <ul className="list-disc pl-5 text-sm space-y-2 text-gray-700 mt-3">
                <li>Save favorite recipes to your profile</li>
                <li>Auto-generate weekly meal plans</li>
                <li>One-click grocery list export (PDF/CSV)</li>
                <li>Voice input for ingredients and preferences</li>
                <li>AI-powered meal substitutions & suggestions</li>
              </ul>
              <DialogFooter>
                <Button variant="secondary" className="mt-4">Got it!</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </h1>


        <div className="relative bg-[#F0FFF4] rounded-lg p-6 shadow-md border border-green-300 text-sm max-h-96 overflow-y-auto pb-16">
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
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className="absolute top-3 right-3 text-xs bg-white border border-green-600 text-green-700 hover:bg-green-100"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          )}

          {typing && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="animate-spin border-t-2 border-b-2 border-green-400 w-6 h-6 rounded-full"></div>
            </div>
          )}

          {groceryList && (
            <div className=" bottom-2 left-6 right-6 text-green-600 font-medium">
              {groceryList}
            </div>
          )}
        </div>

        <div className="grid gap-4">
          <Textarea
            placeholder="Enter ingredients (e.g. tomato, rice)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={3}
            className='resize-none'
          />
          <Textarea
            placeholder="Dietary preferences (e.g. vegetarian)"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            rows={3}
            className='resize-none'
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className='h-12'>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Dessert">Dessert</SelectItem>
              </SelectContent>
            </Select>

            <Select value={recipeLength} onValueChange={setRecipeLength}>
              <SelectTrigger className='h-12'>
                <SelectValue placeholder="Select detail level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Short</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={generateRecipes}
          disabled={typing}
          className="w-full py-3 h-12 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {typing ? 'Generating...' : 'Generate Recipes'}
        </Button>
      </div>
    </div>
  );
};

export default RecipeGenerator;
