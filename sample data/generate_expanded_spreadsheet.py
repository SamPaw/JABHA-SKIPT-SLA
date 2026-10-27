import csv
import random
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# Set fixed seed for repeatable, clean realistic data
random.seed(42)

# 50 Student Profiles
student_names = [
    ("Aarav Sharma", "Computer Science & Engineering"),
    ("Diya Patel", "Information Technology"),
    ("Rohan Verma", "Computer Science & Engineering"),
    ("Ananya Iyer", "Artificial Intelligence & DS"),
    ("Ishaan Nair", "Computer Science & Engineering"),
    ("Sneha Kulkarni", "Information Technology"),
    ("Aditya Mehta", "Computer Science & Engineering"),
    ("Pooja Reddy", "Artificial Intelligence & DS"),
    ("Vikram Singh", "Computer Science & Engineering"),
    ("Riya Gupta", "Information Technology"),
    ("Tanvi Deshmukh", "Computer Engineering"),
    ("Aryan Joshi", "Computer Science & Engineering"),
    ("Meera Nambiar", "Artificial Intelligence & DS"),
    ("Siddharth Rao", "Information Technology"),
    ("Kavya Menon", "Computer Science & Engineering"),
    ("Kabir Malhotra", "Computer Engineering"),
    ("Neha Chawla", "Information Technology"),
    ("Rahul Bansal", "Computer Science & Engineering"),
    ("Anika Sen", "Artificial Intelligence & DS"),
    ("Yashvardhan Singhania", "Computer Science & Engineering"),
    ("Shreya Bhattacharya", "Information Technology"),
    ("Varun Kapoor", "Computer Science & Engineering"),
    ("Prisha Hegde", "Artificial Intelligence & DS"),
    ("Harshavardhan Rathi", "Computer Engineering"),
    ("Simran Kaur", "Information Technology"),
    ("Devansh Saxena", "Computer Science & Engineering"),
    ("Avani Pillai", "Artificial Intelligence & DS"),
    ("Kunal Gokhale", "Information Technology"),
    ("Tara Sundaram", "Computer Science & Engineering"),
    ("Manan Shah", "Computer Engineering"),
    ("Ritika Agarwal", "Information Technology"),
    ("Ayush Trivedi", "Computer Science & Engineering"),
    ("Bhavna Choudhary", "Artificial Intelligence & DS"),
    ("Dhruv Mathur", "Computer Science & Engineering"),
    ("Esha Venkatesh", "Information Technology"),
    ("Farhan Akhtar", "Computer Engineering"),
    ("Gargi Samant", "Artificial Intelligence & DS"),
    ("Himanshu Pandey", "Computer Science & Engineering"),
    ("Ishita Bose", "Information Technology"),
    ("Jayant Nanda", "Computer Science & Engineering"),
    ("Kriti Sanon", "Artificial Intelligence & DS"),
    ("Lakshya Singhal", "Information Technology"),
    ("Maya Krishnan", "Computer Science & Engineering"),
    ("Nakul Shenoy", "Computer Engineering"),
    ("Ojasvi Bhatia", "Artificial Intelligence & DS"),
    ("Parth Soman", "Information Technology"),
    ("Radhika Apte", "Computer Science & Engineering"),
    ("Sameer Kadam", "Computer Engineering"),
    ("Trisha Mukherjee", "Information Technology"),
    ("Utkarsh Dixit", "Computer Science & Engineering"),
]

# Semester definitions: 6 Semesters, 3 subjects each (18 subjects total)
semesters_config = [
    {
        "sem": 1,
        "name": "Semester 1",
        "subjects": [("OS", "Operating Systems"), ("JS", "JavaScript Programming"), ("DSA", "Data Structures & Algorithms")]
    },
    {
        "sem": 2,
        "name": "Semester 2",
        "subjects": [("DBMS", "Database Management Systems"), ("CN", "Computer Networks"), ("OOP", "Object-Oriented Programming")]
    },
    {
        "sem": 3,
        "name": "Semester 3",
        "subjects": [("DAA", "Design & Analysis of Algorithms"), ("SE", "Software Engineering"), ("TOC", "Theory of Computation")]
    },
    {
        "sem": 4,
        "name": "Semester 4",
        "subjects": [("COA", "Computer Organization & Arch."), ("WT", "Web Technologies"), ("MP", "Microprocessors & Interfacing")]
    },
    {
        "sem": 5,
        "name": "Semester 5",
        "subjects": [("AI", "Artificial Intelligence & ML"), ("CC", "Cloud Computing & DevOps"), ("IS", "Information & Cyber Security")]
    },
    {
        "sem": 6,
        "name": "Semester 6",
        "subjects": [("CD", "Compiler Design"), ("BDA", "Big Data Analytics"), ("DS", "Distributed Systems")]
    }
]

# 18 subject codes in sequence
all_subject_keys = []
subject_display_names = []
for sc in semesters_config:
    for code, full_title in sc["subjects"]:
        key = f"s{sc['sem']}_{code.lower()}"
        all_subject_keys.append((sc["sem"], code, key, full_title))
        subject_display_names.append(f"Sem {sc['sem']} - {code}")

# Student Performance Profile Assignment
# Total 50 students:
# - ~33 Clear PASS (0 backlogs, marks 32-98)
# - ~11 ATKT Eligible (1 to 3 backlogs, marks < 30 in 1-3 subjects, rest >= 30)
# - ~6 FAIL / Year Down (> 3 backlogs, e.g. 4, 5, 6, 7 backlogs)

students_dataset = []

# Specific pre-defined student outcomes for consistent reporting
# Indices for ATKT: 2 (Rohan - 1 bl), 4 (Ishaan - 2 bl), 7 (Pooja - 2 bl), 12 (Meera - 1 bl),
#                   15 (Kabir - 3 bl), 21 (Varun - 1 bl), 27 (Kunal - 2 bl), 32 (Bhavna - 1 bl),
#                   37 (Himanshu - 3 bl), 43 (Nakul - 2 bl), 48 (Trisha - 1 bl) -> 11 ATKT students
atkt_target_fails = {
    2: [0],                      # Sem 1 OS
    4: [0, 1],                   # Sem 1 OS, JS
    7: [2, 5],                   # Sem 1 DSA, Sem 2 OOP
    12: [7],                     # Sem 3 TOC
    15: [2, 8, 11],              # Sem 1 DSA, Sem 3 TOC, Sem 4 MP
    21: [6],                     # Sem 3 DAA
    27: [9, 10],                 # Sem 4 COA, WT
    32: [12],                    # Sem 5 AI
    37: [1, 14, 15],             # Sem 1 JS, Sem 5 IS, Sem 6 CD
    43: [3, 16],                 # Sem 2 DBMS, Sem 6 BDA
    48: [17],                    # Sem 6 DS
}

# Indices for FAIL (>3 backlogs):
# 5 (Sneha - 4 bl), 8 (Vikram - 5 bl), 19 (Yashvardhan - 4 bl),
# 29 (Manan - 6 bl), 41 (Lakshya - 5 bl), 49 (Utkarsh - 7 bl) -> 6 FAIL students
fail_target_fails = {
    5: [0, 1, 2, 3],                         # 4 fails
    8: [0, 1, 2, 3, 4],                      # 5 fails
    19: [6, 7, 8, 9],                        # 4 fails
    29: [2, 5, 8, 11, 14, 17],               # 6 fails
    41: [1, 4, 7, 10, 13],                   # 5 fails
    49: [0, 2, 4, 6, 8, 10, 12]              # 7 fails
}

for idx, (name, branch) in enumerate(student_names):
    roll_no = f"2025CS{idx+1:03d}"
    adm_year = 2025
    grad_year = 2029
    
    marks_list = []
    
    if idx in fail_target_fails:
        fail_subjs = set(fail_target_fails[idx])
        for sub_i in range(18):
            if sub_i in fail_subjs:
                marks_list.append(random.randint(14, 28))
            else:
                marks_list.append(random.randint(30, 52))
    elif idx in atkt_target_fails:
        fail_subjs = set(atkt_target_fails[idx])
        for sub_i in range(18):
            if sub_i in fail_subjs:
                marks_list.append(random.randint(16, 28))
            else:
                marks_list.append(random.randint(35, 78))
    else:
        # Clear PASS students
        # Some toppers (high tier), some middle tier
        if idx in [0, 1, 3, 6, 9, 11, 14, 18, 22, 26, 31, 36, 40, 44]:
            # Top tier: 70 - 98
            for _ in range(18):
                marks_list.append(random.randint(70, 98))
        elif idx in [10, 13, 16, 20, 24, 28, 34, 38, 42, 46]:
            # Mid-high tier: 55 - 85
            for _ in range(18):
                marks_list.append(random.randint(55, 85))
        else:
            # Steady pass: 35 - 72
            for _ in range(18):
                marks_list.append(random.randint(35, 72))
                
    # Keep original 10 students matching earlier values where appropriate
    if idx == 0:
        marks_list[0:6] = [78, 85, 72, 82, 88, 79]
    elif idx == 1:
        marks_list[0:6] = [65, 74, 58, 70, 68, 62]
    elif idx == 2:
        marks_list[0:6] = [24, 62, 55, 45, 58, 60]
    elif idx == 3:
        marks_list[0:6] = [88, 92, 90, 85, 95, 91]
    elif idx == 4:
        marks_list[0:6] = [22, 28, 45, 35, 40, 50]
    elif idx == 5:
        marks_list[0:6] = [18, 25, 22, 26, 32, 40]
    elif idx == 6:
        marks_list[0:6] = [55, 64, 70, 60, 58, 65]
    elif idx == 7:
        marks_list[0:6] = [52, 48, 25, 55, 60, 28]
    elif idx == 8:
        marks_list[0:6] = [15, 20, 18, 22, 25, 35]
    elif idx == 9:
        marks_list[0:6] = [72, 80, 68, 75, 82, 70]
        
    total_marks = sum(marks_list)
    pct = round(total_marks / 18.0, 2)
    failed_count = sum(1 for m in marks_list if m < 30)
    
    if failed_count == 0:
        atkt_elig = "Not Applicable (Passed All)"
        final_res = "PASS"
    elif failed_count <= 3:
        atkt_elig = f"YES - Eligible for ATKT ({failed_count} Backlog{'s' if failed_count > 1 else ''})"
        final_res = "PROMOTED WITH ATKT"
    else:
        atkt_elig = f"NO - Ineligible ({failed_count} Backlogs > Max 3)"
        final_res = "FAIL (YEAR DOWN)"
        
    record = {
        "roll_no": roll_no,
        "name": name,
        "branch": branch,
        "admission_year": adm_year,
        "graduation_year": grad_year,
        "marks": marks_list,
        "total_marks": total_marks,
        "percentage": pct,
        "backlogs": failed_count,
        "atkt_elig": atkt_elig,
        "final_res": final_res
    }
    students_dataset.append(record)

print(f"Generated dataset for {len(students_dataset)} students.")
pass_c = sum(1 for s in students_dataset if s["final_res"] == "PASS")
atkt_c = sum(1 for s in students_dataset if s["final_res"] == "PROMOTED WITH ATKT")
fail_c = sum(1 for s in students_dataset if s["final_res"] == "FAIL (YEAR DOWN)")
print(f"Outcome counts -> PASS: {pass_c}, ATKT: {atkt_c}, FAIL: {fail_c}")

# ==========================================
# 1. WRITE CSV FILES
# ==========================================
csv_headers = [
    "Roll No.", "Name", "Branch", "Admission Year", "Graduation Year"
]
for sc in semesters_config:
    for code, full_name in sc["subjects"]:
        csv_headers.append(f"Sem {sc['sem']} - {code}")
csv_headers.extend([
    "Total Marks (Out of 1800)",
    "Percentage (%)",
    "Total Backlogs (Count < 30)",
    "ATKT Eligibility",
    "Final Result"
])

csv_paths = [
    "/home/sam/js_sla/students_marks.csv",
    "/home/sam/js_sla/student_records_atkt.csv",
    "/home/sam/js_sla/students_marks_50.csv"
]

for p in csv_paths:
    with open(p, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(csv_headers)
        for s in students_dataset:
            row = [
                s["roll_no"],
                s["name"],
                s["branch"],
                s["admission_year"],
                s["graduation_year"]
            ]
            row.extend(s["marks"])
            row.extend([
                s["total_marks"],
                f"{s['percentage']:.2f}%",
                s["backlogs"],
                s["atkt_elig"],
                s["final_res"]
            ])
            writer.writerow(row)

print("CSVs generated successfully.")

# ==========================================
# 2. BUILD EXCEL WORKBOOK WITH OPENPYXL
# ==========================================
wb = openpyxl.Workbook()

# Style Palette
font_title = Font(name="Calibri", size=16, bold=True, color="FFFFFF")
font_subtitle = Font(name="Calibri", size=11, italic=True, color="E0E0E0")
font_grp_header = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
font_sub_header = Font(name="Calibri", size=10, bold=True, color="FFFFFF")
font_data = Font(name="Calibri", size=11)
font_bold_data = Font(name="Calibri", size=11, bold=True)
font_fail = Font(name="Calibri", size=11, bold=True, color="9C0006")
font_pass = Font(name="Calibri", size=11, bold=True, color="006100")
font_atkt = Font(name="Calibri", size=11, bold=True, color="9C6500")

# Header Colors per section
fill_title = PatternFill(start_color="1B365D", end_color="1B365D", fill_type="solid")
fill_hdr_particulars = PatternFill(start_color="2F5597", end_color="2F5597", fill_type="solid") # Dark Blue
fill_hdr_sem1 = PatternFill(start_color="337AB7", end_color="337AB7", fill_type="solid")        # Steel Blue
fill_hdr_sem2 = PatternFill(start_color="2E8B57", end_color="2E8B57", fill_type="solid")        # Sea Green
fill_hdr_sem3 = PatternFill(start_color="5B9BD5", end_color="5B9BD5", fill_type="solid")        # Sky Blue
fill_hdr_sem4 = PatternFill(start_color="70AD47", end_color="70AD47", fill_type="solid")        # Grass Green
fill_hdr_sem5 = PatternFill(start_color="D66011", end_color="D66011", fill_type="solid")        # Burnt Orange
fill_hdr_sem6 = PatternFill(start_color="7B4B94", end_color="7B4B94", fill_type="solid")        # Purple
fill_hdr_eval = PatternFill(start_color="1F497D", end_color="1F497D", fill_type="solid")        # Navy Evaluation

sem_color_map = [
    fill_hdr_sem1, fill_hdr_sem2, fill_hdr_sem3,
    fill_hdr_sem4, fill_hdr_sem5, fill_hdr_sem6
]

fill_zebra = PatternFill(start_color="F9FAFC", end_color="F9FAFC", fill_type="solid")
fill_white = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")

fill_fail = PatternFill(start_color="FFC7CE", end_color="FFC7CE", fill_type="solid")  # Light Red
fill_pass = PatternFill(start_color="C6EFCE", end_color="C6EFCE", fill_type="solid")  # Light Green
fill_atkt = PatternFill(start_color="FFEB9C", end_color="FFEB9C", fill_type="solid")  # Light Amber

fill_summary_box = PatternFill(start_color="E9EEF4", end_color="E9EEF4", fill_type="solid")
fill_summary_hdr = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")

thin_border_side = Side(border_style="thin", color="D3D3D3")
thick_border_side = Side(border_style="medium", color="2F5597")
double_border_side = Side(border_style="double", color="2F5597")

cell_border = Border(left=thin_border_side, right=thin_border_side, top=thin_border_side, bottom=thin_border_side)
header_border = Border(left=thin_border_side, right=thin_border_side, top=thick_border_side, bottom=thick_border_side)
summary_border = Border(top=thin_border_side, bottom=double_border_side, left=thin_border_side, right=thin_border_side)

align_center = Alignment(horizontal="center", vertical="center")
align_left = Alignment(horizontal="left", vertical="center")
align_right = Alignment(horizontal="right", vertical="center")

# ==========================================
# SHEET 1: Master Consolidated Sheet (Sem 1-6)
# ==========================================
ws1 = wb.active
ws1.title = "Consolidated Master (Sem 1-6)"
ws1.views.sheetView[0].showGridLines = True

total_cols = 5 + 18 + 5 # 28 columns (A to AB)
last_col_letter = get_column_letter(total_cols) # AB

# Title Row 1 & 2
ws1.merge_cells(f"A1:{last_col_letter}1")
ws1["A1"] = "DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING | 6-SEMESTER ACADEMIC RECORD"
ws1["A1"].font = font_title
ws1["A1"].fill = fill_title
ws1["A1"].alignment = align_center
ws1.row_dimensions[1].height = 28

ws1.merge_cells(f"A2:{last_col_letter}2")
ws1["A2"] = "Consolidated Marksheet & ATKT Assessment (Batch 2025–2029 | 50 Students | Passing: 30/100 | Max 3 Backlogs for ATKT)"
ws1["A2"].font = font_subtitle
ws1["A2"].fill = fill_title
ws1["A2"].alignment = align_center
ws1.row_dimensions[2].height = 20

ws1.row_dimensions[3].height = 8

# Group Headers (Row 4)
ws1.merge_cells("A4:E4")
ws1["A4"] = "STUDENT PARTICULARS"
ws1["A4"].font = font_grp_header
ws1["A4"].fill = fill_hdr_particulars
ws1["A4"].alignment = align_center

col_pos = 6
for s_idx, sc in enumerate(semesters_config):
    start_c = col_pos
    end_c = col_pos + 2
    ws1.merge_cells(start_row=4, start_column=start_c, end_row=4, end_column=end_c)
    cell = ws1.cell(row=4, column=start_c, value=f"{sc['name'].upper()} (MAX 100)")
    cell.font = font_grp_header
    cell.fill = sem_color_map[s_idx]
    cell.alignment = align_center
    col_pos += 3

ws1.merge_cells(start_row=4, start_column=col_pos, end_row=4, end_column=total_cols)
cell = ws1.cell(row=4, column=col_pos, value="CONSOLIDATED EVALUATION & ATKT STATUS")
cell.font = font_grp_header
cell.fill = fill_hdr_eval
cell.alignment = align_center

for c in range(1, total_cols + 1):
    c_cell = ws1.cell(row=4, column=c)
    c_cell.border = header_border
    if c <= 5:
        c_cell.fill = fill_hdr_particulars
    elif c <= 23:
        sem_idx = (c - 6) // 3
        c_cell.fill = sem_color_map[sem_idx]
    else:
        c_cell.fill = fill_hdr_eval

ws1.row_dimensions[4].height = 24

# Specific Column Headers (Row 5)
headers_row5 = [
    ("Roll No.", align_center),
    ("Student Name", align_left),
    ("Branch", align_left),
    ("Admission Year", align_center),
    ("Graduation Year", align_center),
]

for sc in semesters_config:
    for code, _ in sc["subjects"]:
        headers_row5.append((code, align_center))

headers_row5.extend([
    ("Total Marks (1800)", align_right),
    ("Percentage", align_right),
    ("Total Backlogs", align_center),
    ("ATKT Eligibility", align_center),
    ("Final Result", align_center)
])

for col_idx, (h_title, alignment) in enumerate(headers_row5, start=1):
    cell = ws1.cell(row=5, column=col_idx, value=h_title)
    cell.font = font_sub_header
    cell.alignment = alignment
    cell.border = header_border
    if col_idx <= 5:
        cell.fill = fill_hdr_particulars
    elif col_idx <= 23:
        sem_idx = (col_idx - 6) // 3
        cell.fill = sem_color_map[sem_idx]
    else:
        cell.fill = fill_hdr_eval

ws1.row_dimensions[5].height = 24

# Data Rows (Row 6 to 55)
data_start_row = 6
for i, s in enumerate(students_dataset):
    row_num = data_start_row + i
    is_zebra = (i % 2 == 1)
    base_fill = fill_zebra if is_zebra else fill_white

    ws1.cell(row=row_num, column=1, value=s["roll_no"]).alignment = align_center
    ws1.cell(row=row_num, column=2, value=s["name"]).alignment = align_left
    ws1.cell(row=row_num, column=3, value=s["branch"]).alignment = align_left
    ws1.cell(row=row_num, column=4, value=s["admission_year"]).alignment = align_center
    ws1.cell(row=row_num, column=5, value=s["graduation_year"]).alignment = align_center

    # 18 subject marks (Cols 6 to 23)
    for m_i, mark in enumerate(s["marks"]):
        c_idx = 6 + m_i
        m_cell = ws1.cell(row=row_num, column=c_idx, value=mark)
        m_cell.alignment = align_center
        if mark < 30:
            m_cell.font = font_fail
            m_cell.fill = fill_fail
        else:
            m_cell.font = font_data
            m_cell.fill = base_fill

    # Total Marks: SUM(F{row_num}:W{row_num})
    tot_cell = ws1.cell(row=row_num, column=24, value=f"=SUM(F{row_num}:W{row_num})")
    tot_cell.font = font_bold_data
    tot_cell.alignment = align_right

    # Percentage: X{row_num}/1800
    pct_cell = ws1.cell(row=row_num, column=25, value=f"=ROUND(X{row_num}/1800, 4)")
    pct_cell.number_format = '0.00%'
    pct_cell.font = font_bold_data
    pct_cell.alignment = align_right

    # Backlogs: COUNTIF(F{row_num}:W{row_num}, "<30")
    b_cell = ws1.cell(row=row_num, column=26, value=f'=COUNTIF(F{row_num}:W{row_num}, "<30")')
    b_cell.font = font_bold_data
    b_cell.alignment = align_center

    # ATKT Eligibility:
    atkt_formula = f'=IF(Z{row_num}=0, "Not Applicable (Passed All)", IF(Z{row_num}<=3, "YES - Eligible for ATKT", "NO - Ineligible (> 3 Backlogs)"))'
    atkt_cell = ws1.cell(row=row_num, column=27, value=atkt_formula)
    atkt_cell.alignment = align_center

    # Final Result:
    res_formula = f'=IF(Z{row_num}=0, "PASS", IF(Z{row_num}<=3, "PROMOTED WITH ATKT", "FAIL (YEAR DOWN)"))'
    res_cell = ws1.cell(row=row_num, column=28, value=res_formula)
    res_cell.alignment = align_center

    # Formatting based on outcome
    if s["final_res"] == "PASS":
        atkt_cell.font = font_pass
        res_cell.font = font_pass
        res_cell.fill = fill_pass
        b_cell.font = font_pass
    elif "ATKT" in s["final_res"]:
        atkt_cell.font = font_atkt
        atkt_cell.fill = fill_atkt
        res_cell.font = font_atkt
        res_cell.fill = fill_atkt
        b_cell.font = font_fail
        b_cell.fill = fill_fail
    else:
        atkt_cell.font = font_fail
        atkt_cell.fill = fill_fail
        res_cell.font = font_fail
        res_cell.fill = fill_fail
        b_cell.font = font_fail
        b_cell.fill = fill_fail

    for c in [1, 2, 3, 4, 5, 24, 25]:
        ws1.cell(row=row_num, column=c).fill = base_fill
    for c in range(1, total_cols + 1):
        ws1.cell(row=row_num, column=c).border = cell_border
        
    ws1.row_dimensions[row_num].height = 20

# Class Average Summary Row (Row 56)
avg_row = data_start_row + len(students_dataset) # 56
ws1.merge_cells(f"A{avg_row}:E{avg_row}")
avg_lbl = ws1.cell(row=avg_row, column=1, value="CLASS BATCH AVERAGE")
avg_lbl.font = font_bold_data
avg_lbl.alignment = align_center

for c in range(6, 24):
    c_let = get_column_letter(c)
    ac = ws1.cell(row=avg_row, column=c, value=f"=AVERAGE({c_let}6:{c_let}55)")
    ac.font = font_bold_data
    ac.alignment = align_center
    ac.number_format = '0.0'

# Total Average
tot_ac = ws1.cell(row=avg_row, column=24, value=f"=AVERAGE(X6:X55)")
tot_ac.font = font_bold_data
tot_ac.alignment = align_right
tot_ac.number_format = '0.0'

# Percentage Average
pct_ac = ws1.cell(row=avg_row, column=25, value=f"=AVERAGE(Y6:Y55)")
pct_ac.font = font_bold_data
pct_ac.alignment = align_right
pct_ac.number_format = '0.00%'

# Backlogs Average
b_ac = ws1.cell(row=avg_row, column=26, value=f"=AVERAGE(Z6:Z55)")
b_ac.font = font_bold_data
b_ac.alignment = align_center
b_ac.number_format = '0.0'

ws1.cell(row=avg_row, column=27, value="-").alignment = align_center
ws1.cell(row=avg_row, column=28, value="-").alignment = align_center

for c in range(1, total_cols + 1):
    cell = ws1.cell(row=avg_row, column=c)
    cell.border = summary_border
    cell.fill = fill_summary_hdr

ws1.row_dimensions[avg_row].height = 24

# Summary Statistics and ATKT Policy Box (Rows 58 to 68)
ws1.cell(row=58, column=2, value="ACADEMIC PERFORMANCE & ATKT COHORT METRICS").font = Font(name="Calibri", size=12, bold=True, color="1B365D")
ws1.cell(row=58, column=12, value="ATKT (ALLOWED TO KEEP TERM) REGULATIONS & CRITERIA").font = Font(name="Calibri", size=12, bold=True, color="1B365D")

stats_summary = [
    ("Total Students Enrolled", "=COUNTA(A6:A55)", "50"),
    ("Students Passed (0 Backlogs)", '=COUNTIF(AB6:AB55, "PASS")', "33 (66.0%)"),
    ("Students Eligible for ATKT (1 - 3 Backlogs)", '=COUNTIF(AB6:AB55, "PROMOTED WITH ATKT")', "11 (22.0%)"),
    ("Students Failed / Year Down (> 3 Backlogs)", '=COUNTIF(AB6:AB55, "FAIL (YEAR DOWN)")', "6 (12.0%)"),
    ("Highest Aggregate Marks Obtained", "=MAX(X6:X55)", "1636 / 1800 (90.89%)"),
    ("Lowest Aggregate Marks Obtained", "=MIN(X6:X55)", "548 / 1800 (30.44%)")
]

for idx, (lbl, formula, static_val) in enumerate(stats_summary, start=59):
    ws1.merge_cells(f"B{idx}:E{idx}")
    lc = ws1.cell(row=idx, column=2, value=lbl)
    lc.font = font_data
    lc.border = cell_border
    lc.fill = fill_white
    
    vc = ws1.cell(row=idx, column=6, value=formula)
    vc.font = font_bold_data
    vc.alignment = align_center
    vc.border = cell_border
    vc.fill = fill_white
    ws1.row_dimensions[idx].height = 20

atkt_rules_expanded = [
    ("Passing Standard", "Minimum 30 marks out of 100 in each course. Marks below 30 are designated as Fail / Backlog."),
    ("ATKT Eligibility Threshold", "A student is Allowed To Keep Term (ATKT) if they have between 1 and 3 cumulative backlogs across Semesters 1 to 6."),
    ("Promotion with ATKT", "Students with ATKT eligibility are promoted to Final Year (Semester 7) while simultaneously clearing pending backlogs in remedial sessions."),
    ("Year Down / Ineligible", "Students with 4 or more backlogs exceed permissible credit backlog limits and cannot proceed to Final Year (must repeat academic year)."),
    ("Result Category: PASS", "Student has cleared all 18 subjects across 6 semesters (0 backlogs). Eligible for unconditional graduation progression."),
    ("Result Category: PROMOTED (ATKT)", "Student has 1–3 backlogs. Provisionally promoted with backlog retake obligation.")
]

for idx, (rt, rd) in enumerate(atkt_rules_expanded, start=59):
    ws1.merge_cells(f"L{idx}:N{idx}")
    tc = ws1.cell(row=idx, column=12, value=rt)
    tc.font = font_bold_data
    tc.border = cell_border
    tc.fill = fill_white
    
    ws1.merge_cells(f"O{idx}:AB{idx}")
    dc = ws1.cell(row=idx, column=15, value=rd)
    dc.font = font_data
    dc.border = cell_border
    dc.fill = fill_white
    dc.alignment = Alignment(wrap_text=True, vertical="center")
    ws1.row_dimensions[idx].height = 20


# ==========================================
# SHEET 2: Semester-wise Summary & Backlog Tracker
# ==========================================
ws2 = wb.create_sheet(title="Semester-wise Backlog Tracker")
ws2.views.sheetView[0].showGridLines = True

ws2.merge_cells("A1:T1")
ws2["A1"] = "SEMESTER-WISE PERFORMANCE & BACKLOG DISTRIBUTION (SEM 1 TO SEM 6)"
ws2["A1"].font = font_title
ws2["A1"].fill = fill_hdr_particulars
ws2["A1"].alignment = align_center
ws2.row_dimensions[1].height = 28

sem_tracker_headers = [
    ("Roll No.", align_center),
    ("Student Name", align_left),
    ("Branch", align_left),
    ("S1 Total (300)", align_right),
    ("S1 Fails", align_center),
    ("S2 Total (300)", align_right),
    ("S2 Fails", align_center),
    ("S3 Total (300)", align_right),
    ("S3 Fails", align_center),
    ("S4 Total (300)", align_right),
    ("S4 Fails", align_center),
    ("S5 Total (300)", align_right),
    ("S5 Fails", align_center),
    ("S6 Total (300)", align_right),
    ("S6 Fails", align_center),
    ("Grand Total (1800)", align_right),
    ("Overall Pct", align_right),
    ("Total Backlogs", align_center),
    ("ATKT Status", align_center),
    ("Final Result", align_center),
]

ws2.row_dimensions[3].height = 24
for col_idx, (h_title, alignment) in enumerate(sem_tracker_headers, start=1):
    cell = ws2.cell(row=3, column=col_idx, value=h_title)
    cell.font = font_grp_header
    cell.fill = fill_hdr_particulars
    cell.alignment = alignment
    cell.border = header_border

for i, s in enumerate(students_dataset):
    row_num = 4 + i
    is_zebra = (i % 2 == 1)
    base_fill = fill_zebra if is_zebra else fill_white

    ws2.cell(row=row_num, column=1, value=s["roll_no"]).alignment = align_center
    ws2.cell(row=row_num, column=2, value=s["name"]).alignment = align_left
    ws2.cell(row=row_num, column=3, value=s["branch"]).alignment = align_left

    # Semester totals and backlogs
    for sem_i in range(6):
        sub_slice = s["marks"][sem_i*3 : (sem_i+1)*3]
        sem_tot = sum(sub_slice)
        sem_fails = sum(1 for m in sub_slice if m < 30)

        tot_c = ws2.cell(row=row_num, column=4 + sem_i*2, value=sem_tot)
        tot_c.alignment = align_right
        tot_c.font = font_data
        tot_c.fill = base_fill

        fail_c = ws2.cell(row=row_num, column=5 + sem_i*2, value=sem_fails)
        fail_c.alignment = align_center
        if sem_fails > 0:
            fail_c.font = font_fail
            fail_c.fill = fill_fail
        else:
            fail_c.font = font_pass
            fail_c.fill = base_fill

    # Overall totals
    gt = ws2.cell(row=row_num, column=16, value=s["total_marks"])
    gt.alignment = align_right
    gt.font = font_bold_data
    gt.fill = base_fill

    op = ws2.cell(row=row_num, column=17, value=f"{s['percentage']:.2f}%")
    op.alignment = align_right
    op.font = font_bold_data
    op.fill = base_fill

    tbl = ws2.cell(row=row_num, column=18, value=s["backlogs"])
    tbl.alignment = align_center
    tbl.font = font_bold_data
    
    atkt_c = ws2.cell(row=row_num, column=19, value=s["atkt_elig"])
    atkt_c.alignment = align_center

    res_c = ws2.cell(row=row_num, column=20, value=s["final_res"])
    res_c.alignment = align_center
    res_c.font = font_bold_data

    if s["final_res"] == "PASS":
        tbl.font = font_pass
        atkt_c.font = font_pass
        res_c.font = font_pass
        res_c.fill = fill_pass
    elif "ATKT" in s["final_res"]:
        tbl.font = font_fail
        tbl.fill = fill_fail
        atkt_c.font = font_atkt
        atkt_c.fill = fill_atkt
        res_c.font = font_atkt
        res_c.fill = fill_atkt
    else:
        tbl.font = font_fail
        tbl.fill = fill_fail
        atkt_c.font = font_fail
        atkt_c.fill = fill_fail
        res_c.font = font_fail
        res_c.fill = fill_fail

    for c in [1, 2, 3]:
        ws2.cell(row=row_num, column=c).fill = base_fill
    for c in range(1, 21):
        ws2.cell(row=row_num, column=c).border = cell_border
    ws2.row_dimensions[row_num].height = 20


# ==========================================
# SHEET 3: Semester 1 to 3 Details (Years 1 & 2A)
# ==========================================
ws3 = wb.create_sheet(title="Semesters 1-3 Subject Marks")
ws3.views.sheetView[0].showGridLines = True

ws3.merge_cells("A1:N1")
ws3["A1"] = "SEMESTER 1 TO 3 DETAILED SUBJECT SCORES (OS, JS, DSA, DBMS, CN, OOP, DAA, SE, TOC)"
ws3["A1"].font = font_title
ws3["A1"].fill = fill_hdr_sem1
ws3["A1"].alignment = align_center
ws3.row_dimensions[1].height = 28

sem13_headers = ["Roll No.", "Student Name", "Branch"]
for sc in semesters_config[:3]:
    for code, _ in sc["subjects"]:
        sem13_headers.append(f"S{sc['sem']}-{code}")
sem13_headers.extend(["S1-3 Total (900)", "S1-3 Backlogs"])

ws3.row_dimensions[3].height = 24
for col_idx, h_text in enumerate(sem13_headers, start=1):
    cell = ws3.cell(row=3, column=col_idx, value=h_text)
    cell.font = font_grp_header
    cell.fill = fill_hdr_sem1
    cell.alignment = align_center
    cell.border = header_border

for i, s in enumerate(students_dataset):
    row_num = 4 + i
    is_zebra = (i % 2 == 1)
    base_fill = fill_zebra if is_zebra else fill_white

    ws3.cell(row=row_num, column=1, value=s["roll_no"]).alignment = align_center
    ws3.cell(row=row_num, column=2, value=s["name"]).alignment = align_left
    ws3.cell(row=row_num, column=3, value=s["branch"]).alignment = align_left

    s13_marks = s["marks"][:9]
    for m_i, mark in enumerate(s13_marks):
        c_idx = 4 + m_i
        cell = ws3.cell(row=row_num, column=c_idx, value=mark)
        cell.alignment = align_center
        if mark < 30:
            cell.font = font_fail
            cell.fill = fill_fail
        else:
            cell.font = font_data
            cell.fill = base_fill

    tot13 = ws3.cell(row=row_num, column=13, value=sum(s13_marks))
    tot13.alignment = align_right
    tot13.font = font_bold_data
    tot13.fill = base_fill

    bl13 = sum(1 for m in s13_marks if m < 30)
    bl_cell = ws3.cell(row=row_num, column=14, value=bl13)
    bl_cell.alignment = align_center
    bl_cell.font = font_bold_data
    if bl13 > 0:
        bl_cell.font = font_fail
        bl_cell.fill = fill_fail
    else:
        bl_cell.font = font_pass
        bl_cell.fill = base_fill

    for c in [1, 2, 3]:
        ws3.cell(row=row_num, column=c).fill = base_fill
    for c in range(1, 15):
        ws3.cell(row=row_num, column=c).border = cell_border
    ws3.row_dimensions[row_num].height = 20


# ==========================================
# SHEET 4: Semester 4 to 6 Details (Years 2B & 3)
# ==========================================
ws4 = wb.create_sheet(title="Semesters 4-6 Subject Marks")
ws4.views.sheetView[0].showGridLines = True

ws4.merge_cells("A1:N1")
ws4["A1"] = "SEMESTER 4 TO 6 DETAILED SUBJECT SCORES (COA, WT, MP, AI, CC, IS, CD, BDA, DS)"
ws4["A1"].font = font_title
ws4["A1"].fill = fill_hdr_sem4
ws4["A1"].alignment = align_center
ws4.row_dimensions[1].height = 28

sem46_headers = ["Roll No.", "Student Name", "Branch"]
for sc in semesters_config[3:]:
    for code, _ in sc["subjects"]:
        sem46_headers.append(f"S{sc['sem']}-{code}")
sem46_headers.extend(["S4-6 Total (900)", "S4-6 Backlogs"])

ws4.row_dimensions[3].height = 24
for col_idx, h_text in enumerate(sem46_headers, start=1):
    cell = ws4.cell(row=3, column=col_idx, value=h_text)
    cell.font = font_grp_header
    cell.fill = fill_hdr_sem4
    cell.alignment = align_center
    cell.border = header_border

for i, s in enumerate(students_dataset):
    row_num = 4 + i
    is_zebra = (i % 2 == 1)
    base_fill = fill_zebra if is_zebra else fill_white

    ws4.cell(row=row_num, column=1, value=s["roll_no"]).alignment = align_center
    ws4.cell(row=row_num, column=2, value=s["name"]).alignment = align_left
    ws4.cell(row=row_num, column=3, value=s["branch"]).alignment = align_left

    s46_marks = s["marks"][9:]
    for m_i, mark in enumerate(s46_marks):
        c_idx = 4 + m_i
        cell = ws4.cell(row=row_num, column=c_idx, value=mark)
        cell.alignment = align_center
        if mark < 30:
            cell.font = font_fail
            cell.fill = fill_fail
        else:
            cell.font = font_data
            cell.fill = base_fill

    tot46 = ws4.cell(row=row_num, column=13, value=sum(s46_marks))
    tot46.alignment = align_right
    tot46.font = font_bold_data
    tot46.fill = base_fill

    bl46 = sum(1 for m in s46_marks if m < 30)
    bl_cell = ws4.cell(row=row_num, column=14, value=bl46)
    bl_cell.alignment = align_center
    bl_cell.font = font_bold_data
    if bl46 > 0:
        bl_cell.font = font_fail
        bl_cell.fill = fill_fail
    else:
        bl_cell.font = font_pass
        bl_cell.fill = base_fill

    for c in [1, 2, 3]:
        ws4.cell(row=row_num, column=c).fill = base_fill
    for c in range(1, 15):
        ws4.cell(row=row_num, column=c).border = cell_border
    ws4.row_dimensions[row_num].height = 20


# ==========================================
# AUTO-FIT COLUMN WIDTHS ACROSS ALL SHEETS
# ==========================================
for sheet in [ws1, ws2, ws3, ws4]:
    for col in sheet.columns:
        col_letter = get_column_letter(col[0].column)
        max_len = 0
        for cell in col:
            # Skip title & summary rows
            if sheet == ws1 and cell.row in [1, 2, 3, 4, 58, 59, 60, 61, 62, 63, 64, 65]:
                continue
            if sheet in [ws2, ws3, ws4] and cell.row in [1, 2]:
                continue
            val_str = str(cell.value or '')
            if val_str.startswith("="):
                val_str = "12345678"
            max_len = max(max_len, len(val_str))
        sheet.column_dimensions[col_letter].width = max(max_len + 4, 11)

# Specific fine tuning for Master Sheet (ws1)
ws1.column_dimensions["A"].width = 14
ws1.column_dimensions["B"].width = 24
ws1.column_dimensions["C"].width = 30
ws1.column_dimensions["D"].width = 16
ws1.column_dimensions["E"].width = 16
for c in range(6, 24):
    ws1.column_dimensions[get_column_letter(c)].width = 10
ws1.column_dimensions["X"].width = 18
ws1.column_dimensions["Y"].width = 14
ws1.column_dimensions["Z"].width = 16
ws1.column_dimensions["AA"].width = 28
ws1.column_dimensions["AB"].width = 24

# Save Excel Files
xlsx_paths = [
    "/home/sam/js_sla/students_marks.xlsx",
    "/home/sam/js_sla/student_records_atkt.xlsx",
    "/home/sam/js_sla/students_marks_50.xlsx"
]

for xp in xlsx_paths:
    wb.save(xp)

print("Excel files generated successfully:")
for xp in xlsx_paths:
    print(" -", xp)
