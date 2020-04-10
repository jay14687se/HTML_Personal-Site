class Book(object):
    """docstring for Book."""

    def __init__(self, bookName, author, publisher, price, dateofpub, isbnCode):
        # super(Book, self).__init__()
        self.bookName = bookName
        self.author = author
        self.publisher = publisher
        self.price = price
        self.dateofpub = dateofpub
        self.isbnCode = isbnCode

    def get_book_by_id(self, isbnCode):
        if(self.isbnCode == isbnCode):
            print(Book);

    def __str__(self):
        return "Book Details = BookName: {}, Author: {}, Publisher: {}, Price: {}, Date of Publication: {}, ISBN Code: {}".format(
            self.bookName,
            self.author,
            self.publisher,
            self.price,
            self.dateofpub,
            self.isbnCode
        )
