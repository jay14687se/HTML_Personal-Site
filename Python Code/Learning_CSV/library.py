import csv
from Book import Book

def print_row_as_table(table_fields, row):
    r_length = []
    h_length = []
    for r_col in row:
        r_length.append(len(r_col))
    for h_col in table_fields:
        h_length.append(len(h_col))
    col_width = []
    for i in range(len(table_fields)):
        col_width.append(r_length[i] if r_length[i] > h_length[i] else h_length[i]);

    for h_col_idx, h_col_val in enumerate(table_fields):
        print("{:{width}}".format(h_col_val, width=col_width[h_col_idx]+4), end="")   #right aligned - print("{:>{width}} eol".format(col, width=len(col)+2))
    print()

    for r_col_idx, r_col_val in enumerate(row):
        print("{:{width}}".format(r_col_val, width=col_width[r_col_idx]+4), end="")   #right aligned - print("{:>{width}} eol".format(col, width=len(col)+2))
    print()


def read_and_save_csv(fileName):
    table_fields = []
    library = {}
    with open(fileName) as csvfile:
        csv_rows = csv.reader(csvfile)
        table_fields = next(csv_rows)
        for row_idx, row in enumerate(csv_rows):
            library["book" + str(row_idx)] = Book(row[0], row[1], row[2], row[3], row[4], row[5])
    return (table_fields, library)

def get_book_by_id(library, isbnCode):
    for key, val in library.items():
        if val.isbnCode == isbnCode:
            return val

table_fields, library = read_and_save_csv("csv-tables.csv")
book = get_book_by_id(library, "12222222333232231")
print(book)
