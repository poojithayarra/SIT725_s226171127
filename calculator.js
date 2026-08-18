function calculateAverage(marks) {
    if (!Array.isArray(marks)) {
        throw new Error("Marks must be an array");
    }

    if (marks.length === 0) {
        throw new Error("Marks array cannot be empty");
    }

    if (marks.some(mark => typeof mark !== "number" || mark < 0 || mark > 100)) {
        throw new Error("Marks must be numbers between 0 and 100");
    }

    const total = marks.reduce((sum, mark) => sum + mark, 0);

    return total / marks.length;
}

module.exports = {
    calculateAverage
};