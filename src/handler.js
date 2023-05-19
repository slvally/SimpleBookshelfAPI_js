// Import Module
const { nanoid } = require('nanoid');
const books = require('./books');

//API dapat menyimpan buku
const addBooksHandler = (request, h) => {

    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBooks = {
        name, year, author, summary, publisher, pageCount, readPage, finished, reading, id, insertedAt, updatedAt,
    };

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });

    response.code(500);
    books.push(newBooks);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {bookId: id,},
        });
        response.code(201);
        return response;
    }
    return response;

};

//API dapat menampilkan seluruh buku
const getAllBooksHandler = (request, h) => {

    const { name, reading, finished } = request.query;
    if (!name && !reading && !finished) {
        const response = h
            .response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        })
        .code(200);
        return response;
    }
    if (name) {
        const namefilter = books.filter((book) => name.localeCompare(book.name, undefined, { sensitivity: 'accent' }));
        const response = h
            .response({
            status: 'success',
            data: {
                books: namefilter.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        })
        .code(200);
        return response;
    }
    if (reading) {
        const readfilter = books.filter((book) => Number(book.reading) === Number(reading));
        const response = h
        .response({
            status: 'success',
            data: {
                books: readfilter.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        })
        .code(200);
        return response;
    }
    if (finished) {
        const finishiedfilter = books.filter((book) => Number(book.finished) === Number(finished));
        const response = h
            .response({
            status: 'success',
            data: {
                books: finishiedfilter.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        })
        .code(200);
        return response;
    }
};

//API dapat menampilkan detail buku
const getDetailBooksHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((n) => n.id === bookId)[0];
    if (book) {
        const response = h
            .response({
                status: 'success',
                data: {book,},
            })
        .code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404);
    return response;
};

//API dapat mengubah data buku
const editBooksByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
        return response;
    }
    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
            updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        }).code(200);
        return response;
    }
    const response = h
    .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404);
    return response;
};

//API dapat menghapus buku
const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
        return response;
    }
    const response = h
        .response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        })
        .code(404);
    return response;
};

//Export Module
module.exports = {
    addBooksHandler, getAllBooksHandler, getDetailBooksHandler, editBooksByIdHandler, deleteBookByIdHandler,
};