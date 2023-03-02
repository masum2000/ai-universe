const loadAllData = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayCard(data.data.tools))
}

const displayCard = allCard =>{
    console.log(allCard)
    const allCardContainer = document.getElementById('ai-container');
    allCard.forEach(card =>{
        const cardDiv= document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML =`
        
        <div class="card h-100">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ul class="card-features">
                   ${card.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                <h6>${card.name}</h6>
                <p><i class="fa-solid fa-calendar-days"></i> ${card.published_in}</p>
                </div>
                <div>
                <button type="button" class="btn btn-info rounded-circle"><i class="fa-solid fa-arrow-right"></i></button>
                </div>

            </div>
        </div>
        
        `;
        allCardContainer.appendChild(cardDiv);
    })
}


loadAllData();