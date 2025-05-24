import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Read stdin
input_data = sys.stdin.read()
data = json.loads(input_data)

role_text = data["role_text"]
users = data["users"]

texts = [role_text] + [
    f"{u['skills']} {u['interests']} {u['description']}" for u in users
]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(texts)

# First row is the role, rest are users
role_vec = tfidf_matrix[0:1]
user_vecs = tfidf_matrix[1:]

similarities = cosine_similarity(role_vec, user_vecs)[0]

# Build the result
result = [
    {"userId": users[i]["id"], "score": float(similarities[i])}
    for i in range(len(users))
]

# Sort by score descending
result.sort(key=lambda x: x["score"], reverse=True)

# Output to stdout
print(json.dumps(result))
