from docx import Document

def generate_document(json_data, project_name, date, author, document_number):
    document = Document();

    # Add document title
    document.add_heading(json_data["title"], level=0)
    records = (
        ('Project Name', project_name),
        ('Date', date),
        ('Author', author),
        ('Document Number', document_number)
    )
    table = document.add_table(rows=1, cols=len(records))
    table.style = 'Table Grid'
    row_cells = table.add_row().cells
      
    # Add table data
    row_cells = table.rows[1].cells
    row_cells[0].text = 'Project Name'
    row_cells[1].text = project_name

    row_cells = table.add_row().cells
    row_cells[0].text = 'Date'
    row_cells[1].text = date

    row_cells = table.add_row().cells
    row_cells[0].text = 'Author'
    row_cells[1].text = author

    row_cells = table.add_row().cells
    row_cells[0].text = 'Document Number'
    row_cells[1].text = document_number

    document.add_page_break()

    # Add sections
    for section in json_data["sections"]:
        document.add_heading(section["title"], level=2)
        document.add_paragraph(section["content"])
    
    return document

