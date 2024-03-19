// Write your code here
import { writeBlog } from "./blogActions.js";
import { publishBlog } from "./blogActions.js";

import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Enter your blog: ", (input) => {
    writeBlog("myblog.txt", input);

    rl.close();

    console.log(publishBlog("myblog.txt"));
})



// export const Solution = () => {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });

    // rl.question("Enter your blog: ", (blog) => {
    //     writeBlog(blog);
    // })

    // const data = publishBlog();
    // console.log(data);
// };

// Solution()