#!/usr/bin/env node
const fs = require('fs')
const { program } = require('commander');


program
    .name("WordCount")
    .description("CLI Tool to count number of words")
    .version("1.0.0")
    .argument("<file>", "path to the file you want to analyze")
    .action((filepath) => {
        try {
            const data = fs.readFileSync(filepath, "utf8")
            const word = data.trim().split(/\s+/)
            console.log(`We have ${word.length} word in the file`)
        
        }
        catch (err) {
            console.log("Error reading file:", err.message)
        }
    });
program.parse()
