song_1 = "";
song_2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreleftwrist = 0;
scoreRightWrist = 0;

status_1 = "";
status_2 = "";
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
 
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX  + "leftWristY = " + leftWristY);
 
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
 
    }
 }

function draw(){
    image(video,0,0,600,500);
    fill('red');
    stroke('red');

    status_1 = song_1.isPlaying();
    status_2 = song_2.isPlaying();

    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        song_2.stop();

        if(status_1 == false){
            song_1.play();
            document.getElementById("song_name").innerHTML = "Playing Lovely";
        }
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        song_1.stop();

        if(status_2 == false){
            song_2.play();
            document.getElementById("song_name").innerHTML = "Playing HP Theme song.mp3";
        }
    }
    
}

function preload(){
    song_1 = loadSound("Lovely.mp3");
    song_2 = loadSound("HP Theme song.mp3");
}
