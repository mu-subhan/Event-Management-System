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



# import sys
# import json
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from rapidfuzz import fuzz  # Faster and more accurate than fuzzywuzzy

# def compute_fuzzy_score(text1, text2):
#     return fuzz.token_set_ratio(text1, text2) / 100.0  # Normalize score to [0, 1]

# # Read stdin
# input_data = sys.stdin.read()
# data = json.loads(input_data)

# role_text = data["role_text"]
# users = data["users"]

# # Create combined user texts
# user_texts = [f"{u['skills']} {u['interests']} {u['description']}" for u in users]

# # Step 1: TF-IDF similarity
# vectorizer = TfidfVectorizer()
# tfidf_matrix = vectorizer.fit_transform([role_text] + user_texts)

# role_vec = tfidf_matrix[0:1]
# user_vecs = tfidf_matrix[1:]

# cosine_similarities = cosine_similarity(role_vec, user_vecs)[0]

# # Step 2: Fuzzy matching similarity
# fuzzy_similarities = [compute_fuzzy_score(role_text, user_text) for user_text in user_texts]

# # Combine both scores (weighted average)
# combined_scores = [
#     0.7 * cosine_similarities[i] + 0.3 * fuzzy_similarities[i]
#     for i in range(len(users))
# ]

# # Prepare result
# result = [
#     {"userId": users[i]["id"], "score": float(combined_scores[i])}
#     for i in range(len(users))
# ]

# # Sort by combined score
# result.sort(key=lambda x: x["score"], reverse=True)

# # Output
# print(json.dumps(result))



# import sys
# import json
# import re
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from rapidfuzz import fuzz

# def clean_text(text):
#     text = text.lower()
#     text = re.sub(r'\W+', ' ', text)  # Remove punctuation
#     return text.strip()

# def weighted_text(user):
#     # Assign more weight to skills, then description, then interests
#     return f"{user['skills']} {user['skills']} {user['description']} {user['interests']}"

# def compute_fuzzy_score(text1, text2):
#     return fuzz.token_set_ratio(text1, text2) / 100.0

# input_data = sys.stdin.read()
# data = json.loads(input_data)

# role = data["role"]
# users = data["users"]

# # Clean and create weighted text for users and role
# role_text = clean_text(role["skills"] + " " + role.get("description", ""))
# user_texts = [clean_text(weighted_text(u)) for u in users]

# vectorizer = TfidfVectorizer(stop_words='english')
# tfidf_matrix = vectorizer.fit_transform([role_text] + user_texts)

# role_vec = tfidf_matrix[0:1]
# user_vecs = tfidf_matrix[1:]

# cosine_similarities = cosine_similarity(role_vec, user_vecs)[0]
# fuzzy_similarities = [compute_fuzzy_score(role_text, ut) for ut in user_texts]

# # Tune weights: give more weight to cosine similarity (semantic)
# combined_scores = [
#     0.8 * cosine_similarities[i] + 0.2 * fuzzy_similarities[i]
#     for i in range(len(users))
# ]

# result = [{"userId": users[i]["id"], "score": float(combined_scores[i])} for i in range(len(users))]
# result.sort(key=lambda x: x["score"], reverse=True)

# print(json.dumps(result))
import sys
import json
import re
from rapidfuzz import fuzz
from sentence_transformers import SentenceTransformer, util

def clean_text(text):
    return re.sub(r'[^a-z0-9 ]+', ' ', text.lower().strip()) if text else ""

def tokenize(text):
    return clean_text(text).split()

def fuzzy_list_match(list1, list2):
    if not list1 or not list2:
        return 0
    match = 0
    for item1 in list1:
        for item2 in list2:
            if fuzz.ratio(item1, item2) > 75:
                match += 1
                break
    return match / len(list1)

def semantic_similarity(text1, text2, model):
    emb1 = model.encode(clean_text(text1), convert_to_tensor=True)
    emb2 = model.encode(clean_text(text2), convert_to_tensor=True)
    return float(util.pytorch_cos_sim(emb1, emb2)[0][0])

def main():
    input_data = sys.stdin.read()
    data = json.loads(input_data)

    role = data["role"]
    users = data["users"]

    model = SentenceTransformer("all-MiniLM-L6-v2")

    role_skills = tokenize(role.get("skills", ""))
    role_description = clean_text(role.get("description", ""))

    results = []
    for user in users:
        user_skills = tokenize(user.get("skills", ""))
        user_description = clean_text(user.get("description", ""))
        user_interests = clean_text(user.get("interests", ""))

        # Fuzzy skill matching
        skill_score = fuzzy_list_match(role_skills, user_skills)

        # Semantic matching
        desc_score = semantic_similarity(role_description, user_description, model)
        interest_score = semantic_similarity(role_description, user_interests, model)

        # Final weighted score
        final_score = round(0.5 * skill_score + 0.3 * desc_score + 0.2 * interest_score, 4)

        results.append({
            "userId": user["id"],
            "score": final_score
        })

    results.sort(key=lambda x: x["score"], reverse=True)
    print(json.dumps(results))

if __name__ == "__main__":
    main()
