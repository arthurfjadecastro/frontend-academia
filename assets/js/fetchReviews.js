const apiKey = "AIzaSyCii7uOq-Jpt7XaCKLJyRp9aqIzRHCYgT8";
const placeId = ""; // Substitua pelo seu Place ID

async function fetchReviews() {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    );

    if (!response.ok) {
      console.error(`Erro HTTP: ${response.status}`);
      return;
    }

    const data = await response.json();

    if (data.result && data.result.reviews) {
      displayReviews(data.result.reviews);
    } else {
      console.error("Nenhum depoimento encontrado");
    }
  } catch (error) {
    console.error("Erro ao buscar depoimentos:", error);
  }
}

function displayReviews(reviews) {
  const slider = document.querySelector(".testimonials-slider");

  // Verifica se o elemento existe
  if (!slider) {
    console.error("Elemento .testimonials-slider não encontrado no DOM");
    return;
  }

  slider.innerHTML = ""; // Limpa os slides atuais

  reviews.forEach((review) => {
    const slide = document.createElement("div");
    slide.classList.add("testimonial-slide");

    slide.innerHTML = `
              <p>“${review.text || "Sem comentário"}”</p>
              <img src="assets/img/testimonials-placeholder.png" alt="img" />
              <h3 class="name">${
                review.author_name || "Autor desconhecido"
              }</h3>
              <div class="prof">Nota: ${review.rating || "N/A"}/5</div>
          `;
    slider.appendChild(slide);
  });
}

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", fetchReviews);
