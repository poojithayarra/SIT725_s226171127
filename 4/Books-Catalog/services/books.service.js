const books = [
    {
        id: "b1",
        title: "The Three-Body Problem",
        author: "Liu Cixin",
        year: 2008,
        genre: "Science Fiction",
        summary: "The Three-Body Problem follows humanity’s first contact with an alien civilization and explores the terrifying consequences of a cosmic mystery."
    },
    {
        id: "b2",
        title: "Jane Eyre",
        author: "Charlotte Brontë",
        year: 1847,
        genre: "Classic",
        summary: "An orphaned governess confronts class, morality, and love at Thornfield Hall, uncovering Mr. Rochester’s secret and forging her own independence."
    },
    {
        id: "b3",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        genre: "Classic",
        summary: "Elizabeth Bennet and Mr. Darcy navigate pride, misjudgement, and social expectations in a sharp study of manners and marriage."
    },
    {
        id: "b4",
        title: "The English Patient",
        author: "Michael Ondaatje",
        year: 1992,
        genre: "Historical Fiction",
        summary: "In a ruined Italian villa at the end of WWII, four strangers with intersecting pasts confront memory, identity, and loss."
    },
    {
        id: "b5",
        title: "Small Gods",
        author: "Terry Pratchett",
        year: 1992,
        genre: "Fantasy",
        summary: "In Omnia, the god Om returns as a tortoise, and novice Brutha must confront dogma, empire, and the nature of belief."
    },
    {
        id: "b6",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        genre: "Fantasy",
        summary: "Bilbo Baggins leaves home for an epic quest, discovering courage, friendship, and the lure of treasure beyond the Shire."
    }
];

const getAllBooks = () => books;

const getBookById = (id) => books.find(book => book.id === id);

module.exports = {
    getAllBooks,
    getBookById
};