let habits = JSON.parse(localStorage.getItem('habits')) || [];
let username = localStorage.getItem('username') || "";

window.onload = () => {
  if (username) {
    document.getElementById('usernameForm').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    document.getElementById('greeting').innerText = `Welcome back, ${username}!`;
    renderHabits();
  }
};

function saveUsername() {
  const input = document.getElementById('usernameInput').value;
  if (input.trim() !== "") {
    username = input;
    localStorage.setItem('username', username);
    document.getElementById('usernameForm').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    document.getElementById('greeting').innerText = `🏆 Welcome, ${username}! Let's achieve greatness today!`;
    renderHabits();
  }
}

function addHabit() {
  const habitInput = document.getElementById('habitInput');
  const habitName = habitInput.value.trim();
  if (habitName) {
    habits.push({ name: habitName, streak: 0, lastDone: null });
    habitInput.value = "";
    saveAndRender();
  }
}

function renderHabits() {
  const list = document.getElementById('habitList');
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement('li');
    li.className = 'habit-item';
    
    li.innerHTML = `
      <strong>${habit.name}</strong><br>
      Streak: ${habit.streak} days<br>
      <button onclick="markDone(${index})">Mark Done</button>
      <button onclick="editHabit(${index})">Edit</button>
      <button onclick="deleteHabit(${index})">Delete</button>
      <div class="progress-bar" style="width:${Math.min(habit.streak * 10, 100)}%"></div>
    `;
    list.appendChild(li);
  });

  renderBadges();
}

function saveAndRender() {
  localStorage.setItem('habits', JSON.stringify(habits));
  renderHabits();
}

function markDone(index) {
  const today = new Date().toDateString();
  
  if (habits[index].lastDone !== today) {
    if (habits[index].lastDone === getYesterday()) {
      habits[index].streak += 1;
    } else {
      habits[index].streak = 1;
    }
    habits[index].lastDone = today;
    saveAndRender();
  } else {
    alert("You've already marked it done today!");
  }
}

function editHabit(index) {
  const newName = prompt("Edit your habit:", habits[index].name);
  if (newName.trim() !== "") {
    habits[index].name = newName;
    saveAndRender();
  }
}

function deleteHabit(index) {
  if (confirm("Delete this habit?")) {
    habits.splice(index, 1);
    saveAndRender();
  }
}

function getYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toDateString();
}

function renderBadges() {
  const badgeArea = document.getElementById('badgeArea');
  badgeArea.innerHTML = "";

  habits.forEach(habit => {
    if (habit.streak >= 30) {
      badgeArea.innerHTML += `<p>🏆 ${habit.name}: 30 Days Streak Master!</p>`;
    } else if (habit.streak >= 7) {
      badgeArea.innerHTML += `<p>🎉 ${habit.name}: 7 Days Champion!</p>`;
    }
  });
}
