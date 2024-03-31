from docx import Document
from io import BytesIO
import json
from .models import Project, Document as Doc

def generate_document(json_data, project, date, file_type):
    project = Project.objects.get(project_id=project)

    # Retrieve the latest version number for the project
    try:
        latest_version = Doc.objects.filter(project=project, document_type=file_type).latest('created_at')
        version_number = latest_version.version_number + 1
    except Doc.DoesNotExist:
        version_number = 1  # If no previous version exists, start from 1

    # Update the latest version number in the database
    doc_title = f"{project.title}_{file_type}_v{version_number}"
    new_doc = Doc.objects.create(project=project, title=doc_title, version_number=version_number, document_type=file_type)

    document = Document()

    # Add document title
    document.add_heading(json_data["title"], level=0)
    records = (
        ('Project Name', project.title),
        ('Date', date),
        ('Author', project.created_by),
        ('Document Number', f"{project.title}_v{version_number}"),
        ('File Type', file_type) 
    )
    table = document.add_table(rows=len(records), cols=2)  # Set rows to the length of records
    table.style = 'Table Grid'
    for index, (key, value) in enumerate(records):  # Use enumerate to access index
        row_cells = table.rows[index].cells
        row_cells[0].text = key
        row_cells[1].text = value

    document.add_page_break()

    # Add sections
    for section in json_data["sections"]:
        document.add_heading(section["title"], level=2)
        document.add_paragraph(section["content"])

    # Save the document content to BytesIO object
    doc_stream = BytesIO()
    document.save(doc_stream)
    doc_stream.seek(0)

    # Read the BytesIO object to get the content as bytes
    doc_content = doc_stream.read()

    # Update the Doc instance with the generated content
    new_doc.content.save(f'{doc_title}.docx', ContentFile(doc_content))
    
    return document

