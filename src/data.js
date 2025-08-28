// src/data.js
export const recipes = [
  {
    id: 1,
    title: "Spaghetti",
    cuisine: "Italian",
    type: "Veg",
    difficulty: "Easy",
    tasteRating: 4.5,
    healthRating: 3,
    nutrition: { calories: "350 kcal", protein: "12g", fat: "10g", carbs: "55g" },
    video: "https://www.youtube.com/embed/ZP-PlWOt4H0",
    ingredients: [
      "200g spaghetti",
      "2 cups tomato sauce",
      "1 tbsp olive oil",
      "Salt & pepper to taste"
    ],
    steps: [
      "Boil spaghetti in salted water for 8–10 minutes.",
      "Drain and toss with olive oil.",
      "Add tomato sauce and simmer for 5 minutes.",
      "Serve hot."
    ]
  },
  {
    id: 2,
    title: "Sushi",
    cuisine: "Japanese",
    type: "Non-Veg",
    difficulty: "Hard",
    tasteRating: 4.8,
    healthRating: 4,
    nutrition: { calories: "300 kcal", protein: "20g", fat: "8g", carbs: "40g" },
    video: "https://www.youtube.com/embed/ZzLPUoetSHw",
    ingredients: [
      "2 cups sushi rice",
      "Nori sheets",
      "Fresh salmon or tuna",
      "Soy sauce",
      "Wasabi"
    ],
    steps: [
      "Cook sushi rice and season with rice vinegar.",
      "Spread rice evenly on a nori sheet.",
      "Add fish and vegetables in the center.",
      "Roll tightly using a bamboo mat and slice.",
      "Serve with soy sauce and wasabi."
    ]
  },
  {
    id: 3,
    title: "Paneer Tikka",
    cuisine: "Indian",
    type: "Veg",
    difficulty: "Medium",
    tasteRating: 4.7,
    healthRating: 3.5,
    nutrition: { calories: "280 kcal", protein: "16g", fat: "18g", carbs: "12g" },
    video: "https://www.youtube.com/embed/Ccga9wOkA4c",
    ingredients: [
      "200g paneer cubes",
      "1 cup yogurt",
      "Spices (turmeric, chili powder, garam masala)",
      "1 tbsp lemon juice"
    ],
    steps: [
      "Mix yogurt with spices and lemon juice.",
      "Marinate paneer cubes for 1 hour.",
      "Grill or bake until golden brown.",
      "Serve with mint chutney."
    ]
  },
  {
    id: 4,
    title: "Chicken Biryani",
    cuisine: "Indian",
    type: "Non-Veg",
    difficulty: "Hard",
    tasteRating: 5,
    healthRating: 3,
    nutrition: { calories: "600 kcal", protein: "25g", fat: "20g", carbs: "80g" },
    video: "https://www.youtube.com/embed/95BCU1n268w",
    ingredients: [
      "500g chicken",
      "2 cups basmati rice",
      "Onions, tomatoes",
      "Biryani masala",
      "Yogurt"
    ],
    steps: [
      "Cook rice halfway and keep aside.",
      "Fry onions and cook chicken with spices.",
      "Layer chicken and rice, sprinkle saffron water.",
      "Cover and cook on low heat for 20 minutes."
    ]
  },
  {
    id: 5,
    title: "Grilled Cheese Sandwich",
    cuisine: "American",
    type: "Veg",
    difficulty: "Easy",
    tasteRating: 4.6,
    healthRating: 2.5,
    nutrition: { calories: "400 kcal", protein: "12g", fat: "22g", carbs: "38g" },
    video: "https://www.youtube.com/embed/ZwtrdnXnkYs",
    ingredients: [
      "2 bread slices",
      "Cheddar cheese slices",
      "Butter"
    ],
    steps: [
      "Butter the bread slices.",
      "Place cheese between slices.",
      "Grill until golden brown on both sides."
    ]
  },
  {
    id: 6,
    title: "Keto Avocado Salad",
    cuisine: "Fusion",
    type: "Keto",
    difficulty: "Easy",
    tasteRating: 4.2,
    healthRating: 5,
    nutrition: { calories: "250 kcal", protein: "4g", fat: "20g", carbs: "10g" },
    video: "https://www.youtube.com/embed/YQG0ieYINc0",
    ingredients: [
      "2 ripe avocados",
      "Lettuce leaves",
      "Cherry tomatoes",
      "Olive oil",
      "Salt & pepper"
    ],
    steps: [
      "Chop avocados and vegetables.",
      "Drizzle with olive oil.",
      "Season with salt & pepper.",
      "Toss and serve fresh."
    ]
  },
  {
    id: 7,
    title: "Tofu Stir Fry",
    cuisine: "Chinese",
    type: "Vegan",
    difficulty: "Medium",
    tasteRating: 4.3,
    healthRating: 4.5,
    nutrition: { calories: "280 kcal", protein: "14g", fat: "12g", carbs: "20g" },
    video: "https://www.youtube.com/embed/UpCKEtS_1-Q",
    ingredients: [
      "200g tofu cubes",
      "Mixed vegetables",
      "Soy sauce",
      "Garlic & ginger"
    ],
    steps: [
      "Pan fry tofu until golden.",
      "Stir fry vegetables with garlic & ginger.",
      "Add tofu and soy sauce.",
      "Serve hot."
    ]
  },
  {
    id: 8,
    title: "Egg Curry",
    cuisine: "Indian",
    type: "Eggetarian",
    difficulty: "Medium",
    tasteRating: 4.4,
    healthRating: 3.8,
    nutrition: { calories: "320 kcal", protein: "14g", fat: "18g", carbs: "20g" },
    video: "https://www.youtube.com/embed/xH2iedsq0qA",
    ingredients: [
      "4 boiled eggs",
      "Onions, tomatoes",
      "Spices (turmeric, chili, garam masala)",
      "Oil"
    ],
    steps: [
      "Prepare curry base with onions, tomatoes, and spices.",
      "Add boiled eggs and simmer for 5 minutes.",
      "Serve with rice or roti."
    ]
  },
  {
    id: 9,
    title: "Beef Steak",
    cuisine: "American",
    type: "Non-Veg",
    difficulty: "Hard",
    tasteRating: 4.9,
    healthRating: 3,
    nutrition: { calories: "500 kcal", protein: "40g", fat: "30g", carbs: "5g" },
    video: "https://www.youtube.com/embed/kUXXjApmS-E",
    ingredients: [
      "300g beef steak",
      "Salt & pepper",
      "Butter",
      "Garlic cloves"
    ],
    steps: [
      "Season steak with salt & pepper.",
      "Sear in a hot pan with butter & garlic.",
      "Cook to desired doneness.",
      "Rest for 5 minutes before serving."
    ]
  },
  {
    id: 10,
    title: "Vegan Buddha Bowl",
    cuisine: "Fusion",
    type: "Vegan",
    difficulty: "Easy",
    tasteRating: 4.5,
    healthRating: 5,
    nutrition: { calories: "300 kcal", protein: "10g", fat: "12g", carbs: "35g" },
    video: "https://www.youtube.com/embed/Ie201t8ysww",
    ingredients: [
      "Cooked quinoa",
      "Roasted vegetables",
      "Hummus",
      "Lettuce"
    ],
    steps: [
      "Arrange quinoa, vegetables, and lettuce in a bowl.",
      "Top with hummus.",
      "Serve fresh."
    ]
  },
  {
    id: 11,
    title: "Pancakes",
    cuisine: "Continental",
    type: "Veg",
    difficulty: "Easy",
    tasteRating: 4.6,
    healthRating: 2.8,
    nutrition: { calories: "350 kcal", protein: "8g", fat: "14g", carbs: "50g" },
    video: "https://www.youtube.com/embed/gk4Do47MAG4",
    ingredients: [
      "1 cup flour",
      "1 cup milk",
      "1 egg",
      "2 tbsp sugar",
      "Butter"
    ],
    steps: [
      "Mix all ingredients to make batter.",
      "Pour onto hot pan and cook until bubbles form.",
      "Flip and cook the other side.",
      "Serve with syrup."
    ]
  },
  {
    id: 12,
    title: "Cauliflower Pizza",
    cuisine: "Italian",
    type: "Keto",
    difficulty: "Medium",
    tasteRating: 4.1,
    healthRating: 4.8,
    nutrition: { calories: "280 kcal", protein: "12g", fat: "15g", carbs: "18g" },
    video: "https://www.youtube.com/embed/FGorXsGevrk",
    ingredients: [
      "1 cauliflower head",
      "Cheese",
      "Tomato sauce",
      "Toppings of choice"
    ],
    steps: [
      "Grate and cook cauliflower, then press out excess water.",
      "Mix with cheese to form dough.",
      "Bake crust, add toppings, and bake again."
    ]
  },
  {
    id: 13,
    title: "Miso Soup",
    cuisine: "Japanese",
    type: "Vegan",
    difficulty: "Easy",
    tasteRating: 4.2,
    healthRating: 5,
    nutrition: { calories: "90 kcal", protein: "6g", fat: "3g", carbs: "12g" },
    video: "https://www.youtube.com/embed/LqezQuxBGuw",
    ingredients: [
      "Miso paste",
      "Tofu cubes",
      "Seaweed",
      "Spring onions"
    ],
    steps: [
      "Boil water and dissolve miso paste.",
      "Add tofu and seaweed.",
      "Simmer for 5 minutes.",
      "Garnish with spring onions."
    ]
  },
  {
    id: 14,
    title: "Fish Tacos",
    cuisine: "Mexican",
    type: "Non-Veg",
    difficulty: "Medium",
    tasteRating: 4.7,
    healthRating: 3.8,
    nutrition: { calories: "350 kcal", protein: "22g", fat: "14g", carbs: "32g" },
    video: "https://www.youtube.com/embed/t2wmcGfYrlU",
    ingredients: [
      "Fish fillets",
      "Taco shells",
      "Cabbage slaw",
      "Lime juice"
    ],
    steps: [
      "Season and cook fish.",
      "Fill taco shells with fish and slaw.",
      "Drizzle with lime juice.",
      "Serve immediately."
    ]
  },
  {
    id: 15,
    title: "Chickpea Salad",
    cuisine: "Mediterranean",
    type: "Vegan",
    difficulty: "Easy",
    tasteRating: 4.3,
    healthRating: 5,
    nutrition: { calories: "220 kcal", protein: "9g", fat: "8g", carbs: "30g" },
    video: "https://www.youtube.com/embed/49UoYtsqieM",
    ingredients: [
      "Boiled chickpeas",
      "Cucumber, tomatoes",
      "Olive oil",
      "Lemon juice"
    ],
    steps: [
      "Mix chickpeas and vegetables.",
      "Drizzle olive oil and lemon juice.",
      "Toss and serve."
    ]
  }
];
