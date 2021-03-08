import requests,time
from termcolor import colored

state = input(colored("State? ", "cyan")).upper()

headers = {
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "referer": "https://www.cvs.com/immunizations/covid-19-vaccine?icid=cvs-home-hero1-link2-coronavirus-vaccine",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36"
}

r = requests.get(f"https://www.cvs.com/immunizations/covid-19-vaccine.vaccine-status.{state}.json?vaccineinfo", headers=headers)

w = False

for c in r.json()["responsePayloadData"]["data"][state]:
    if c["status"] != "Fully Booked":
        print(colored("Vaccines available in " + c["city"], "green"))
        break
    else:
        print(colored("Vaccines unavailable in " + c["city"], "red"))
