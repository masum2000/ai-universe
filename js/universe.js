const loadAllData = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayCard(data.data.tools))
}

const displayCard = allCard =>{
    // console.log(allCard)
    const allCardContainer = document.getElementById('card-container');

    // allCard = allCard.slice(0,6)

    allCard.forEach(card =>{
        const cardDiv= document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML =`
        
        <div class="card h-100">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol class="card-features">
                   ${card.features.map(feature => `<li>${feature}</li>`).join('')}
                </ol>
            </div>
             <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                <h6>${card.name}</h6>
                <p><i class="fa-solid fa-calendar-days"></i> ${card.published_in}</p>
                </div>
                <div>
                <button onclick ="loadCardDetails(${card.id})" type="button" class="btn btn-info rounded-circle" data-bs-toggle="modal" data-bs-target="#cardDetails"><i class="fa-solid fa-arrow-right"></i></button>
                </div>

             </div>
        </div>
        
        `;
        allCardContainer.appendChild(cardDiv);
    })
}


// const displayAllData = (cards, length) => {
//     const cardSection = document.getElementById("card-container");
//     cardSection.innerHTML = '';
//     if (length && cards.length > 6) {
//         cards = cards.slice(0, 6);
//     }
// }
// window.addEventListener('load', () => {
//     const spinner = document.querySelector('.spinner-container');
//     spinner.classList.add('d-none');
// });


// const displayCard = allCard =>{
//     // console.log(allCard)
//     const allCardContainer = document.getElementById('ai-container');

//     // allCard = allCard.slice(0,6)

//     allCard.forEach(card =>{
//         const cardDiv= document.createElement('div');
//         cardDiv.classList.add('col');
//         cardDiv.innerHTML =`
const loadCardDetails  = () =>{
    fetch(' https://openapi.programming-hero.com/api/ai/tool/01')
    .then(res => res.json())
    .then(data =>detailsCard(data))
}

const detailsCard = cardDetails =>{
    console.log(cardDetails.data);
    const detailsCardContainer = document.getElementById('card-details-container');
        const detailsDiv = document.createElement('div');
        detailsDiv.innerHTML = `
        <div class="border border-danger rounded p-2 ">
        <div>
          <h6>${cardDetails.data.description}</h6>
        </div>
        <div class="d-flex  justify-content-around ">
          <div class="border rounded p-2 me-2 text-success">$10/month Basic</div>
          <div class="border rounded p-2 me-2 text-warning" >$50/month Pro</div>
          <div class="border rounded p-2 px-1 text-danger">Contact us Enterprise</div>
        </div>
        <div class="d-flex mt-2">
          <div>
            <h6>Features</h6>
            <ul>
              <li>Customizable responses</li>
              <li>Multilingual support</li>
              <li>Seamless integration</li>
            </ul>
          </div>
          <div>
            <h6>Integrations</h6>
            <ul>
              <li>FB Messenger</li>
              <li>Slack</li>
              <li>Telegram</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="border  rounded p-2 ">
         <div>
          <img src="${cardDetails.data.image_link[0]}" alt="..." class="w-75 rounded">
          
         </div>
         <div>
           <h6>${cardDetails.data.input_output_examples[0]}</h6>
          <p></p>
         </div>
      </div>
        `;
        detailsCardContainer.appendChild(detailsDiv);
    }
    




// if (numCardsToShow < numTools) {
//     const seeMoreBtnContainer = document.createElement('div');
//     seeMoreBtnContainer.classList.add('seeMore');

//     const seeMoreBtn = document.createElement('button');
//     seeMoreBtn.innerText = "See More";
//     seeMoreBtn.classList.add('btn', 'btn-danger', 'mb-3');
//     seeMoreBtn.addEventListener('click', () => {
//         const newNumCards = numCards + 6;
//         displayAiuniverse(data, newNumCards);
//     });

//     seeMoreBtnContainer.appendChild(seeMoreBtn);
//     cardContainer.appendChild(seeMoreBtnContainer);
// }

// const displayCardDetails = phone =>{
//     console.log(card);
//     const cardTitle = document.getElementById('cardDetailsLabel');
//     cardTitle.innerText = tools.name;
//     const cardDetails = document.getElementById('cardDetails');
// }

// document.getElementById("sort-by-date").addEventListener ('click', function(){


//     allData.sort(function(a, b) {
//     var dateA = new Date(a.published_in)
//     var dateB = new Date(b.published_in);
//     return dateA - dateB; 
//     });
//     // start loader
//     toggoleSpiner (true)
//     const aiTools = document.getElementById('Ai-Tools')
    
//     aiTools.innerHTML=''
    
//     allData.forEach (SingleTools => { 
//     aiToolsShow(SingleTools, aiTools)
//     })
//     document.getElementById('see_more").classList.add("d-none')
    
//     })

loadCardDetails();

loadAllData();