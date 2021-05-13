//get expense amount element
const amtText=document.querySelector("#expenseText");

//get expense description element
const expText=document.querySelector("#expenseDesp");

//get add button element
const btnAdd=document.querySelector("#addbtn");

//get table element
const expTable=document.querySelector("#expenseTable");

//get total span elemt
const totalSpan=document.querySelector("#total");

const demo=document.querySelector("#demo");

const editInput=document.querySelector("#editInput");

//initilize total to 0
let totalExp=0;

//make empty array of expense
let allExpense=[];

function getInput()
{
    
}

//function to add expense to array
function addAmount()
{
    
    //get amtText value
    const amtValue=amtText.value;
    // convert to number format
    const amount=parseInt(amtValue,10);
    //get expText value
    const expDesp=expText.value;

    //get time
    var now=new Date();
    const mom=getDataString(now);
   // const dateString=now.valueOf();
    //console.log(now.valueOf())
    
    //create a list to store current values
    const expenseItem={};
    expenseItem.amt=amount;
    expenseItem.desp=expDesp;
    expenseItem.moment=mom;
    expenseItem.dateString=now.valueOf();

    //push expenseitem to allExpense
    allExpense.push(expenseItem);
    
    displayExpense(allExpense);
    
    console.log(expenseItem.id);

    //reseting input feilds
    amtText.value="";
    expText.value="";

}

////function to display list
function displayExpense(arrayToDisplay)
{   
    
    //get each item of array to varaible
    const expenseTableHTML=arrayToDisplay.map((expense) =>  renderExpense(expense));

    let total=0;
    arrayToDisplay.map(exp => {total=total+exp.amt});
    setTotal(total);
   
    //join to older array
    const joinedExpenseTable=expenseTableHTML.join("");

    //display in html
    expTable.innerHTML=joinedExpenseTable;

    
}

//convert date to string
function getDataString(now)
{
    const options={year:'numeric',month:'long',day:'numeric'};
    return now.toLocaleString('en-US',options);  //11 May,2021
}

//set total 
function setTotal(newTotal)
{
    totalSpan.textContent=newTotal;
}
//delete item 
function deteleItem(clickedDateString)
{
   // console.log(str);
   const newArr=[];
   let totalExp=0;
   for(let i=0;i<allExpense.length;i++)
   {
       if(allExpense[i].dateString!==clickedDateString)
       {
            newArr.push(allExpense[i]);
       }
   }

   allExpense=newArr;
   displayExpense(allExpense);
}

function editItem(clickedDateString)
{
    var editAmt="99";
    let editDesp="Sushant";
    let editDate="";
    let editMOm="";
    console.log("edit called",clickedDateString);
   // editExpItem={};
    for(let i=0;i<allExpense.length;i++)
    {
        if(allExpense[i].dateString===clickedDateString)
        {
            editAmt=Number(allExpense[i].amt);
            editDesp=allExpense[i].desp;
            editMom=allExpense[i].mom;
            editDateString=allExpense[i].dateString ;
          //  expText.innerHTML=allExpense[i].desp;
        }
    }
    console.log(editAmt,editDesp,"changed?");
   /// expText.innerHTML=editAmt;



    const inputs= `
    <li id="{$id}" class="list-group-item d-flex justify-content-between">
    <div class="d-flex flex-column">
        <input id="editDesp" type="text" value="${editDesp}" placeholder="spent On">
        <small id="editDate" class="text-muted" value="${editMom}">${editMom}</small>
    </div>
    <div>
        <span class="px-5">
            <input id="editAmtInput" type="text" value="${editAmt}" placeholder="Amount spent">
        </span>
        <button type="button" class="btn btn-outline-primary btn-sm" onclick="{addEditAmount()}">
            <i class="fas fa-edit"></i>
        </button>
    </div>
</li>`
    editInput.innerHTML=inputs;
    deteleItem(clickedDateString);
   // editBlockDisplay("hidden");
   

}

function addEditAmount()
{   
    editedItem={};
    console.log("edit adding started")
    const toEditAmt=parseInt(editAmtInput.value,10);
    //console.log({toEditAmt});
    const toEditDesp=editDesp.value;
    //console.log({toEditDesp});
    //const toEditID=ed
    editedItem.amt=toEditAmt;
    editedItem.desp=toEditDesp;
    console.log(editedItem);
    allExpense.push(editedItem);
    displayExpense(allExpense);
    //editBlockDisplay("block");
}


function editBlockDisplay(status)
{
    if(status==="block")
    {
        editInput.style.visibility = "hidden";
        console.log("edit block hidden");
    }
    else if(status==="hidden")
    {
        editInput.style.visibility = "block";
        console.log("edit block shown");
    }

}

function inputValue()
{
    var editAmtValue=prompt("enter amt");
    //const editAmt=parseInt(editAmtValue,10);
    //console.log(Object.prototype.toString.call(editAmt),"input amt");
    return editAmtValue;
}

//function to render list
function renderExpense(itemToPrint)
{
    //totalAmt=totalAmt+itemToPrint.amt;
    return `
    <li id="${itemToPrint.id}" class="list-group-item d-flex justify-content-between">
    <div class="d-flex flex-column">
        ${itemToPrint.desp}
        <small class="text-muted">${itemToPrint.moment}</small>
    </div>
    <div>
        <span class="px-5">
            ${itemToPrint.amt}
        </span>
        <button type="button" class="btn btn-outline-primary btn-sm" onclick="editItem(${itemToPrint.dateString})">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="btn btn-outline-danger btn-sm" onclick="deteleItem(${itemToPrint.dateString})">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
</li>`;
}

btnAdd.addEventListener('click',addAmount,false);