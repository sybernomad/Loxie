import json

# Load and clean words.txt
valid_words = {5: set(), 6: set(), 7: set(), 8: set()}

print("Processing words.txt...")
with open("words.txt", "r", encoding="utf-8") as f:
    for line in f:
        word = line.strip().lower()
        # Keep only purely alphabetical words of length 5 to 8
        if 5 <= len(word) <= 8 and word.isalpha():
            valid_words[len(word)].add(word)

# Convert sets to lists for JSON serialization
export_data = {length: list(words) for length, words in valid_words.items()}

# Save as a JavaScript file that assigns to a global variable
js_output = f"window.LOXIE_DICTIONARY = {json.dumps(export_data)};"

with open("valid-words.js", "w", encoding="utf-8") as f:
    f.write(js_output)

print(
    f"Success! Processed {sum(len(v) for v in export_data.values())} words."
)
print("Saved to valid-words.js")