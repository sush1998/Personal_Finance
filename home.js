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

//initilize total to 0
let totalExp=0;

//make empty array of expense
let allExpense=[];

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
    totalSpan.innerHTML=newTotal;
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

//function to render list
function renderExpense(itemToPrint)
{
    //totalAmt=totalAmt+itemToPrint.amt;
    return `
    <li class="list-group-item d-flex justify-content-between">
    <div class="d-flex flex-column">
        ${itemToPrint.desp}
        <small class="text-muted">${itemToPrint.moment}</small>
    </div>
    <div>
        <span class="px-5">
            ${itemToPrint.amt}
        </span>
        <button type="button" class="btn btn-outline-danger btn-sm" onclick="deteleItem(${itemToPrint.dateString})">
            <i class="fas fa-trash-alt"></i>
        </button>
    </div>
</li>`;
}

btnAdd.addEventListener('click',addAmount,false);