const got = require('got');
const chalk = require('chalk');
var inquirer = require('inquirer');

process.title = `CVS Vaccine Checker!`

const str = 
`
▄████ ▓█████▄▄▄█████▓    ██▒   █▓ ▄▄▄      ▒██   ██▒▒██   ██▒▓█████ ▓█████▄  ▐██▌ 
██▒ ▀█▒▓█   ▀▓  ██▒ ▓▒   ▓██░   █▒▒████▄    ▒▒ █ █ ▒░▒▒ █ █ ▒░▓█   ▀ ▒██▀ ██▌ ▐██▌ 
▒██░▄▄▄░▒███  ▒ ▓██░ ▒░    ▓██  █▒░▒██  ▀█▄  ░░  █   ░░░  █   ░▒███   ░██   █▌ ▐██▌ 
░▓█  ██▓▒▓█  ▄░ ▓██▓ ░      ▒██ █░░░██▄▄▄▄██  ░ █ █ ▒  ░ █ █ ▒ ▒▓█  ▄ ░▓█▄   ▌ ▓██▒ 
░▒▓███▀▒░▒████▒ ▒██▒ ░       ▒▀█░   ▓█   ▓██▒▒██▒ ▒██▒▒██▒ ▒██▒░▒████▒░▒████▓  ▒▄▄  
░▒   ▒ ░░ ▒░ ░ ▒ ░░         ░ ▐░   ▒▒   ▓▒█░▒▒ ░ ░▓ ░▒▒ ░ ░▓ ░░░ ▒░ ░ ▒▒▓  ▒  ░▀▀▒ 
░   ░  ░ ░  ░   ░          ░ ░░    ▒   ▒▒ ░░░   ░▒ ░░░   ░▒ ░ ░ ░  ░ ░ ▒  ▒  ░  ░ 
░ ░   ░    ░    ░              ░░    ░   ▒    ░    ░   ░    ░     ░    ░ ░  ░     ░ 
    ░    ░  ░                 ░        ░  ░ ░    ░   ░    ░     ░  ░   ░     ░    
                             ░                                       ░            
`
console.log(chalk.magenta(str))


let start = async function() {
    inquirer
    .prompt([
      {
        name: "State",
        type: "input",
        message: "Enter your state abbreviation (eg. IL) - ",
      },
    ])
    .then((answer) => {
        let state = answer.State
        findAvailVaccine(state)
    });
};


let findAvailVaccine = async function(state) {
        console.log("Finding Available Vaccines...")

        let response = await got(`https://www.cvs.com/immunizations/covid-19-vaccine.vaccine-status.${state}.json?vaccineinfo`, {
            headers : {
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9",
                "referer": "https://www.cvs.com/immunizations/covid-19-vaccine?icid=cvs-home-hero1-link2-coronavirus-vaccine",
                "sec-fetch-site": "same-origin",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
            },
            responseType: 'json'
            })
           let cities = response.body.responsePayloadData.data[state]
           for (i in cities) {
             let city = cities[i]
             if (city.status === 'Available') {
               console.log(chalk.green(`Available vaccine appointment in ${city.city}, ${state}!`))
            } else {
                console.log(chalk.red(`Vaccines in ${city.city}, ${state} are not available at this time!`))
            }
        }
    };

start()
