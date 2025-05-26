# import sys
# import json
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# # Read stdin
# input_data = sys.stdin.read()
# data = json.loads(input_data)

# role_text = data["role_text"]
# users = data["users"]

# texts = [role_text] + [
#     f"{u['skills']} {u['interests']} {u['description']}" for u in users
# ]

# vectorizer = TfidfVectorizer()
# tfidf_matrix = vectorizer.fit_transform(texts)

# # First row is the role, rest are users
# role_vec = tfidf_matrix[0:1]
# user_vecs = tfidf_matrix[1:]

# similarities = cosine_similarity(role_vec, user_vecs)[0]

# # Build the result
# result = [
#     {"userId": users[i]["id"], "score": float(similarities[i])}
#     for i in range(len(users))
# ]

# # Sort by score descending
# result.sort(key=lambda x: x["score"], reverse=True)

# # Output to stdout
# print(json.dumps(result))



import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from rapidfuzz import fuzz  # Faster and more accurate than fuzzywuzzy

def compute_fuzzy_score(text1, text2):
    return fuzz.token_set_ratio(text1, text2) / 100.0  # Normalize score to [0, 1]

# Read stdin
input_data = sys.stdin.read()
data = json.loads(input_data)

role_text = data["role_text"]
users = data["users"]

# Create combined user texts
user_texts = [f"{u['skills']} {u['interests']} {u['description']}" for u in users]

# Step 1: TF-IDF similarity
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform([role_text] + user_texts)

role_vec = tfidf_matrix[0:1]
user_vecs = tfidf_matrix[1:]

cosine_similarities = cosine_similarity(role_vec, user_vecs)[0]

# Step 2: Fuzzy matching similarity
fuzzy_similarities = [compute_fuzzy_score(role_text, user_text) for user_text in user_texts]

# Combine both scores (weighted average)
combined_scores = [
    0.7 * cosine_similarities[i] + 0.3 * fuzzy_similarities[i]
    for i in range(len(users))
]

# Prepare result
result = [
    {"userId": users[i]["id"], "score": float(combined_scores[i])}
    for i in range(len(users))
]

# Sort by combined score
result.sort(key=lambda x: x["score"], reverse=True)

# Output
print(json.dumps(result))
