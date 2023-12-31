// all data loader here .API
const loadAllData = (defaultCard) => {
  loadSpinner(true);
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => {
      allData = data.data.tools;
      displayCard(data.data.tools, defaultCard);
    });
};

const displayCard = (allCard, defaultCard) => {
  // console.log(allCard)
  const allCardContainer = document.getElementById("card-container");
  allCardContainer.innerHTML = "";

  if (defaultCard && allCard.length > 6) {
    allCard = allCard.slice(0, 6);
    document.getElementById("see-more-btn").classList.remove("d-none");
  }

  allCard.forEach((card) => {
    // console.log(card.id)
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");
    cardDiv.innerHTML = `
        
        <div class="card h-100">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol class="card-features">
                   ${card.features
                     .map((feature) => `<li>${feature}</li>`)
                     .join("")}
                </ol>
            </div>
             <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                <h6>${card.name}</h6>
                <p><i class="fa-solid fa-calendar-days"></i> ${
                  card.published_in
                }</p>
                </div>
                <div class="">
                <button onclick ="loadCardDetails('${
                  card.id
                }')" type="button" class="card-btn btn btn-info rounded-circle " data-bs-toggle="modal" data-bs-target="#cardDetails"><i class="fa-solid fa-arrow-right"></i></button>
                </div>

             </div>
        </div>
        
        `;
    allCardContainer.appendChild(cardDiv);
    loadSpinner(false);
  });
};

// show all data by see more button
const seeMoreData = () => {
  loadAllData();
  loadSpinner(true);
  document.getElementById("see-more-btn").classList.add("d-none");
};
// spinner/loading
const loadSpinner = (value) => {
  const spinner = document.getElementById("loader");
  if (value) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// Cards details data load here
function loadCardDetails(id) {
  fetch(` https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => detailsCard(data.data));
}
const detailsCard = (cardDetails) => {
  const detailsCardContainer = document.getElementById(
    "card-details-container"
  );
  detailsCardContainer.innerHTML = "";
  const {
    description,
    image_link,
    input_output_examples,
    pricing,
    accuracy,
    integrations,
    features,
  } = cardDetails;
  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add(
    "modal-body",
    "d-flex",
    "flex-column",
    "flex-md-row",
    "gap-2"
  );
  detailsDiv.innerHTML = `
      <div class="border border-danger rounded p-2 card-details">
      <div>
        <h6>${description}</h6>
      </div>
      <div class="d-flex  justify-content-around ">
        <div class="border rounded p-2 me-2 text-success text-center">
          <p>${pricing ? pricing[0].price : "Free of coast"}</p>
           <p>${pricing ? pricing[0].plan : "Basic"}</p>
        </div>
        <div class="border rounded p-2 me-2 text-warning text-center" >
           <p>${pricing ? pricing[1].price : "Free of coast"}</p>
           <p>${pricing ? pricing[1].plan : "Basic"}</p>
        </div>
        <div class="border rounded p-2 px-1 text-danger text-center">
            <p>${pricing ? pricing[2].price : "Free of coast"}</p>
            <p>${pricing ? pricing[2].plan : "Basic"}</p>
        </div>
      </div>
      <div class="d-flex mt-2">
        <div>
          <h6>Features</h6>
          <ul>
          ${modalFeature(features)}
          </ul>
        </div>
        <div>
          <h6>Integrations</h6>
          <ul>
          ${integrationsShow(integrations)}
        
          </ul>
        </div>
      </div>
    </div>
    <div class="border  rounded p-2 ">
        <div class="accuracy-btn">
        ${accuracyDetails(accuracy)}
        </div>
       <div>
        <img src="${image_link[0]}" alt="..." class="w-100 rounded">
       </div>
       <div class="mt-4 text-center">
         <h6>${
           input_output_examples
             ? input_output_examples[0].input
             : "Can you give any example?"
         }</h6>
        <p class="mt-3">${
          input_output_examples
            ? input_output_examples[0].output
            : "No! Not Yet! Take a break!!!"
        }</p>
       </div>
    </div>
      `;
  detailsCardContainer.appendChild(detailsDiv);
};
// show all integrations in modal
function integrationsShow(integrations) {
  let integrationsValue = "";
  if (integrations === null) {
    return `<li>No items found</li>`;
  } else {
    integrations.forEach((integrations) => {
      integrationsValue += `<li>${integrations}</li>`;
    });
    return integrationsValue;
  }
}
// show all modal feature
const modalFeature = (features) => {
  let modalFeatureHtml = "";
  for (const value in features) {
    modalFeatureHtml += `<li>${features[value].feature_name}</li>`;
  }
  return modalFeatureHtml;
};
// show all data Sort By Date button
const showDateTime = () => {
  loadSpinner(true);
  const all = allData.sort(function (a, b) {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    return dateB - dateA;
  });
  document.getElementById("see-more-btn").classList.add("d-none");
  displayCard(all);
};

// show accuracy
const accuracyDetails = (accuracy) => {
  let accuracyHtml = "";
  if (accuracy.score !== null) {
    accuracyHtml = `<button class="btn btn-warning text-white">${
      accuracy.score * 100
    }% accuracy</button>`;
  }
  return accuracyHtml;
};
