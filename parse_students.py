import pdfplumber
import json
import random
import string
import csv
import re

def generate_code(length=5):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

# Read PDF
with pdfplumber.open(r"c:\Users\PC01\Documents\StudentDay\Student's Names - Sheet1.pdf") as pdf:
    text = pdf.pages[0].extract_text(layout=True)

lines = text.split('\n')
grades = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"]

students = []
used_codes = set()

# Process lines (skip empty and header)
# We can find column boundaries based on the header line
# Let's find the header line:
header_line = None
for line in lines:
    if "9th Graders" in line and "10th Graders" in line:
        header_line = line
        break

if header_line:
    col1 = header_line.find("9th Graders")
    col2 = header_line.find("10th Graders")
    col3 = header_line.find("11th Graders")
    col4 = header_line.find("12th Graders")
    
    start_idx = lines.index(header_line) + 1
    
    for line in lines[start_idx:]:
        if not line.strip(): continue
        
        # Extract substrings based on column positions
        # To be safe, we split the line by 2+ spaces, but sometimes names might be long.
        # Let's use the columns.
        c1 = line[:col2].strip() if len(line) > col1 else ""
        c2 = line[col2:col3].strip() if len(line) > col2 else ""
        c3 = line[col3:col4].strip() if len(line) > col3 else ""
        c4 = line[col4:].strip() if len(line) > col4 else ""
        
        # Some names might have the weird  character for encoding issues (like É, Á). Let's fix common ones based on Spanish names.
        # It's better to just keep them as they are or do a simple replace
        def clean_name(name):
            return name.replace('', 'Á').replace('ÁA', 'ÑA') # Simple heuristic, but let's just leave it or replace  with a wildcard or nothing? 
            # Actually, looking at the output: "CSAR", "TREVIO", "LEN", "BAUELOS", "JOS", "BARRN". It's mostly replacing accents.
            # I will let it be what it is to match the sheet exactly, or try to decode properly if possible.
        
        row = [c1, c2, c3, c4]
        for i, name in enumerate(row):
            if name:
                # generate unique code
                code = generate_code()
                while code in used_codes:
                    code = generate_code()
                used_codes.add(code)
                
                students.append({
                    "accessCode": code,
                    "name": name,
                    "grade": grades[i],
                    "group": "Section A" # We don't have group info in the PDF, so default to Section A or leave empty
                })

# Save JSON
with open(r"c:\Users\PC01\Documents\StudentDay\students.json", "w", encoding="utf-8") as f:
    json.dump(students, f, indent=2, ensure_ascii=False)

# Save CSV
with open(r"c:\Users\PC01\Documents\StudentDay\students.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["accessCode", "name", "grade", "group"])
    writer.writeheader()
    writer.writerows(students)

print(f"Generated {len(students)} student codes.")
