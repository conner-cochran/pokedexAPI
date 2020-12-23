console.log('%c Created by Conner Cochran with the help of Cris Matson', 'font-weight: bold; font-size: 10px; color: red');

function mute(){
    document.getElementById('audio').play();
    if(audio.muted == false){
        audio.muted = true;
    } else{
        audio.muted = false;
    }
}

const nextBtn= document.getElementById('nextBtn');
const previousBtn= document.getElementById('previousBtn');
var numberOne= Number(document.getElementById('poke1Id').innerHTML);
var numberTwo= Number(document.getElementById('poke2Id').innerHTML);
var numberThree= Number(document.getElementById('poke3Id').innerHTML);
const button1= document.getElementById('button1Id');
const button2= document.getElementById('button2Id');
const button3= document.getElementById('button3Id');
const button4= document.getElementById('button4Id');
const button5= document.getElementById('button5Id');
const button6= document.getElementById('button6Id');
const button7= document.getElementById('button7Id');
const button8= document.getElementById('button8Id');
const button9= document.getElementById('button9Id');
const button0= document.getElementById('button0Id');
const resetBtn= document.getElementById('searchBtnId');
const buttons= document.getElementById('buttonsId');

resetBtn.addEventListener('click', reset);
var numberArray= [];

button1.addEventListener('click', function(){
    numberArray.push(1);
    numberSelect();
});
button2.addEventListener('click', function(){
    numberArray.push(2);
    numberSelect();
});
button3.addEventListener('click', function(){
    numberArray.push(3);
    numberSelect();
});
button4.addEventListener('click', function(){
    numberArray.push(4);
    numberSelect();
});
button5.addEventListener('click', function(){
    numberArray.push(5);
    numberSelect();
});
button6.addEventListener('click', function(){
    numberArray.push(6);
    numberSelect();
});
button7.addEventListener('click', function(){
    numberArray.push(7);
    numberSelect();
});
button8.addEventListener('click', function(){
    numberArray.push(8);
    numberSelect();
});
button9.addEventListener('click', function(){
    numberArray.push(9);
    numberSelect();
});
button0.addEventListener('click', function(){
    numberArray.push(0);
    numberSelect();
});

document.getElementById('poke1Id').innerHTML= "_";
document.getElementById('poke2Id').innerHTML= "_";
document.getElementById('poke3Id').innerHTML= "_";
function numberSelect(newId){
    document.getElementById('buttonSound').play();

    numberArray.splice(3);
    if(typeof numberArray[0]== 'undefined'){
        var num1= numberOne;
    } else{ num1= numberArray[0]};

    if(num1 != numberOne){
        if(isNaN(num1)== true){
            document.getElementById('poke1Id').innerHTML= "_";
        } else{document.getElementById('poke1Id').innerHTML= `${num1}`;}
    } else{document.getElementById('poke1Id').innerHTML= "_";};

    if(typeof numberArray[1]== 'undefined'){
        var num2= numberTwo;
    } else{ num2= numberArray[1]};

    if(num2 != numberTwo){
        if(isNaN(num2)== true){
            document.getElementById('poke2Id').innerHTML= "_";
        } else{document.getElementById('poke2Id').innerHTML= `${num2}`;}
    } else{document.getElementById('poke2Id').innerHTML= "_";};

    if(typeof numberArray[2]== 'undefined'){
        var num3= numberThree;
    } else{ num3= numberArray[2]};

    if(num3 != numberThree){
        if(isNaN(num3)== true){
            document.getElementById('poke3Id').innerHTML= "_";
        } else{document.getElementById('poke3Id').innerHTML= `${num3}`;}
    } else{document.getElementById('poke3Id').innerHTML= "_";};
    
    newId= Math.round(`${num1}${num2}${num3}`);
    // console.log(numberArray);
    
    if(numberArray.length==3){
        buttons.addEventListener('click', fetchResults(newId));
    }
}
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function nextPage(){
    if(numberArray== null || numberArray.length == 0){
        // console.log(numberArray);
        newId= 001;
        numberArray= [newId];
        fetchResults(newId);
    } else{
        // console.log(numberArray);
        let newId= parseInt(`${numberArray[0]}${numberArray[1]}${numberArray[2]}`);
        // console.log(newId);
        if(newId< 898){
            newId++;
            let array1= newId.toString().charAt(0);
            let array2= newId.toString().charAt(1);
            let array3= newId.toString().charAt(2);
            numberArray= [array1, array2, array3];
            fetchResults(newId);
        } else{
            return;
        }
    }
}

function previousPage(){
    // console.log(numberArray);
    newId= numberArray.toString().replace(/,/g, "");
    // console.log(newId);
    if (newId> 1){
        newId--;
        let array1= newId.toString().charAt(0);
        let array2= newId.toString().charAt(1);
        let array3= newId.toString().charAt(2);
        numberArray= [array1, array2, array3];
    } else{
        return;
    }
    fetchResults(newId);
}

function reset(){
    numberArray= [];
    document.getElementById('buttonSound').play();
    document.getElementById('pictureId').src= "";
    document.getElementById('poke1Id').innerHTML= '_';
    document.getElementById('poke2Id').innerHTML= '_';
    document.getElementById('poke3Id').innerHTML= '_';
    document.getElementById('generaId').innerHTML= "-";
    document.getElementById('type1Id').innerHTML= "-";
    document.getElementById('type2Id').innerHTML= "-";
    document.getElementById('heightId').innerHTML= `                           press return to begin
                            a new search`;
    document.getElementById('weightId').innerHTML= "";
    document.getElementById('numberAndNameId').innerHTML= "Enter valid Pokédex number";
}

function fetchResults(newId){
    document.getElementById('searchBtnId').onclick= function() {
        document.getElementById('buttonSound').play();
    };
       
fetch(`https://pokeapi.co/api/v2/pokemon-species/${newId}`)
.then(function fetchResults(response){
    return response.json();
})
.then(function fetchResults(jsonData){
    // displayResults(jsonData);

    let generaList= document.getElementsByClassName('genera');
        generaList.innerText= jsonData['genera'][7].genus;
        var newGenera= generaList.innerText;
        document.getElementById("generaId").innerHTML = newGenera
});

fetch(`https://pokeapi.co/api/v2/pokemon/${newId}`)
.then(function fetchResults(response){
    return response.json();
})
.then(function fetchResults(jsonData){
    // displayResults(jsonData);

    let pictureList= document.getElementsByClassName('picture');
    pictureList.src= jsonData['sprites'].front_default;
    var newPicture= pictureList.src;
    
    if(newId== 897){
        document.getElementById('pictureId').src= './assets/spectrier.png';
    } else if(newId== 896){
        document.getElementById('pictureId').src= './assets/glastrier.png';
    } else{
        document.getElementById('pictureId').src= newPicture;
    }
    document.getElementById('poke1Id').innerHTML= '';
    document.getElementById('poke2Id').innerHTML= '';
    document.getElementById('poke3Id').innerHTML= '';

    let type1List= document.getElementsByClassName('type1');
    type1List.innerText= jsonData['types'][0].type.name;
    var newType1= type1List.innerText;
    document.getElementById('type1Id').innerHTML= newType1.charAt(0).toUpperCase()+ newType1.slice(1);

    let type2List= document.getElementsByClassName('type2');
    if (typeof jsonData['types'][1] != "undefined"){
        type2List.innerText= jsonData['types'][1].type.name;
        var newType2= type2List.innerText;
        document.getElementById('type2Id').innerHTML= newType2.charAt(0).toUpperCase()+ newType2.slice(1);
    }else{
        type2List.innerText= '-';
        var newType2= type2List.innerText;
        document.getElementById('type2Id').innerHTML= newType2
    }

    let heightList= document.getElementsByClassName('height');
    heightList.innerText= jsonData['height'];
    var newHeight= heightList.innerText;
    document.getElementById('heightId').innerHTML= newHeight/10+ 'm';

    let weightList= document.getElementsByClassName('weight');
    weightList.innerText= jsonData['weight'];
    var newWeight= weightList.innerText;
    document.getElementById('weightId').innerHTML= newWeight/10+ 'kg';

    let numberAndNameListId= document.getElementsByClassName('numberAndNameId');
    let numberAndNameListName= document.getElementsByClassName('numberAndName');
    numberAndNameListId.innerText= jsonData['id'];
    numberAndNameListName.innerText= jsonData['species'].name;
    var newNumberAndNameId= numberAndNameListId.innerText;
    var newNumberAndNameName= numberAndNameListName.innerText;
    console.log(newNumberAndNameId); //keep this logged//
    if(Math.round(newNumberAndNameId.toString().length)== 1){
        document.getElementById('numberAndNameId').innerHTML= `#00${newNumberAndNameId} ${newNumberAndNameName.charAt(0).toUpperCase()+ newNumberAndNameName.slice(1)}`;
    } else if(Math.round(newNumberAndNameId.toString().length)== 2){
        document.getElementById('numberAndNameId').innerHTML= `#0${newNumberAndNameId} ${newNumberAndNameName.charAt(0).toUpperCase()+ newNumberAndNameName.slice(1)}`;
    } else{
    document.getElementById('numberAndNameId').innerHTML= `#${newNumberAndNameId} ${newNumberAndNameName.charAt(0).toUpperCase()+ newNumberAndNameName.slice(1)}`;
    }
});
}