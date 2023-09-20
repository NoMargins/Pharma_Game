import json
import requests

def fetch_data_from_url(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.text

def analyze_log(content):
    # Розділяємо записи у файлі
    entries = content.strip().split("\n\n")

    unique_users = set()
    win_count = 0
    false_count = 0

    for entry in entries:
        lines = entry.split("\n")
        data_line = [line for line in lines if line.startswith("Data:")][0]
        data_json = json.loads(data_line.split("Data: ")[1].strip())

        # Якщо ім'я та телефон вже існують, користувача вважаємо неунікальним
        user_tuple = (data_json.get("name", ""), data_json.get("phone", ""))
        unique_users.add(user_tuple)

        result = data_json.get("result", "")
        if result == "win":
            win_count += 1
        elif result == "false":
            false_count += 1

    return len(unique_users), win_count, false_count

url = "https://team-911.com.ua/rx/out.txt"
content = fetch_data_from_url(url)
unique_users_count, win_count, false_count = analyze_log(content)

print(f"Кількість унікальних користувачів: {unique_users_count}")
print(f"Кількість гравців з результатом 'win': {win_count}")
print(f"Кількість гравців з результатом 'false': {false_count}")
