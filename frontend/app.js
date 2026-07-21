document.getElementById('generateBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const generateBtn = document.getElementById('generateBtn');
    const loading = document.getElementById('loading');
    const resultContainer = document.getElementById('resultContainer');
    const timelineDiv = document.getElementById('timeline');

    if (!userInput.trim()) {
        alert("Lütfen günlük planını veya hedeflerini yaz.");
        return;
    }

    generateBtn.disabled = true;
    generateBtn.classList.add('opacity-50');
    loading.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    timelineDiv.innerHTML = ''; 

    try {
        const response = await fetch('http://127.0.0.1:8000/plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_input: userInput }),
        });

        const data = await response.json();
        
        if (data.timeline) {
            document.getElementById('summaryText').innerText = data.summary;
            document.getElementById('totalHours').innerText = data.total_estimated_hours;

            data.timeline.forEach(task => {
                const taskCard = document.createElement('div');
                taskCard.className = 'timeline-card bg-white border border-gray-200 p-4 rounded-lg flex flex-col md:flex-row md:items-center gap-4 transition-all';
                
                let priorityColor = "bg-gray-100 text-gray-800";
                if (task.priority === "High") priorityColor = "bg-red-100 text-red-800";
                else if (task.priority === "Medium") priorityColor = "bg-yellow-100 text-yellow-800";
                else if (task.priority === "Low") priorityColor = "bg-green-100 text-green-800";

                taskCard.innerHTML = `
                    <div class="font-bold text-gray-700 whitespace-nowrap min-w-[120px]">
                        🕒 ${task.time_slot}
                    </div>
                    <div class="flex-1">
                        <h3 class="font-bold text-lg text-gray-900">${task.title} <span class="ml-2 text-xs font-semibold px-2 py-1 rounded ${priorityColor}">${task.priority}</span></h3>
                        <p class="text-gray-600 text-sm mt-1">${task.description}</p>
                        <span class="inline-block mt-2 text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">${task.category} • ${task.duration_minutes} dk</span>
                    </div>
                `;
                timelineDiv.appendChild(taskCard);
            });

            resultContainer.classList.remove('hidden');
        } else {
            alert("API Yanıtı: " + JSON.stringify(data));
        }

    } catch (error) {
        alert("Bir hata oluştu. Backend çalışıyor mu? Hata: " + error.message);
    } finally {
        generateBtn.disabled = false;
        generateBtn.classList.remove('opacity-50');
        loading.classList.add('hidden');
    }
});
