async function fetchTaxCode(event) {
    event.preventDefault();
  const taxCode = document.getElementById("taxcode");
  const cardresult = document.getElementById("cardresult");
  const taxCodeForm = document.querySelector(".taxcodeform");
  const myKey =
    "1d61d947581d2ed20be8454a7c8113c46770f1100da9a9d66894c5bdb5c9b53020d";

  // Ottieni i valori dagli input HTML

  // Utilizzando l'encodeURIComponent per evitare la codifica dei caratteri speciali esso codifica i caratteri speciali in codice HTML 
  let surname = encodeURIComponent(document.getElementById("surname").value); // Codifica caratteri speciali ' (%27)
  let namex = encodeURIComponent(document.getElementById("name").value);
  let gender = encodeURIComponent(document.getElementById("gender").value);
  let city = encodeURIComponent(document.getElementById("city").value); // Codifica caratteri speciali spazio (%20)
  let state = encodeURIComponent(document.getElementById("state").value); 
  let day = encodeURIComponent(document.getElementById("day").value);
  let month = encodeURIComponent(document.getElementById("month").value);
  let year = encodeURIComponent(document.getElementById("year").value);

  // Costruisci l'URL dinamicamente
  const url = `http://api.miocodicefiscale.com/calculate?lname=${surname}&fname=${namex}&gender=${gender}&city=${city}&state=${state}&day=${day}&month=${month}&year=${year}&omocodia_level=1&access_token=${myKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Errore nella richiesta");
    }

    const result = await response.json();
    if (result.status && result.data && result.data.cf) {
        const cf = result.data.cf; // Estrai il codice fiscale
        taxCode.innerHTML = cf; // Mostra il codice fiscale
        cardresult.querySelector("#display-surname").innerText = decodeURIComponent(document.getElementById("surname").value);
        cardresult.querySelector("#display-name").innerText = decodeURIComponent(document.getElementById("name").value);
        cardresult.querySelector("#display-gender").innerText = decodeURIComponent(document.getElementById("gender").value);
        cardresult.querySelector("#display-city").innerText = decodeURIComponent(document.getElementById("city").value);
        cardresult.querySelector("#display-state").innerText = decodeURIComponent(document.getElementById("state").value);
        cardresult.querySelector("#display-birthdate").innerText = `${decodeURIComponent(document.getElementById("day").value)}/${decodeURIComponent(document.getElementById("month").value)}/${decodeURIComponent(document.getElementById("year").value)}`;

        taxCodeForm.style.display = "none"; // Nascondi il modulo di input
        cardresult.style.display = "block"; // Aggiungi la classe per mostrare la card
       
        //Cancello i valori dopo che sono stati presi
        document.getElementById("surname").value = "";
        document.getElementById("name").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
        document.getElementById("day").value = "";
        document.getElementById("month").value = "";
        document.getElementById("year").value = "";
    } else {
        throw new Error("Codice fiscale non trovato nella risposta");
    }
   

  } catch (error) {
    console.log("Errore:", error);
  }
};


// Esso aspetta che il DOM e completamente caricato ed e pronto per essere manipolato.
document.addEventListener("DOMContentLoaded", function() {
    const closeCard = document.getElementById("close-card");
    closeCard.addEventListener("click", function() {
        const cardresult = document.getElementById("cardresult");
        const taxCodeForm = document.querySelector(".taxcodeform");
        cardresult.style.display = "none"; // Nascondi la card
        taxCodeForm.style.display = "block"; // Mostra il modulo
    });
});
