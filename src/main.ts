import axios from 'axios';
import './style.scss'

const mainResult = document.getElementById('pokeResult') as HTMLDivElement;
const pokeForm = document.getElementById('pokeForm') as HTMLFormElement;

pokeForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const pokeInput = document.getElementById('pokeInput') as HTMLInputElement;
  const searchPoke = pokeInput.value;

  const url = `https://api.pokemontcg.io/v2/cards?q=name:"${searchPoke}"`;

  try {
    const response = await axios.get<CardApiResponse>(url, { 
      headers: {
        'x-api-key': 'c4e17756-cc0e-4084-87ce-a9203536f1d8'
      }
    });

    const data = response.data;

    if (mainResult) {
      mainResult.innerHTML = "";
    }
    // Check if there are any cards in the response
    if (data.data && data.data.length > 0) {
      const q = Math.min(20, data.data.length);

      for (let i = 0; i < q; i++) {
        const img = document.createElement('img') as HTMLImageElement;
        img.src = data.data[i].images.large;
        img.classList.add("pokeCards");
        mainResult.appendChild(img);
      }
    } else {
      console.log(`No cards found for: ${searchPoke}`);
    }
  } catch {
    // Handle other errors
    console.error('Error fetching data');
  }
  
});

// Define types for the API response
interface CardApiResponse {
  data: {
    images: {
      large: string;
    };
  }[];
}

