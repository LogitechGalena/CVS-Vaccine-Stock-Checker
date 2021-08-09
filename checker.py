import requests
from termcolor import colored

state = input(colored("State? ", "cyan")).upper()

headers = {
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "referer": "https://www.cvs.com/immunizations/covid-19-vaccine?icid=cvs-home-hero1-link2-coronavirus-vaccine", # Needed so that CVS doesn't block the request
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36" # Should be spoofed if being used a lot but using a static UA should be fine for making a small amount of requests
}

r = requests.get(
    f"https://www.cvs.com/immunizations/covid-19-vaccine.vaccine-status.{state}.json?vaccineinfo",
    headers = headers
)

for city in r.json()["responsePayloadData"]["data"][state]:
    # Here we simply check if the status of the location is not fully booked, meaning that it's available
    # If you only want to see available locations you can remove the 'else' block
    if city["status"] != "Fully Booked":
        print(colored("Vaccines available in " + city["city"], "green"))
    else:
        print(colored("Vaccines unavailable in " + city["city"], "red"))
