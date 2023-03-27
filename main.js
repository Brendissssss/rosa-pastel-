song="";

scorerightwrist=0;
scoreleftwrist=0;


leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

function preload()
{
    music1=loadImage('1music.png');
    music2=loadImage('2music.png');
    song= loadSound("rosa_pastel.mp3");
}

function setup()
{
    canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('poseNet esta inicializando');
}
function draw()
{
    image(video,0,0,600,500);
    if(scorerightwrist>0.2)
    {
        image(music1, rightWristX,rightWristY, 100, 100);

        if(rightWristY>0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY >100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY >200 && rightWristY <=300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY >300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY >400)
        {
            document.getElementById("speed").innerHTMLML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if(scoreleftwrist > 0.2)
    {
        image(music2, leftWristX, leftWristY,100,100);
        InNumberleftWristY = Number(leftWristY);
        new_leftWristY = floor (InNumberleftWristY *2);
        leftWristY_divide_1000 = new_leftWristY/1000,
        document.getElementById("volumen").innerHTML = "Volume = " + leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000);
    }
}

function play()
{
song.play();
song.setVolume(0.5);
song.rate(1);
}
function gotPoses(results)
{
    if (results.length >0)
    {
        scorerightwrist= results[0].pose.keypoints[10].score;
        scoreleftwrist= results[0].pose.keypoints[9].score;
        console.log("scorerightwrist=" + scorerightwrist + "scoreleftwrist" + scoreleftwrist);



     leftWristX=results[0].pose.leftWrist.x;
     leftWristY=results[0].pose.leftWrist.y;
     console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY );


     rightWristX=results[0].pose.rightWrist.x;
     rightWristY=results[0].pose.rightWrist.y;
     console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY );
}
    }
