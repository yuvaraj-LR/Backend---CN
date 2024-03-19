// Write your code here

import fs from "fs";

export const publishBlog = (filePath) => {
    const buffer = fs.readFileSync(filePath, {encoding: 'utf8'});

    return buffer;
};

export const writeBlog = (filePath, content) => {
    try {
        fs.writeFileSync(filePath, content);
    } catch (error) {
        console.log("File doesn't exists.");
    }
};
