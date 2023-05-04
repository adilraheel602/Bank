import inquirer from "inquirer";
import figlet from "figlet";
import chalk from "chalk";
class Customer {
    fName;
    lName;
    gender;
    age;
    contact;
    accountBalance = 25000;
    constructor(fName, lName, gender, age, contact) {
        this.fName = fName;
        this.lName = lName;
        this.gender = gender;
        this.age = age;
        this.contact = contact;
    }
}
class BankAccount {
    debit = (debitAmount, customer) => {
        if (debitAmount <= customer.accountBalance) {
            customer.accountBalance -= debitAmount;
            console.log(`Your ${debitAmount} is debited from your account`);
        }
        else {
            console.log("Your account don't have enough balance.");
        }
    };
    credit = (creditAmount, customer) => {
        if (creditAmount >= 100) {
            creditAmount -= 1;
            customer.accountBalance += creditAmount;
            console.log(`Your ${creditAmount} is credited to your account`);
        }
        else {
            customer.accountBalance += creditAmount;
            console.log(`Your ${creditAmount} is credited from your account`);
        }
    };
    checkBalance = (customer) => {
        console.log(customer.accountBalance);
    };
}
const customer1 = new Customer("Adil", "Raheel", "Male", 26, "2141215");
console.log(customer1);
let BankAccount1 = new BankAccount();
console.log(BankAccount1);
let select = async () => {
    const input = await inquirer.prompt([
        {
            type: "number",
            name: "selection",
            message: "Enter 1 for next task otherwise enter 2: ",
        }
    ]);
    if (input.selection == 1) {
        await welcome();
    }
    else {
        console.log(chalk.bgMagentaBright("GoodBye! See you next time."));
    }
};
let welcome = async () => {
    console.log(figlet.textSync('Welcome to MyBank!'));
    console.log("Please select the operation you want to perform:");
    const input = await inquirer.prompt([{
            type: "list",
            name: "Operation",
            choices: ["Debit", "Credit", "Balance Check"],
        }
    ]);
    console.log(`You wants to perform ${input.Operation}`);
    if (input.Operation == "Debit") {
        const input = await inquirer.prompt([{
                type: "number",
                name: "debitAmount",
                message: "Enter amount you want to debit! ",
            }
        ]);
        console.log("entered");
        BankAccount1.debit(input.debitAmount, customer1);
    }
    else if (input.Operation == "Credit") {
        const input = await inquirer.prompt([{
                type: "number",
                name: "creditAmount",
                message: "Enter amount you want to credit! ",
            }
        ]);
        BankAccount1.credit(input.creditAmount, customer1);
    }
    else if (input.Operation == "Balance Check") {
        BankAccount1.checkBalance(customer1);
    }
    else {
        console.log("You didn't choose anything.");
    }
    await select();
};
await welcome();
// const welcome = async() =>{
//     const input = await inquirer.prompt([
//         {
//             type: "number",
//             name: "num1",
//             message: "Enter a number: ",
//         }
// ]);
// console.log(input.num1);
// }
// welcome()
