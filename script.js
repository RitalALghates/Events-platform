function filterEvents() {
    var selectedType = document.getElementById('event-type').value;
    var events = document.querySelectorAll('.event-card');
    
    events.forEach(function(event) {
        if (selectedType === 'all' || event.classList.contains(selectedType)) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
}

function bookEvent() {
    alert("تم حجز التذكرة بنجاح!");
}
