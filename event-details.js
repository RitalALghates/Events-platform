document.addEventListener("DOMContentLoaded", () => {
  const event = JSON.parse(localStorage.getItem("selectedEvent"));
  if (event) {
    const eventDescription = document.getElementById("event-description");
    eventDescription.innerHTML = `
            <h2>${event.name}</h2>
            <img src="${event.image}" alt="${event.name}">
            <p>${event.description}</p>
            <p>التاريخ: ${event.date}</p>
            <p>المكان: ${event.venue}</p>
            <p>السعر: ${event.price}</p>
        `;
  }

  const bookButton = document.getElementById("book-button");
  bookButton.addEventListener("click", () => {
    alert(`تم حجز تذكرة للحفلة "${event.name}"`);
  });
});


