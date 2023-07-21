alarm = "";
objects = [];

function preload() 
{
    alarm = loadSound("Alarm.mp3");
}

function setup() 
{

    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Objects are detected";
    alarm.play();
    alarm.loop();
}

function modelLoaded() 
{
    console.log("CocoSSD is Initialised");
}

function draw() 
{
        image(video, 0, 0, 380, 380);
        objectDetector.detect(video,gotResults);
        for (i = 0; i < objects.length; i++) 
        {
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person") 
            {
                alarm.stop();
                document.getElementById("baby_detected").innerHTML = "The baby is seen";
            } 
            else
            {
              document.getElementById("baby_detected").innerHTML = "Oh No!The baby is not seen!";
            }
        }
        if(objects.length == 0)
        {
            alarm.play();
        }
}


function gotResults(error, results) 
{
    if (error) 
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
