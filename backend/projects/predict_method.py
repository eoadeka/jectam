import spacy
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Load the English language model for spaCy
nlp = spacy.load("en_core_web_sm")

@csrf_exempt
def predict_methodology(request):
    if request.method == 'POST':
        # Get the project description from the POST request
        project_description = request.POST.get('project_description', '')

        # Perform text analysis with spaCy
        doc = nlp(project_description)

        # Extract keywords or relevant terms from the project description
        keywords = [token.text.lower() for token in doc if not token.is_stop and not token.is_punct]

        # Perform prediction based on keywords
        # You can define your own logic here based on the extracted keywords
        predicted_methodology = predict_methodology_from_keywords(keywords)

        # Return the predicted methodology as JSON response
        return JsonResponse({'predicted_methodology': predicted_methodology})

    # Return error for non-POST requests
    return JsonResponse({'error': 'Only POST requests are allowed.'}, status=400)

def predict_methodology_from_keywords(keywords):
    # Define keywords or terms associated with each methodology
    agile_keywords = ['agile', 'scrum', 'sprint', 'kanban', 'iteration', 'user story']
    waterfall_keywords = ['waterfall', 'sequential', 'phases', 'documentation', 'requirements']
    other_keywords = ['hybrid', 'adaptive', 'incremental', 'spiral', 'prince2']

    # Count occurrences of keywords associated with each methodology
    agile_count = sum(keyword in keywords for keyword in agile_keywords)
    waterfall_count = sum(keyword in keywords for keyword in waterfall_keywords)
    other_count = sum(keyword in keywords for keyword in other_keywords)

    # Determine the predicted methodology based on keyword occurrences
    if agile_count > waterfall_count and agile_count > other_count:
        return 'Agile'
    elif waterfall_count > agile_count and waterfall_count > other_count:
        return 'Waterfall'
    else:
        return 'Other'
