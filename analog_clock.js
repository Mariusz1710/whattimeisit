let can = document.getElementById("can");
let ctx = can.getContext('2d');
let radius = can.height / 2;
ctx.translate(radius,radius);
let mar = new Audio("france.mp3");
let deu = new Audio("germany.mp3");
let god = new Audio("England.mp3");
let fla = new Audio("usa.mp3");
let country;
let agree = false;

radius *= 0.9;

function music()
{
    agree = true;
}

function france()
{
    document.getElementById("fra").style.display = "none";
    document.getElementById("ger").style.display = "none";
    document.getElementById("eng").style.display = "none";
    document.getElementById("ame").style.display = "none";
    document.body.style.backgroundImage = "url('paris.jpg')";
    can.style.backgroundColor = "rgba(255,0,0,0)";
    can.style.opacity = 0.3;
    mar.play();
    document.getElementById("what").style.color = "white";
}

function germany()
{
    document.getElementById("fra").style.display = "none";
    document.getElementById("ger").style.display = "none";
    document.getElementById("eng").style.display = "none";
    document.getElementById("ame").style.display = "none";
    document.body.style.backgroundImage = "url('berlin.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    can.style.backgroundColor = "rgba(255,0,0,0)";
    can.style.opacity = 0.7;
    deu.play();
    let german = true;
    document.getElementById("what").style.color = "white";
}

function england()
{
    document.getElementById("fra").style.display = "none";
    document.getElementById("ger").style.display = "none";
    document.getElementById("eng").style.display = "none";
    document.getElementById("ame").style.display = "none";
    document.body.style.backgroundImage = "url('london.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    can.style.backgroundColor = "rgba(255,0,0,0)";
    can.style.opacity = 0.7;
    god.play();
    country = "england";
    document.getElementById("what").style.color = "white";
}

function america()
{
    document.getElementById("fra").style.display = "none";
    document.getElementById("ger").style.display = "none";
    document.getElementById("eng").style.display = "none";
    document.getElementById("ame").style.display = "none";
    document.body.style.backgroundImage = "url('ny.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    can.style.backgroundColor = "rgba(255,0,0,0)";
    can.style.opacity = 0.7;
    fla.play();
    country = "america";
    document.getElementById("what").style.color = "white";
}



function drawClock()
{
    drawFace(ctx,radius);
    drawNumbers(ctx,radius);
    drawTime(ctx,radius);
}

function drawFace(ctx,radius)
{
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);    
    ctx.fillStyle = "black";
    ctx.fill();

    let grd1 = ctx.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
    grd1.addColorStop(0,"#333");
    grd1.addColorStop(0.5,"white");
    grd1.addColorStop(1,"#333");

    ctx.strokeStyle = grd1;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.arc(0,0,radius*0.1,0,2*Math.PI);
    ctx.fill();
}

function drawNumbers(ctx,radius)
{
    let anc;
    //ctx.fillText("Ola",0,0);
    ctx.fillStyle = "white";
	ctx.font = radius * 0.15 + "px arial";
	ctx.textBaseline= "middle";
	ctx.textAlign = "center";
    for(let num=1; num<13; num++)
    {
	anc = num * Math.PI / 6;
        ctx.rotate(anc);
	ctx.translate(0,-radius*0.85);
	ctx.rotate(-anc);
	ctx.fillText(num.toString(),0,0);
	ctx.rotate(anc);
	ctx.translate(0,radius*0.85);
	ctx.rotate(-anc);
    }
}

function drawTime(clx,radius)
{
    let now = new Date();
    let hours = now.getHours();
    
    switch(country)
    {
        case "england":
        {
            hours--;
            break;
        }
        case "america":
        {
            hours-=5;
            hours--;
            break;
        }
    }
    let minutes = now.getMinutes();

    if(minutes == 30 && agree)
    {
        mar.play();
    }

    let seconds = now.getSeconds();
    //console.log(hours);
    hours = hours % 12;
    hours = (hours + minutes / 60) * Math.PI / 6;

    drawHand(ctx,hours,radius*0.5,radius*0.07);

    minutes = minutes * Math.PI / 30;

    drawHand(ctx,minutes,radius*0.7,radius*0.05);
    
    seconds = seconds * Math.PI / 30;

    drawHand(ctx,seconds,radius*0.8,radius*0.03);
}

function drawHand(ctx,pos,length,width)
{
    ctx.beginPath();
    ctx.lineWidth = width;
    let grd2 = ctx.createLinearGradient(0,0,width,0);
    grd2.addColorStop(0,"#333");
    grd2.addColorStop(0.5,"white");
    grd2.addColorStop(1,"#333");
    ctx.strokeStyle = grd2;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0,-length);
    ctx.stroke();
    ctx.rotate(-pos);

}

setInterval(drawClock,1000);
