use std::env;
use std::fs::File;
use std::io::{BufRead, BufReader};

fn get_full_path(filename: &str) -> String {
    let path = env::current_dir().unwrap();

    format!("{}/src/{}", path.display(), filename)
}

fn get_reader(filename: &str) -> BufReader<File> {
    let full_path = get_full_path(filename);
    let file = File::open(full_path).unwrap();

    BufReader::new(file)
}

pub fn get_lines(filename: &str) -> Vec<String> {
    let reader = get_reader(filename);

    reader.lines()
        .map(|line| line.unwrap())
        .filter(|line| line != "")
        .collect()
}

pub fn get_lines_as_numbers(filename: &str) -> Vec<i32> {
    get_lines(filename)
        .iter()
        .map(|line| line.parse::<i32>().unwrap())
        .collect()
}
