// Wait for the page to be ready
window.addEventListener("load", function(e) {

  console.log("Page loaded!");

  // Store the color we will be tracking (selectable by clicking on the webcam feed)
  var top_color = {r: 255, g: 0, b: 0};
  var br_color = {r: 0, g: 255, b: 0};
  var bl_color = {r: 0, g: 0, b: 255};
  var top_center = {x: 0, y: 0};
  var br_center = {x: 0, y: 0};
  var bl_center = {x: 0, y: 0};
  var set_color = top_color;
  var set_swatch = top_color;


  // TODO remove the slider and make it have better defaults
  // Grab reference to the tags we will be using
  var top_slider = document.getElementById("top_tolerance");
  var br_slider = document.getElementById("br_tolerance");
  var bl_slider = document.getElementById("bl_tolerance");

  var canvas  = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var webcam = document.getElementById('webcam');

  var top_swatch = document.getElementById("top_color");
  var br_swatch = document.getElementById("br_color");
  var bl_swatch = document.getElementById("bl_color");


  // Register our custom color tracking function
  tracking.ColorTracker.registerColor('top_color', function(r, g, b) {
    return getColorDistance(top_color, {r: r, g: g, b: b}) < top_slider.value
  });
  tracking.ColorTracker.registerColor('br_color', function(r, g, b) {
    return getColorDistance(br_color, {r: r, g: g, b: b}) < br_slider.value
  });
  tracking.ColorTracker.registerColor('bl_color', function(r, g, b) {
    return getColorDistance(bl_color, {r: r, g: g, b: b}) < bl_slider.value
  });

  // Create the color tracking object
  var tracker = new tracking.ColorTracker(["top_color", "br_color", "bl_color"]);


  // Add callback for the "track" event
  tracker.on('track', function(e) {

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (e.data.length !== 0) {

      e.data.forEach(function(rect) {
        console.log(rect);
	if(rect.color == "top_color") {
		top_center = {x: rect.x + rect.width/2, y: rect.y + rect.height/2};
  		context.strokeStyle = "rgb(" + top_color.r + ", " + top_color.g + ", " + top_color.b + ")";
  		context.fillStyle = "rgb(" + top_color.r + ", " + top_color.g + ", " + top_color.b + ")";
	} else if (rect.color == "br_color") {
		br_center = {x: rect.x + rect.width/2, y: rect.y + rect.height/2};
  		context.strokeStyle = "rgb(" + br_color.r + ", " + br_color.g + ", " + br_color.b + ")";
  		context.fillStyle = "rgb(" + br_color.r + ", " + br_color.g + ", " + br_color.b + ")";
	} else {
		bl_center = {x: rect.x + rect.width/2, y: rect.y + rect.height/2};
  		context.strokeStyle = "rgb(" + bl_color.r + ", " + bl_color.g + ", " + bl_color.b + ")";
  		context.fillStyle = "rgb(" + bl_color.r + ", " + bl_color.g + ", " + bl_color.b + ")";
	}
  	context.fillRect(rect.x + rect.width/4, rect.y + rect.height/4, rect.width/2, rect.height / 2);
	//console.log(rect.x + " " + rect.y);
        drawRect(rect, context);
      });

    }

  });

  // Start tracking
  tracking.track(webcam, tracker, { camera: true } );

  top_swatch.addEventListener("click", function (e) {
    console.log("clicked1");
    set_color = top_color;
    set_swatch = top_swatch;
  }); 
  br_swatch.addEventListener("click", function (e) {
    console.log("clicked2");
    set_color = br_color;
    set_swatch = br_swatch;
  }); 
  bl_swatch.addEventListener("click", function (e) {
    console.log("clicked3");
    set_color = bl_color;
    set_swatch = bl_swatch;
  }); 

  // Add listener for the click event on the video
  webcam.addEventListener("click", function (e) {

    // Grab color from the video feed where the click occured
    var c = getColorAt(webcam, e.offsetX, e.offsetY);

    // Update target color
    set_color.r = c.r;
    set_color.g = c.g;
    set_color.b = c.b;

    // Update the div's background so we can see which color was selected
    set_swatch.style.backgroundColor = "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";
  });
});



// Calculates the Euclidian distance between the target color and the actual color
function getColorDistance(target, actual) {
  return Math.sqrt(
    (target.r - actual.r) * (target.r - actual.r) +
    (target.g - actual.g) * (target.g - actual.g) +
    (target.b - actual.b) * (target.b - actual.b)
  );
}

// Returns the color at the specified x/y location in the webcam video feed
function getColorAt(webcam, x, y) {

  // To be able to access pixel data from the webcam feed, we must first draw the current frame in
  // a temporary canvas.
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = webcam.width;
  canvas.height = webcam.height;
  context.drawImage(webcam, 0, 0, webcam.width, webcam.height);

  // Then we grab the pixel information from the temp canvas and return it as an object
  var pixel = context.getImageData(x, y, 1, 1).data;
  return {r: pixel[0], g: pixel[1], b: pixel[2]};

}

// Draw a colored rectangle on the canvas
function drawRect(rect, context) {
  context.strokeRect(rect.x, rect.y, rect.width, rect.height);
}
