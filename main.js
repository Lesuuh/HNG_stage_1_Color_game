const colorsArray = [
  { name: "Red", shades: ["#FFCDD2", "#E57373", "#EF5350", "#D32F2F", "#B71C1C", "#8B0000"] },
  { name: "Blue", shades: ["#BBDEFB", "#64B5F6", "#42A5F5", "#1976D2", "#0D47A1", "#002F6C"] },
  { name: "Green", shades: ["#C8E6C9", "#81C784", "#4CAF50", "#388E3C", "#1B5E20", "#0D3B10"] },
  { name: "Yellow", shades: ["#FFF9C4", "#FFF176", "#FFEB3B", "#FBC02D", "#F57F17", "#D68910"] },
  { name: "Purple", shades: ["#E1BEE7", "#BA68C8", "#9C27B0", "#7B1FA2", "#4A148C", "#330066"] },
  { name: "Orange", shades: ["#FFE0B2", "#FFB74D", "#FF9800", "#F57C00", "#E65100", "#A84300"] },
  { name: "Teal", shades: ["#B2DFDB", "#4DB6AC", "#26A69A", "#00897B", "#00695C", "#004D40"] }
];

const scoreElement = document.getElementById("score");
let score = 0;
const gameStatus = document.getElementById("game-status");
const resetBtn = document.getElementById("reset");
const targetColorElement = document.getElementById("target-box");
const optionsElement = document.getElementById("options");

function getTargetColorAndOptions() {
  const randomIndex = Math.floor(Math.random() * colorsArray.length);
  const randomColorShade = colorsArray[randomIndex].shades;
  const shuffleShades = [...randomColorShade].sort(() => Math.random() - 0.5);
  const targetColorIndex = Math.floor(Math.random() * randomColorShade.length);
  const targetColor = randomColorShade[targetColorIndex];

  targetColorElement.style.backgroundColor = targetColor;
  optionsElement.innerHTML = "";

  shuffleShades.forEach((item) => {
    const li = document.createElement("li");
    li.style.width = "50px";
    li.style.height = "50px";
    li.style.borderRadius = "5px";
    li.style.padding = "10px";
    li.style.cursor = "pointer";
    li.style.backgroundColor = item;

    optionsElement.appendChild(li);

    li.addEventListener("click", () => {
      if (item === targetColor) {
        score++;
        gameStatus.innerHTML = "That's correct, play next";
        gameStatus.style.color = "green";
        gameStatus.classList.add("scale-up");
        /* setTimeout(() => gameStatus.classList.remove("scale-up"), 500); */
        getTargetColorAndOptions(); 
      } else {
        gameStatus.innerHTML = `That is incorrect, Try Again`;
        gameStatus.style.color = "red";
        gameStatus.classList.add("scale-up");
        li.style.border = "2px solid red";
        /* setTimeout(() => gameStatus.classList.remove("scale-up"), 500); */
      }
      scoreElement.textContent = score;
    });
  });
}

// Call it once when the game starts (outside of itself)
getTargetColorAndOptions();

resetBtn.addEventListener("click", () => {
  score = 0;
  scoreElement.textContent = score;
  gameStatus.innerHTML = "Tap the matching color below";
  gameStatus.style.color = "black"
  getTargetColorAndOptions();
});