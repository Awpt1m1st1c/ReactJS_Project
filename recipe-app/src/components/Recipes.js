import { useEffect, useState } from "react";
import axios from "axios";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((r, i) => (
          <li key={i}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recipes;
