import re

def extract_browser(user_agent):
    browsers = ["Chrome", "Safari", "Firefox", "Edge", "SamsungBrowser", "Opera", "Internet Explorer"]

    for browser in browsers:
        if browser in user_agent:
            if browser == "Chrome" and "Edg" in user_agent:
                return "Edge"
            elif browser == "Chrome" and "Safari" in user_agent:
                return "Chrome"
            return browser
    return "Other"

def is_mobile(user_agent):
    mobile_indicators = ["Mobile", "Android", "iPhone", "iPad"]
    return any(indicator in user_agent for indicator in mobile_indicators)

browser_counts = {"Mobile": {}, "Desktop": {}}
processed_ips = set()

with open("devices.access.log", "r") as file:
    logs = file.readlines()

    for log in logs:
        # Extract IP address from log
        ip_address = re.search(r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}", log).group()

        # Skip if IP was already processed
        if ip_address in processed_ips:
            continue
        processed_ips.add(ip_address)

        user_agent = log.split("\"")[-2]
        browser = extract_browser(user_agent)

        # Group by device type
        device_type = "Mobile" if is_mobile(user_agent) else "Desktop"
        
        browser_counts[device_type][browser] = browser_counts[device_type].get(browser, 0) + 1

print("Mobile browsers:"
for browser, count in browser_counts["Mobile"].items():
    print(f"{browser}: {count} users")

print("\nDesktop browsers:"
for browser, count in browser_counts["Desktop"].items():
    print(f"{browser}: {count} users")
