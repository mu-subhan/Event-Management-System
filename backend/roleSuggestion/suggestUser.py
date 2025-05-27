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
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r'[^a-z0-9 ]+', ' ', text)
    return text.strip()

def weighted_text(user):
    # More weight to skills, then description, then interests
    return f"{' '.join(user['skills'])} {' '.join(user['skills'])} {user.get('description','')} {user.get('interests','')}"

def compute_fuzzy_score(text1, text2):
    return fuzz.token_set_ratio(text1, text2) / 100.0

def fuzzy_skill_match(role_skills, user_skills, threshold=70):
    role_skills = [s.lower() for s in role_skills]
    user_skills = [s.lower() for s in user_skills]
    match_count = 0
    for r_skill in role_skills:
        for u_skill in user_skills:
            score = fuzz.ratio(r_skill, u_skill)
            if score >= threshold:
                match_count += 1
                break
    if not role_skills:
        return 0.0
    return match_count / len(role_skills)

def main():
    input_data = sys.stdin.read()
    data = json.loads(input_data)

    role = data["role"]
    users = data["users"]

    role_skills = role.get("skills", [])
    role_description = role.get("description", "")
    role_text = " ".join(role_skills) + " " + role_description
    role_text_clean = clean_text(role_text)

    # Prepare user texts for embeddings and fuzzy
    user_texts = [clean_text(weighted_text(u)) for u in users]
    user_skills_list = [u.get("skills", []) for u in users]

    # Load sentence transformer model once
    model = SentenceTransformer('all-MiniLM-L6-v2')

    # Encode role and users
    role_embedding = model.encode(role_text_clean, convert_to_tensor=True)
    user_embeddings = model.encode(user_texts, convert_to_tensor=True)

    # Semantic cosine similarity
    cosine_scores = util.pytorch_cos_sim(role_embedding, user_embeddings)[0].cpu().tolist()

    # Fuzzy skill matching
    skill_fuzzy_scores = [fuzzy_skill_match(role_skills, u_skills) for u_skills in user_skills_list]

    # Fuzzy text matching
    fuzzy_text_scores = [compute_fuzzy_score(role_text_clean, ut) for ut in user_texts]

    # Combine scores with weights (tune as needed)
    combined_scores = []
    for i in range(len(users)):
        score = 0.5 * skill_fuzzy_scores[i] + 0.4 * cosine_scores[i] + 0.1 * fuzzy_text_scores[i]
        combined_scores.append(score)

    # Prepare and sort results
    result = [{"userId": users[i]["id"], "score": float(combined_scores[i])} for i in range(len(users))]
    result.sort(key=lambda x: x["score"], reverse=True)

    print(json.dumps(result))

if __name__ == "__main__":
    main()
