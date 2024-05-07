# def predict_methodology_from_keywords(keywords):
#     # Define keywords or terms associated with each methodology
#     agile_keywords = ['agile', 'scrum', 'sprint', 'kanban', 'iteration', 'user story']
#     waterfall_keywords = ['waterfall', 'sequential', 'phases', 'documentation', 'requirements']
#     other_keywords = ['hybrid', 'adaptive', 'incremental', 'spiral', 'prince2']

#     # Count occurrences of keywords associated with each methodology
#     agile_count = sum(keyword in keywords for keyword in agile_keywords)
#     waterfall_count = sum(keyword in keywords for keyword in waterfall_keywords)
#     other_count = sum(keyword in keywords for keyword in other_keywords)

#     # Determine the predicted methodology based on keyword occurrences
#     if agile_count > waterfall_count and agile_count > other_count:
#         return 'Agile'
#     elif waterfall_count > agile_count and waterfall_count > other_count:
#         return 'Waterfall'
#     else:
#         return 'Other'

def predict_methodology_from_keywords(keywords, methodology_keywords):
    """
    Predicts the methodology based on the occurrence of keywords.
    
    Args:
        keywords (list): List of keywords extracted from the project description.
        methodology_keywords (dict): Dictionary containing methodology keywords.

    Returns:
        str: Predicted methodology.
    """
    # Count occurrences of keywords associated with each methodology
    methodology_scores = {
        methodology: sum(keyword in keywords for keyword in method_keywords)
        for methodology, method_keywords in methodology_keywords.items()
    }

    # Determine the predicted methodology based on keyword occurrences
    predicted_methodology = max(methodology_scores, key=methodology_scores.get)
    return predicted_methodology

# Define keywords associated with each methodology
# methodology_keywords = {
#     'Agile': ['agile', 'scrum', 'sprint', 'kanban', 'iteration', 'user story'],
#     'Waterfall': ['waterfall', 'sequential', 'phases', 'documentation', 'requirements'],
#     'Other': ['hybrid', 'adaptive', 'incremental', 'spiral', 'prince2']
# }
