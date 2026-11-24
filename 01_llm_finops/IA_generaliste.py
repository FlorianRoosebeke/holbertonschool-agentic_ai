import json
from pathlib import Path
import requests

API_URL = "https://exemple.com"
OUTPUT_FILE = Path("donnees_propres.json")
HEADERS = {
    "Accept": "application/json",
    # "Authorization": "Bearer VOTRE_CLE_API",
}


def fetch_and_save(url: str, output_path: Path, headers: dict | None = None) -> None:
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()

    data = response.json()
    output_path.write_text(
        json.dumps(data, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )


if __name__ == "__main__":
    try:
        fetch_and_save(API_URL, OUTPUT_FILE, HEADERS)
        print(f"Données enregistrées dans {OUTPUT_FILE}")
    except requests.RequestException as exc:
        print(f"Erreur réseau ou HTTP : {exc}")
    except ValueError as exc:
        print(f"Réponse JSON invalide : {exc}")
