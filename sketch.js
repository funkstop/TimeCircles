let canvasSize;
let centerX, centerY;
let secondCircleSize, minuteCircleSize, hourCircleSize, sunriseCircleSize, sunsetCircleSize;
let hourDirection = 1;

function setup() {
  canvasSize = min(windowWidth, windowHeight) * 0.8;
  createCanvas(canvasSize, canvasSize);
  
  centerX = width / 2;
  centerY = height / 2;
  
  secondCircleSize = 0;
  minuteCircleSize = 0;
  hourCircleSize = 0;
  sunriseCircleSize = 0;
  sunsetCircleSize = 0;

  strokeWeight(5);
  textSize(24);
  textAlign(CENTER, CENTER);
  
  fetchSunriseSunset();

}

async function fetchSunriseSunset() {
  const response = await fetch('https://api.sunrise-sunset.org/json?lat=37.7749&lng=-122.4194&date=today');
  const data = await response.json();

  const sunriseTime = data.results.sunrise;
  const sunsetTime = data.results.sunset;

  let now = new Date();
  let sunrise = new Date(now.toDateString() + ' ' + sunriseTime);
  let sunset = new Date(now.toDateString() + ' ' + sunsetTime);

  let sunriseHour = (sunrise.getHours() > 12) ? sunrise.getHours() - 12 : sunrise.getHours();
  let sunsetHour = (sunset.getHours() > 12) ? sunset.getHours() - 12 : sunset.getHours();

  sunriseCircleSize = map(sunriseHour + sunrise.getMinutes() / 60, 0, 12, 0, canvasSize);
  sunsetCircleSize = map(sunsetHour + sunset.getMinutes() / 60, 0, 12, 0, canvasSize);
}

function draw() {
  background(200);
  
  // Display current time at the center
  let currentTime = nf(hour(), 2) + ':' + nf(minute(), 2) + ':' + nf(second(), 2);
  fill(0);
  //text(currentTime, centerX, centerY);

  
  // Draw circles
  stroke(' pink');
  strokeWeight(10);
  drawCircle(centerX, centerY, sunsetCircleSize, color(120, 15, 255, 150));
  drawCircle(centerX, centerY, sunriseCircleSize, color(155, 75, 10, 150));
  strokeWeight(5);
  stroke('green');
  drawCircle(centerX, centerY, secondCircleSize, color(170, 210, 23, 50));
  stroke('yellow');
  drawCircle(centerX, centerY, minuteCircleSize, color(55, 0, 220, 100));
  stroke('orange');
  drawCircle(centerX, centerY, hourCircleSize, color(170, 10, 10, 50));

  // Update circle sizes
  let now = new Date();
  let seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  secondCircleSize = map(seconds, 0, 60, 0, canvasSize);
  minuteCircleSize = map(now.getMinutes(), 0, 60, 0, canvasSize);
  
  if (hourDirection === 1) {
    hourCircleSize = map(18,0, 12, 0, canvasSize);
    if (18 > 12) {
      hourDirection = -1;
    }
  } else {
    hourCircleSize = map(18 - 24, 0, 12, 0, canvasSize);
    if (18 <= 0) {
      hourDirection = 1;
    }
  }
  
  sunriseCircleSize = map(6, 0, 24, 0, canvasSize);
  sunsetCircleSize = map(18, 0, 24, 0, canvasSize);
}

// Draw circles function
function drawCircle(x, y, size, fillColor) {
  fill(fillColor);
  ellipse(x, y, size);
}